from pydantic_settings import BaseSettings , SettingsConfigDict

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    AUTH_GOOGLE_ID: str
    AUTH_GOOGLE_SECRET: str
    AUTH_GITHUB_CLIENT_ID: str
    AUTH_GITHUB_CLIENT_SECRET: str
    OPENAI_API_KEY: str

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()