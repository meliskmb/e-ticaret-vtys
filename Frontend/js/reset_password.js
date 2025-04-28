document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reset-password-form');

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
        alert('Geçersiz bağlantı.');
        window.location.href = 'login.html';
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const newPassword = document.getElementById('new-password').value;

        fetch('http://localhost:5000/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ password: newPassword })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            window.location.href = 'login.html'; // Başarılıysa giriş sayfasına yönlendir
        })
        .catch(error => {
            console.error('Hata:', error);
            alert('Bir hata oluştu.');
        });
    });
});