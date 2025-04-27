class Config:
    SECRET_KEY = 'super-secret-key'
    SQLALCHEMY_DATABASE_URI = 'mysql://root:@localhost/users_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = 'jwt-secret-key'

    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'semaahacibekiroglu@gmail.com'     # Gmail hesabım
    MAIL_PASSWORD = 'opkuleuqnhoflqgp'          # Gmail uygulama şifresi mail silme icin olusturdum
    MONGO_URI = "mongodb://localhost:27017/eTicaretDB"
