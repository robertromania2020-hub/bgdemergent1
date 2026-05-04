from dotenv import load_dotenv
from pathlib import Path
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import uuid
import logging
import bcrypt
import jwt
from datetime import datetime, timezone, timedelta
from typing import List, Optional

from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, ConfigDict, EmailStr


# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="BGD-Trans API")
api_router = APIRouter(prefix="/api")

# ---------- Auth helpers ----------
JWT_ALGORITHM = "HS256"
JWT_EXP_HOURS = 24


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXP_HOURS),
    }
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGORITHM)


async def get_current_admin(request: Request) -> dict:
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = auth_header[7:]
    try:
        payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
    if not user or user.get("role") != "admin":
        raise HTTPException(status_code=401, detail="User not found")
    return user


# ---------- Models ----------
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    token: str
    user: dict


class BookingCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    full_name: str = Field(min_length=2, max_length=120)
    phone: str = Field(min_length=5, max_length=40)
    departure: str
    destination: str
    transport_type: str  # persoane | colete | auto
    message: Optional[str] = ""


class Booking(BaseModel):
    id: str
    full_name: str
    phone: str
    departure: str
    destination: str
    transport_type: str
    message: str
    status: str
    created_at: str


class BookingStatusUpdate(BaseModel):
    status: str  # new | contacted | confirmed | cancelled


class ConfigResponse(BaseModel):
    phone: str
    whatsapp: str


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"status": "ok", "service": "BGD-Trans API"}


@api_router.get("/config", response_model=ConfigResponse)
async def get_config():
    return ConfigResponse(
        phone=os.environ.get("BUSINESS_PHONE", "+40769129126"),
        whatsapp=os.environ.get("BUSINESS_WHATSAPP", "40769129126"),
    )


@api_router.post("/auth/login", response_model=LoginResponse)
async def login(body: LoginRequest):
    email = body.email.lower().strip()
    user = await db.users.find_one({"email": email}, {"_id": 0})
    if not user or not verify_password(body.password, user.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="Email sau parolă greșită")
    token = create_access_token(user["id"], user["email"])
    safe_user = {k: v for k, v in user.items() if k != "password_hash"}
    return LoginResponse(token=token, user=safe_user)


@api_router.get("/auth/me")
async def me(current=Depends(get_current_admin)):
    return current


@api_router.post("/bookings", response_model=Booking, status_code=201)
async def create_booking(body: BookingCreate):
    allowed = {"persoane", "colete", "auto"}
    if body.transport_type not in allowed:
        raise HTTPException(status_code=422, detail="Tip transport invalid")
    doc = {
        "id": str(uuid.uuid4()),
        "full_name": body.full_name.strip(),
        "phone": body.phone.strip(),
        "departure": body.departure.strip(),
        "destination": body.destination.strip(),
        "transport_type": body.transport_type,
        "message": (body.message or "").strip(),
        "status": "new",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.bookings.insert_one(doc)
    doc.pop("_id", None)
    return Booking(**doc)


@api_router.get("/admin/bookings", response_model=List[Booking])
async def list_bookings(_: dict = Depends(get_current_admin)):
    items = await db.bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [Booking(**i) for i in items]


@api_router.patch("/admin/bookings/{booking_id}", response_model=Booking)
async def update_booking(booking_id: str, body: BookingStatusUpdate, _: dict = Depends(get_current_admin)):
    allowed = {"new", "contacted", "confirmed", "cancelled"}
    if body.status not in allowed:
        raise HTTPException(status_code=422, detail="Status invalid")
    result = await db.bookings.update_one({"id": booking_id}, {"$set": {"status": body.status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Rezervare inexistentă")
    doc = await db.bookings.find_one({"id": booking_id}, {"_id": 0})
    return Booking(**doc)


@api_router.delete("/admin/bookings/{booking_id}")
async def delete_booking(booking_id: str, _: dict = Depends(get_current_admin)):
    result = await db.bookings.delete_one({"id": booking_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Rezervare inexistentă")
    return {"deleted": True, "id": booking_id}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup_event():
    # Indexes
    await db.users.create_index("email", unique=True)
    await db.users.create_index("id", unique=True)
    await db.bookings.create_index("id", unique=True)
    await db.bookings.create_index("created_at")

    # Seed admin (idempotent)
    admin_email = os.environ["ADMIN_EMAIL"].lower().strip()
    admin_password = os.environ["ADMIN_PASSWORD"]
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        await db.users.insert_one({
            "id": str(uuid.uuid4()),
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "name": "Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info("Admin seeded: %s", admin_email)
    elif not verify_password(admin_password, existing.get("password_hash", "")):
        await db.users.update_one(
            {"email": admin_email},
            {"$set": {"password_hash": hash_password(admin_password)}},
        )
        logger.info("Admin password synced: %s", admin_email)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
