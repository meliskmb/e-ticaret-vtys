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

