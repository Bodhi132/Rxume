import uuid
from sqlalchemy import Column, String , PrimaryKeyConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(
        UUID(as_uuid=True),
        default=uuid.uuid4,
        primary_key=True,
    )
    name = Column(String, nullable=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    img = Column(String, nullable=True)

