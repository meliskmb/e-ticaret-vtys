// js/reset_password.js

const API_URL = 'https://3b16-176-30-250-25.ngrok-free.app'; // 💥 Güncel backend ngrok linkin

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('reset-password-form');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Sayfanın refresh olmasını engelle

        const newPassword = document.getElementById('new-password').value;

        if (!newPassword) {
            alert("Lütfen yeni şifrenizi girin.");
            return;
        }

        // URL'den token'ı çekiyoruz
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (!token) {
            alert("Token bulunamadı. Şifre sıfırlama bağlantısı hatalı.");
            return;
        }

        fetch(`${API_URL}/reset-password`, { // ✅ ŞİMDİ /reset-password endpointine gidiyoruz
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Tokenı Authorization header'a koyduk
                'ngrok-skip-browser-warning': 'true' // 🔥 ngrok güvenlik bypass
            },
            body: JSON.stringify({ password: newPassword })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);

            // Şifre başarılı şekilde değişirse giriş sayfasına yönlendir
            window.location.href = 'login.html'; // (İstersen login.html yoksa index.html yapabilirsin)
        })
        .catch(error => {
            console.error('Şifre sıfırlamada hata oluştu:', error);
            alert('Şifre sıfırlamada bir hata oluştu.');
        });
    });
});
