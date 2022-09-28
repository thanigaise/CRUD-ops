from pydantic import BaseModel
from typing import Optional


class UserBase(BaseModel):
    first_name: Optional[str]
    surname: Optional[str]
    age: Optional[int]
    gender: Optional[str]

    class Config:
        orm_mode = True

class UserCreate(UserBase):
    pass

class UserUpdate(UserBase):
    pass

class User(UserBase):
    user_id: int

    class Config:
        orm_mode = True
