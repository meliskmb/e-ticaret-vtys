document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Sayfa yenilenmesini engelle

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    localStorage.setItem('token', data.token); // Tokenı kaydet
                    alert('Giriş başarılı!');
                    window.location.href = 'index.html'; // Ürünler sayfasına yönlendir
                } else {
                    alert('Giriş başarısız: ' + (data.message || 'Bilinmeyen hata'));
                }
            })
            .catch(error => {
                console.error('Hata:', error);
                alert('Giriş sırasında bir hata oluştu.');
            });
        });
    }
});