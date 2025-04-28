# e-ticaret-vtys
# 📦 E-Ticaret Sistemi Backend (Flask + MySQL + MongoDB)

Bu proje, bir e-ticaret uygulamasının backend tarafını Flask framework kullanarak geliştirmek amacıyla hazırlanmıştır.  
Kullanıcı yönetimi MySQL veritabanı ile, ürün/sepet/sipariş yönetimi ise MongoDB veritabanı ile yapılmıştır.  
JWT tabanlı güvenli authentication sistemi ve işlem bazlı e-posta bildirimleri de sisteme entegre edilmiştir.

---

## 🚀 Kullanılan Teknolojiler

- Python 3
- Flask
- Flask-JWT-Extended
- Flask-SQLAlchemy (MySQL için)
- Flask-PyMongo (MongoDB için)
- Flask-Mail (SMTP ile e-posta gönderimi)
- MySQL (XAMPP)
- MongoDB (Compass GUI)
- Ngrok (Dış dünya bağlantısı için)
- Postman (API testleri)

---

## ⚙️ Veritabanı Yapısı

### MySQL
- Kullanıcı bilgileri (email, password, role, first_name, last_name) `users` tablosunda tutulur.
- Flask-SQLAlchemy ile bağlantı sağlanır.

### MongoDB
- Ürünler `products` koleksiyonunda saklanır.
- Sepetler `cart` koleksiyonunda tutulur.
- Siparişler `orders` koleksiyonunda saklanır.
- Flask-PyMongo kullanılır.

---

## 🛠️ Projeyi Kurmak İçin Adımlar

### 1. Depoyu Klonla
```bash
git clone [repo-linki]
cd eTicaretVtys
```
2. Sanal Ortamı Oluştur ve Aktifleştir
```bash
python -m venv venv
```
CMD kullanıyorsan:
```bash
venv\Scripts\activate.bat
```
PowerShell kullanıyorsan:
```bash
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1
```                                                                                                                                                                                            
4. Gerekli Paketleri Yükle
```bash
pip install -r requirements.txt
```                                                                                                                                                                                           
6. MySQL ve MongoDB'yi Başlat
XAMPP üzerinden MySQL servisini başlat.
MongoDB Compass üzerinden eTicaretDB veritabanını oluştur.

7. Flask Uygulamasını Çalıştır
```bash
python run.py
```
Çalışınca şu mesajı görmelisin:
Running on http://127.0.0.1:5000/                                                                                                                                                                                    
🌐 Ngrok Kullanımı (Frontend ile Bağlantı için)
Başka bilgisayardan frontend erişimi için ngrok kullanılır.                                                                                                                                                          
Ngrok Kurulumu
Ngrok İndir
Terminalde çalıştır:
ngrok authtoken [senin-tokenin]
Localhost'u Açığa Çıkarmak
ngrok http 5000
Ngrok sana bir link verecek.
Örneğin: https://abcd-1234.ngrok-free.app
Frontend tarafı bu linki kullanarak backend'e ulaşacak.
DİKKAT: Ngrok linki her başlatıldığında değişir!

⚡ Olası Hatalar ve Çözümleri
Hata	Çözüm
'ngrok' is not recognized	CMD'de .\ngrok.exe komutu ile çalıştır.
ModuleNotFoundError: No module named 'flask'	Sanal ortamı aktif et ve pip install flask komutu ile Flask yükle.
SQLAlchemy OperationalError	MySQL servisini başlatmayı unutma.
MongoDB Connection Error	MongoDB Compass'ın açık olduğundan emin ol.
JWT Token Missing	API isteklerinde Authorization header ekle: Bearer {token}.
CORS Policy Error	Flask'a from flask_cors import CORS ekle ve CORS(app) kullan.                                                                                                                                      
🛡️ Projenin Sağladığı Özellikler
Kullanıcı kayıt ve login işlemleri

JWT ile güvenli kimlik doğrulama

Rol tabanlı erişim (Müşteri / Tedarikçi)

Şifre sıfırlama (E-posta ile)

Ürün ekleme, güncelleme, silme (soft-delete)

Sepete ürün ekleme ve listeleme

Sipariş oluşturma

Sepet ve sipariş sonrası e-posta bildirimleri

API testleri (Postman ile)

👨‍💻 Proje Ekibi
Sema Hacıbekiroğlu - 427635

Mihriban Melis Kömbe - 427636

Zeynep Merve Koyuncu - 427642

