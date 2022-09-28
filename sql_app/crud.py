from sqlalchemy.orm import Session

from . import models, schemas


def get(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.user_id == user_id).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create(db: Session, user: schemas.UserCreate):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update(db: Session, user_id: int, user: schemas.UserUpdate):
    db_user = get(db=db, user_id=user_id)

    db_user.first_name = user.first_name
    db_user.surname = user.surname
    db_user.age = user.age
    db_user.gender = user.gender

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def delete(db: Session, user_id: int):
    db_user = get(db=db, user_id=user_id)

    db.delete(db_user)
    db.commit()
    return db_user

