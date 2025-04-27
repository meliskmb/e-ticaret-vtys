from app import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum('customer', 'supplier'), default='customer')
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))

    def __repr__(self):
        return f'<User {self.email}>'
