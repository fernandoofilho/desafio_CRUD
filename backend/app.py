from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config 
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config.from_object(Config)
jwt = JWTManager(app)
CORS(app)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

from routes import *

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int("5000"), debug=True)
