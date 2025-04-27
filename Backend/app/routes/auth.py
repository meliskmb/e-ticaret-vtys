from flask import Blueprint, request, jsonify, current_app
from app.models.user import User
from app import db, mail
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_jwt_extended import get_jwt
from app import mongo
from flask_mail import Message
from datetime import timedelta
from flask import current_app
from bson import ObjectId, errors


auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')
    first_name = data.get('first_name')
    last_name = data.get('last_name')

    if not all([email, password, role, first_name, last_name]):
        return jsonify({"message": "Tüm alanlar zorunludur."}), 400

    hashed_password = generate_password_hash(password)
    user = User(
        email=email,
        password=hashed_password,
        role=role,
        first_name=first_name,
        last_name=last_name
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Kayıt başarılı"}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({'message': 'Geçersiz bilgiler'}), 401

    token = create_access_token(identity=str(user.id), additional_claims={"role": user.role})


    return jsonify({'token': token}), 200


@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
     user_id = get_jwt_identity()
     return jsonify({
        "message": f"Hoş geldin, {user_id} numaralı kullanıcı!"
    })


@auth_bp.route('/add-product', methods=['POST'])
@jwt_required()
def add_product():
    claims = get_jwt()
    if claims['role'] != 'supplier':
        return jsonify({"message": "Bu işlem yalnızca tedarikçilere açıktır"}), 403

    data = request.get_json()
    name = data.get('name')
    price = data.get('price')
    stock = data.get('stock')

    if not name or not price or not stock:
        return jsonify({"message": "Tüm alanlar zorunludur"}), 400

    # MongoDB'ye veri ekleme
    mongo.db.products.insert_one({
        "name": name,
        "price": price,
        "stock": stock
    })

    return jsonify({
        "message": "Ürün başarıyla MongoDB'ye kaydedildi",
        "product": {
            "name": name,
            "price": price,
            "stock": stock
        }
    }), 201



@auth_bp.route('/add-to-cart', methods=['POST'])
@jwt_required()
def add_to_cart():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    name = data.get('name')
    price = data.get('price')
    quantity = data.get('quantity', 1)

    if not name or not price:
        return jsonify({"message": "Ürün adı ve fiyat zorunludur"}), 400

    existing_cart = mongo.db.cart.find_one({"user_id": user_id})

    product = {
        "name": name,
        "price": price,
        "quantity": quantity
    }

    if existing_cart:
        mongo.db.cart.update_one(
            {"user_id": user_id},
            {
                "$push": {"products": product},
                "$inc": {"total_price": price * quantity}
            }
        )
    else:
        new_cart = {
            "user_id": user_id,
            "products": [product],
            "total_price": price * quantity
        }
        mongo.db.cart.insert_one(new_cart)

    # 🛎️ Burada E-posta Gönderimi
    user = User.query.get(user_id)
    if not user or not user.email:
        return jsonify({"message": "Kullanıcı bilgisi alınamadı veya e-posta tanımsız."}), 400

    msg = Message(
        subject="Sepetiniz Güncellendi",
        sender=current_app.config['MAIL_USERNAME'],
        recipients=[user.email]
     )
    msg.body = f"Merhaba {user.first_name},\nSepetinize {quantity} adet '{name}' ürünü eklendi."
    mail.send(msg)


    return jsonify({
        "message": "Ürün sepete eklendi ve e-posta gönderildi",
        "product": product
    }), 200



@auth_bp.route('/cart', methods=['GET'])
@jwt_required()
def get_cart():
    user_id = get_jwt_identity()

    cart = mongo.db.cart.find_one({"user_id": user_id})
    if not cart:
        return jsonify({"message": "Sepetiniz boş"}), 404

    updated_products = []
    for item in cart["products"]:
        product_in_db = mongo.db.products.find_one({"name": item["name"]})
        if product_in_db and product_in_db.get("deleted"):
            item["note"] = "Bu ürün tedarikçi tarafından silinmiştir."
        updated_products.append(item)

    return jsonify({
        "user_id": cart["user_id"],
        "products": updated_products,
        "total_price": cart["total_price"]
    }), 200


@auth_bp.route('/checkout', methods=['POST'])
@jwt_required()
def checkout():
    user_id = get_jwt_identity()

    cart = mongo.db.cart.find_one({"user_id": user_id})
    if not cart or not cart.get("products"):
        return jsonify({"message": "Sepetiniz boş, sipariş oluşturulamadı."}), 400

    order = {
        "user_id": user_id,
        "products": cart["products"],
        "total_price": cart["total_price"]
    }

    mongo.db.orders.insert_one(order)
    mongo.db.cart.delete_one({"user_id": user_id})

    # 📩 Sipariş sonrası E-Posta Gönderimi
    user = User.query.get(user_id)
    if user and user.email:
        msg = Message(
            subject="Siparişiniz Alındı",
            sender=current_app.config['MAIL_USERNAME'],
            recipients=[user.email]
        )
        msg.body = f"Merhaba {user.first_name},\nSiparişiniz başarıyla alınmıştır. Toplam Tutar: {cart['total_price']}₺"
        mail.send(msg)

    return jsonify({
        "message": "Siparişiniz başarıyla oluşturuldu ve e-posta gönderildi!",
        "order": order
    }), 201


@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"message": "Bu e-posta ile eşleşen kullanıcı yok."}), 404

    token = create_access_token(identity=str(user.id), expires_delta=timedelta(minutes=15))

    msg = Message("Şifre Sıfırlama Bağlantısı",
                  sender=current_app.config['MAIL_USERNAME'],
                  recipients=[email])
    msg.body = f"Şifrenizi sıfırlamak için bu bağlantıya tıklayın:\nhttp://localhost:5000/reset-password?token={token}"

    mail.send(msg)

    return jsonify({"message": "Şifre sıfırlama bağlantısı e-posta ile gönderildi."}), 200


