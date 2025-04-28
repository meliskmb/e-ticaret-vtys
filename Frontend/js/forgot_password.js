document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('forgot-password-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;

        fetch('http://localhost:5000/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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