const API_URL = 'https://2557-176-220-34-206.ngrok-free.app'; // 💥 Güncel ngrok linkin burada

document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');

    fetch(`${API_URL}/products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true' // 💥 Bu header eklenince ngrok güvenlik ekranı bypass oluyor
        }
    })
    .then(response => {
        console.log("Raw response geldi:", response);
        return response.json();
    })
    .then(data => {
        console.log("Parsed JSON verisi:", data);

        if (data.products && Array.isArray(data.products)) {
            productList.innerHTML = ""; // Önce eski ürünleri temizle
            data.products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';

                productCard.innerHTML = `
                    <h2>${product.name}</h2>
                    <p>Fiyat: ${product.price} ₺</p>
                    <p>Stok: ${product.stock}</p>
                    <button class="add-to-cart-btn" data-name="${product.name}" data-price="${product.price}">
                        Sepete Ekle
                    </button>
                `;

                productList.appendChild(productCard);
            });

            setupAddToCartButtons();
        } else {
            productList.innerHTML = '<p>Ürün bulunamadı.</p>';
        }
    })
    .catch(error => {
        console.error('Ürünler yüklenirken hata oluştu:', error);
        productList.innerHTML = '<p>Ürünler yüklenirken hata oluştu.</p>';
    });
});

function setupAddToCartButtons() {
    const buttons = document.querySelectorAll('.add-to-cart-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const name = this.dataset.name;
            const price = Number(this.dataset.price);
            addToCart(name, price);
        });
    });
}

function addToCart(name, price) {
    const token = localStorage.getItem('token'); // Giriş yaptıysa burada token olacak

    if (!token) {
        alert('Sepete ürün eklemek için giriş yapmanız gerekiyor.');
        return;
    }

    fetch(`${API_URL}/add-to-cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true' // 💥 Buraya da ekledim!
        },
        body: JSON.stringify({ name, price })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error('Sepete ürün eklerken hata:', error);
        alert('Sepete ürün eklerken bir hata oluştu.');
    });
}



