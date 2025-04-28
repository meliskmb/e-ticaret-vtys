
const API_URL = 'https://3b16-176-30-250-25.ngrok-free.app'; // 💥 Backend ngrok linkin burada

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('forgot-password-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;

        fetch(`${API_URL}/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true' // 💥 Ngrok güvenlik ekranını bypass etmek için
            },
            body: JSON.stringify({ email })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error('Hata:', error);
            alert('Bir hata oluştu.');
        });
    });
});