@auth_bp.route('/reset-password', methods=['POST'])
@jwt_required()
def reset_password():
    user_id = get_jwt_identity()
    data = request.get_json()
    new_password = data.get('password')

    if not new_password:
        return jsonify({"message": "Yeni şifre boş olamaz"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "Kullanıcı bulunamadı"}), 404

    user.password = generate_password_hash(new_password)
    db.session.commit()

    return jsonify({"message": "Şifreniz başarıyla güncellendi."}), 200


@auth_bp.route('/update-profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "Kullanıcı bulunamadı."}), 404

    data = request.get_json()

    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.email = data.get('email', user.email)

    if data.get('password'):
        user.password = generate_password_hash(data.get('password'))

    db.session.commit()

    return jsonify({
        "message": "Profil başarıyla güncellendi.",
        "updated": {
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name
        }
    }), 200


@auth_bp.route('/update-product/<product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    claims = get_jwt()
    if claims['role'] != 'supplier':
        return jsonify({"message": "Bu işlem yalnızca tedarikçilere açıktır."}), 403

    data = request.get_json()

    update_data = {}
    if 'name' in data:
        update_data['name'] = data['name']
    if 'price' in data:
        update_data['price'] = data['price']
    if 'stock' in data:
        update_data['stock'] = data['stock']

    result = mongo.db.products.update_one(
        {"_id": ObjectId(product_id)},
        {"$set": update_data}
    )

    if result.matched_count == 0:
        return jsonify({"message": "Ürün bulunamadı."}), 404

    return jsonify({"message": "Ürün başarıyla güncellendi."}), 200


@auth_bp.route('/delete-product/<product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    claims = get_jwt()
    if claims['role'] != 'supplier':
        return jsonify({"message": "Bu işlem yalnızca tedarikçilere açıktır."}), 403

    try:
        object_id = ObjectId(product_id)
    except Exception:
        return jsonify({"message": "Geçersiz ürün ID"}), 400

    result = mongo.db.products.update_one(
        {"_id": ObjectId(product_id)},
        {"$set": {"deleted": True}}
    )

    if result.matched_count == 0:
        return jsonify({"message": "Ürün bulunamadı."}), 404

    return jsonify({"message": "Ürün silindi (soft-delete olarak işaretlendi)."}), 200

@auth_bp.route('/products', methods=['GET'])
def get_products():
    products_cursor = mongo.db.products.find({"deleted": {"$ne": True}})
    products = []
    for product in products_cursor:
        products.append({
            "id": str(product["_id"]),
            "name": product["name"],
            "price": product["price"],
            "stock": product["stock"]
        })
    return jsonify({"products": products}), 200
