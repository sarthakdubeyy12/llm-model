models.pyfrom pydantic import BaseModel, EmailStr
from typing import Optional

class User(BaseModel):
    email: EmailStr
    password: str  # Hashed password

class UserInDB(User):
    id: Optional[str]