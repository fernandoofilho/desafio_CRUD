
class Config:
    DEBUG= True
    database= 'postgres'
    SQLALCHEMY_DATABASE_URI = f'postgresql://postgres:INDT%402024@database:5432/{database}'
    JWT_SECRET_KEY = 'INDT@2024'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'INDT@2024'
