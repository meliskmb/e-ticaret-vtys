# 🛒 E-Ticaret Web Sitesi (Frontend)

Bu proje basit bir e-ticaret web sitesi frontendidir.  
Kullanıcılar ürünleri görebilir, sepete ekleyebilir, kayıt olabilir, giriş yapabilir ve şifrelerini sıfırlayabilir.

## 📁 Dosya Yapısı

### Ana HTML Dosyaları
- `index.html` → Ürünlerin listelendiği ana sayfa
- `login.html` → Giriş yapma sayfası
- `register.html` → Kayıt olma sayfası
- `profile.html` → Kullanıcı profil bilgileri ve güncelleme sayfası
- `cart.html` → Kullanıcının sepetini görüntülediği sayfa
- `forgot-password.html` → Şifre sıfırlama maili gönderme sayfası
- `reset-password.html` → Yeni şifre belirleme sayfası
- `add_product.html` → (Sadece tedarikçiler için) Ürün ekleme ve yönetim sayfası

### JavaScript Dosyaları (`/js`)
- `auth.js` → Giriş ve kayıt işlemleri
- `products.js` → Ürünleri listeleme ve sepete ekleme
- `cart.js` → Sepet işlemleri ve ödeme
- `profile.js` → Profil görüntüleme ve güncelleme
- `forgot_password.js` → Şifre sıfırlama maili gönderme
- `reset_password.js` → Şifreyi sıfırlama (token ile)
- `add_product.js` → Tedarikçi için ürün ekleme, güncelleme ve silme

### CSS Dosyaları (`/css`)
- `style.css` → Genel sayfa stilleri (index.html için)
- `login.css` → Giriş, kayıt, şifre sıfırlama sayfası stilleri
- `profile.css` → Profil sayfası stilleri
- `cart.css` → Sepet sayfası stilleri
- `add_product.css` → Ürün yönetim sayfası stilleri

---

## 🔗 Önemli Linkler

- **Şifre sıfırlama mailindeki link formatı**:  
https://seninsiten.com/reset-password.html?token=abcdef123456

(Dikkat: `.html` uzantısı eklenmeli yoksa 404 hatası alırsınız.)

- **Backend API URL'leri**:  
Bazı JS dosyalarında backend URL'si `http://localhost:5000` ve bazı dosyalarda `https://3b16-176-30-250-25.ngrok-free.app` kullanılmıştır.  
(Kendi ortamınıza göre düzenleyiniz.)

---

## 🔥 Ana Özellikler

### Ürünler
- Ürünler `index.html` sayfasında listelenir.
- "Sepete Ekle" butonu ile sepete eklenir.

### Sepet
- Sepete eklenen ürünler `cart.html` sayfasında görüntülenir.
- Sepetteki ürünlerin toplam fiyatı hesaplanır.
- "Ödeme Yap" butonu ile ödeme işlemi başlatılır.

### Kullanıcı İşlemleri
- **Kayıt Ol** (`register.html`) → Müşteri veya Tedarikçi seçilerek kayıt olunur.
- **Giriş Yap** (`login.html`) → JWT token ile oturum açılır.
- **Profil Güncelle** (`profile.html`) → Ad, soyad, email ve şifre güncellenebilir.

### Şifre Sıfırlama
- **Şifremi Unuttum** (`forgot-password.html`) → Mail adresi ile sıfırlama linki gönderilir.
- **Yeni Şifre Belirle** (`reset-password.html`) → Maildeki linke tıklayıp yeni şifre oluşturulur.

### Tedarikçi İşlemleri
- Sadece `role: supplier` olan kullanıcılar ürün ekleyebilir ve yönetebilir (`add_product.html`).

---

## ⚡ Kurulum ve Kullanım

1. Frontend dosyalarını bir sunucuya atın (örnek: Vercel, Netlify, veya basit bir Node.js server).
2. `index.html` üzerinden siteyi başlatın.
3. Backend API'lerin URL'lerini (`localhost`, `ngrok` linki gibi) kendi ortamınıza göre güncelleyin.
4. Mail gönderim kodlarında şifre sıfırlama linkine `.html` uzantısını eklemeyi unutmayın.

---

## ⚠️ Dikkat Edilmesi Gerekenler

- Frontend sabit HTML dosyalarıdır. SPA (Single Page Application) değildir.
- Backend ile iletişim `fetch` API kullanılarak yapılır.
- Bazı isteklerde (ngrok gibi) `"ngrok-skip-browser-warning": "true"` header'ı eklenmiştir.
- Tüm güvenlik kontrolleri frontend'de gösterilmiştir ama backend'de ayrıca yapılmalıdır.

---

## 📜 Yazar
Bu proje öğrenme amaçlı geliştirilmiştir.  
Frontend kısmı HTML, CSS ve Vanilla JS kullanılarak yapılmıştır.


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



