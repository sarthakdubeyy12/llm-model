from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from db.crud import create_user, authenticate_user
from auth.auth_utils import create_access_token

router = APIRouter()

class AuthRequest(BaseModel):
    email: EmailStr
    password: str

@router.post("/register")
def register_user(req: AuthRequest):
    user_id = create_user(req.email, req.password)
    if not user_id:
        raise HTTPException(status_code=400, detail="User already exists")
    token = create_access_token({"sub": user_id})
    return {
        "message": "User registered",
        "token": token,
        "user_id": user_id  # ✅ Include user_id in response
    }

@router.post("/login")
def login_user(req: AuthRequest):
    user = authenticate_user(req.email, req.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user["id"]})
    return {
        "message": "Login successful",
        "token": token,
        "user_id": user["id"]  # ✅ Include user_id in response
    }