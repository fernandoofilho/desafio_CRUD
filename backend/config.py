
class Config:
    database= 'users_database'
    SQLALCHEMY_DATABASE_URI = f'postgresql://postgres:INDT%402024@localhost:5432/{database}'
    JWT_SECRET_KEY = 'INDT@2024'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'INDT@2024'
