import pymysql
pymysql.install_as_MySQLdb()

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from flask_pymongo import PyMongo
from flask_cors import CORS  # CORS'u import et


db = SQLAlchemy()
jwt = JWTManager()
mail = Mail()
mongo = PyMongo()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    db.init_app(app)
    jwt.init_app(app)
    mail.init_app(app)
    mongo.init_app(app)

    CORS(app)  # 🔥 CORS'u burada aktif ettik

    # Blueprint'leri burada ekliyoruz
    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp)

    return app
