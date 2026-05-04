"""BGD-Trans backend API tests."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/") or "https://transit-hub-stage.preview.emergentagent.com"
ADMIN_EMAIL = "admin@bgd-trans.com"
ADMIN_PASSWORD = "BgdTrans2025"


@pytest.fixture(scope="session")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def admin_token(api):
    r = api.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, f"login failed: {r.status_code} {r.text}"
    return r.json()["token"]


@pytest.fixture
def auth_headers(admin_token):
    return {"Authorization": f"Bearer {admin_token}"}


# --- Config ---
def test_config(api):
    r = api.get(f"{BASE_URL}/api/config")
    assert r.status_code == 200
    d = r.json()
    assert "phone" in d and "whatsapp" in d
    assert d["phone"].startswith("+")


# --- Auth ---
def test_login_success(api):
    r = api.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200
    d = r.json()
    assert "token" in d and isinstance(d["token"], str) and len(d["token"]) > 10
    assert d["user"]["email"] == ADMIN_EMAIL
    assert d["user"]["role"] == "admin"
    assert "_id" not in d["user"]
    assert "password_hash" not in d["user"]


def test_login_wrong_password(api):
    r = api.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": "wrong"})
    assert r.status_code == 401


def test_login_unknown_email(api):
    r = api.post(f"{BASE_URL}/api/auth/login", json={"email": "nope@x.com", "password": "x"})
    assert r.status_code == 401


def test_me_with_token(api, auth_headers):
    r = api.get(f"{BASE_URL}/api/auth/me", headers=auth_headers)
    assert r.status_code == 200
    d = r.json()
    assert d["email"] == ADMIN_EMAIL
    assert "_id" not in d
    assert "password_hash" not in d


def test_me_without_token(api):
    r = requests.get(f"{BASE_URL}/api/auth/me")
    assert r.status_code == 401


def test_me_invalid_token(api):
    r = requests.get(f"{BASE_URL}/api/auth/me", headers={"Authorization": "Bearer invalid.jwt.here"})
    assert r.status_code == 401


# --- Bookings public ---
def test_create_booking_valid(api):
    payload = {
        "full_name": "TEST_User One",
        "phone": "+40700000001",
        "departure": "Bucuresti",
        "destination": "München",
        "transport_type": "persoane",
        "message": "TEST message",
    }
    r = api.post(f"{BASE_URL}/api/bookings", json=payload)
    assert r.status_code == 201, r.text
    d = r.json()
    assert d["status"] == "new"
    assert d["full_name"] == payload["full_name"]
    assert d["transport_type"] == "persoane"
    assert "id" in d and "_id" not in d
    return d["id"]


def test_create_booking_invalid_transport_type(api):
    payload = {
        "full_name": "TEST_X",
        "phone": "+40700000002",
        "departure": "A",
        "destination": "B",
        "transport_type": "airplane",
    }
    r = api.post(f"{BASE_URL}/api/bookings", json=payload)
    assert r.status_code == 422


def test_create_booking_missing_fields(api):
    r = api.post(f"{BASE_URL}/api/bookings", json={"full_name": "X"})
    assert r.status_code == 422


# --- Admin bookings ---
def test_list_bookings_requires_auth(api):
    r = requests.get(f"{BASE_URL}/api/admin/bookings")
    assert r.status_code == 401


def test_list_bookings_authenticated(api, auth_headers):
    r = api.get(f"{BASE_URL}/api/admin/bookings", headers=auth_headers)
    assert r.status_code == 200
    items = r.json()
    assert isinstance(items, list)
    if items:
        assert "_id" not in items[0]
        assert "id" in items[0]


def test_full_booking_lifecycle(api, auth_headers):
    # Create
    payload = {
        "full_name": "TEST_Lifecycle",
        "phone": "+40711111111",
        "departure": "Cluj",
        "destination": "Wien",
        "transport_type": "colete",
        "message": "lifecycle test",
    }
    r = api.post(f"{BASE_URL}/api/bookings", json=payload)
    assert r.status_code == 201
    bid = r.json()["id"]

    # Verify in list
    r = api.get(f"{BASE_URL}/api/admin/bookings", headers=auth_headers)
    assert r.status_code == 200
    ids = [b["id"] for b in r.json()]
    assert bid in ids

    # Update status
    r = api.patch(f"{BASE_URL}/api/admin/bookings/{bid}", headers=auth_headers, json={"status": "contacted"})
    assert r.status_code == 200
    assert r.json()["status"] == "contacted"

    # Invalid status
    r = api.patch(f"{BASE_URL}/api/admin/bookings/{bid}", headers=auth_headers, json={"status": "weird"})
    assert r.status_code == 422

    # Delete
    r = api.delete(f"{BASE_URL}/api/admin/bookings/{bid}", headers=auth_headers)
    assert r.status_code == 200

    # Verify removed
    r = api.patch(f"{BASE_URL}/api/admin/bookings/{bid}", headers=auth_headers, json={"status": "new"})
    assert r.status_code == 404


def test_update_nonexistent_booking(api, auth_headers):
    r = api.patch(f"{BASE_URL}/api/admin/bookings/does-not-exist", headers=auth_headers, json={"status": "new"})
    assert r.status_code == 404


def test_delete_requires_auth(api):
    r = requests.delete(f"{BASE_URL}/api/admin/bookings/abc")
    assert r.status_code == 401
