document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');

    fetch('http://localhost:5000/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data.products)) {
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

            setupAddToCartButtons(); // Sepete ekleme butonlarına click eventleri ekle
        } else {
            productList.innerHTML = '<p>Ürün bulunamadı.</p>';
        }
    })
    .catch(error => {
        console.error('Hata:', error);
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

    fetch('http://localhost:5000/add-to-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ${token}'
        },
        body: JSON.stringify({ name, price })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error('Hata:', error);
        alert('Sepete eklerken bir hata oluştu.');
    });
}