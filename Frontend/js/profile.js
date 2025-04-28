document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Profilinizi görüntülemek için giriş yapmalısınız.');
        window.location.href = 'login.html';
        return;
    }

    const profileForm = document.getElementById('profile-form');

    // Profil bilgilerini yükle
    fetch('http://localhost:5000/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        // data.message içinde "Hoş geldin kullanıcı id" yazıyordu.
        // Gerçek profil bilgilerini görmek için istersek backend'de genişletme yaparız.
        console.log('Profil Bilgileri:', data); // Test için
    })
    .catch(error => {
        console.error('Hata:', error);
        alert('Profil bilgileri yüklenirken hata oluştu.');
    });

    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const updatedFirstName = document.getElementById('first-name').value;
        const updatedLastName = document.getElementById('last-name').value;
        const updatedEmail = document.getElementById('email').value;
        const updatedPassword = document.getElementById('password').value;

        const updateData = {
            first_name: updatedFirstName,
            last_name: updatedLastName,
            email: updatedEmail,
        };

        if (updatedPassword) {
            updateData.password = updatedPassword;
        }

        fetch('http://localhost:5000/update-profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updateData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error('Hata:', error);
            alert('Profil güncellenirken hata oluştu.');
        });
    });
});