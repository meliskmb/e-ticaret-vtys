from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from flask_pymongo import PyMongo

db = SQLAlchemy()
jwt = JWTManager()
mail = Mail()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    db.init_app(app)
    jwt.init_app(app)
    mail.init_app(app)

    # Blueprint'ler sonra burada eklenecek
        # Blueprint'leri burada ekleyeceğiz
    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp)

    return app

mongo = PyMongo()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    db.init_app(app)
    jwt.init_app(app)
    mail.init_app(app)
    mongo.init_app(app)  # 🔥 MongoDB bağlantısı

    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp)

    return app

