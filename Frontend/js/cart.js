// js/cart.js

document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    const token = localStorage.getItem('token');

    if (!token) {
        alert('Sepetinizi görüntülemek için giriş yapmalısınız.');
        window.location.href = 'login.html';
        return;
    }

    fetch('http://localhost:5000/cart', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.products) {
            let total = 0;

            data.products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'cart-item';

                let note = '';
                if (product.note) {
                    note = `<p class="warning">${product.note}</p>`;
                }

                productDiv.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>Fiyat: ${product.price} ₺</p>
                    <p>Adet: ${product.quantity}</p>
                    ${note}
                `;

                cartItemsContainer.appendChild(productDiv);

                total += product.price * product.quantity;
            });

            totalPriceElement.textContent = `Toplam: ${total} ₺`;
        } else {
            cartItemsContainer.innerHTML = '<p>Sepetiniz boş.</p>';
        }
    })
    .catch(error => {
        console.error('Hata:', error);
        cartItemsContainer.innerHTML = '<p>Sepet yüklenirken hata oluştu.</p>';
    });

    checkoutBtn.addEventListener('click', function() {
        fetch('http://localhost:5000/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            window.location.reload(); // Başarılıysa sepeti sıfırla
        })
        .catch(error => {
            console.error('Hata:', error);
            alert('Ödeme sırasında bir hata oluştu.');
        });
    });
});
