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

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;

            fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, role, first_name: firstName, last_name: lastName })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.message === "Kayıt başarılı") {
                    window.location.href = 'login.html';
                }
            })
            .catch(error => {
                console.error('Hata:', error);
                alert('Kayıt sırasında bir hata oluştu.');
            });
        });
    }
});