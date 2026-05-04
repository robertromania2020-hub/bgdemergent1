"""Generate the 3 service-card images for BGD-Trans using Gemini Nano Banana."""
import asyncio
import base64
import os
import sys
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parents[1] / "backend" / ".env")

from emergentintegrations.llm.chat import LlmChat, UserMessage  # noqa: E402

PUBLIC = Path(__file__).resolve().parents[1] / "frontend" / "public"

COMMON = (
    "Ultra photorealistic cinematic commercial photograph, brand-new luxury "
    "white Renault Master minibus passenger van (8+1 seats long-wheelbase variant), "
    "freshly washed with chrome details, modern LED headlights, 18-inch alloy wheels. "
    "Painted on the side body in bold premium navy-blue and orange typography: "
    "'BGD-Trans' brand name with phone icon and '+40 769 129 126' below. "
    "Text perfectly legible, sharp, professional commercial van decal style. "
    "Shot on Hasselblad H6D 35mm f/4, golden hour, lens flare, vibrant natural colors, "
    "8K resolution, automotive advertising photography. 16:9 widescreen aspect ratio."
)

JOBS = [
    {
        "out": "service-passengers.jpg",
        "prompt": (
            "Side 3/4 angle view of the van parked at a modern European airport pickup "
            "area at golden hour. Sliding side door open, pristine premium leather seats "
            "visible inside (8+1 luxury layout). Travelers with elegant luggage approaching. "
            + COMMON
        ),
    },
    {
        "out": "service-parcels.jpg",
        "prompt": (
            "Side view of the van towing a matching white aerodynamic enclosed cargo "
            "trailer (luggage / parcel trailer) behind it on a sunlit autobahn rest area, "
            "European countryside background. The trailer is a single-axle covered cargo "
            "box trailer with the same BGD-Trans branding subtly on its side. Both vehicles "
            "shiny clean. " + COMMON
        ),
    },
    {
        "out": "service-auto.jpg",
        "prompt": (
            "Side view of the van towing a single-car flatbed transport trailer (auto "
            "platform / car-carrier trailer) with a modern silver sedan loaded and strapped "
            "down on it, parked at an European autobahn rest area at golden hour. The car "
            "carrier trailer has visible tie-down straps and ramps. " + COMMON
        ),
    },
]


async def generate_one(api_key: str, idx: int, job: dict):
    chat = LlmChat(
        api_key=api_key,
        session_id=f"bgd-trans-services-{idx}",
        system_message="You generate premium photorealistic commercial vehicle photography.",
    )
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(
        modalities=["image", "text"]
    )
    msg = UserMessage(text=job["prompt"])
    text, images = await chat.send_message_multimodal_response(msg)
    print(f"[{idx}] text: {(text or '')[:80]}...")
    if not images:
        print(f"[{idx}] NO IMAGES", file=sys.stderr)
        return False
    img = images[0]
    out = PUBLIC / job["out"]
    out.write_bytes(base64.b64decode(img["data"]))
    print(f"[{idx}] saved {out} ({out.stat().st_size} bytes, mime {img['mime_type']})")
    return True


async def main():
    api_key = os.getenv("EMERGENT_LLM_KEY")
    if not api_key:
        print("EMERGENT_LLM_KEY not set", file=sys.stderr)
        sys.exit(1)
    results = await asyncio.gather(
        *[generate_one(api_key, i, j) for i, j in enumerate(JOBS)]
    )
    if not all(results):
        sys.exit(2)


if __name__ == "__main__":
    asyncio.run(main())
