
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const addProductForm = document.getElementById('add-product-form');
    const productList = document.getElementById('product-list');

    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.role;

        if (role === 'supplier') {
            document.getElementById('supplier-link').style.display = 'inline-block';
        }
    }

    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });

    if (!token) {
        alert('Bu sayfaya erişmek için giriş yapmalısınız.');
        window.location.href = 'login.html';
        return;
    }

    const payload = JSON.parse(atob(token.split('.')[1])); // Token'ın payload kısmını al
    const role = payload.role;

    if (role !== 'supplier') {
        addProductForm.style.display = 'none';
        alert('Sadece tedarikçiler ürün ekleyebilir.');
    }

    // Ürünleri Listele
    fetch('http://localhost:5000/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.products) {
            data.products.forEach(product => {
                const div = document.createElement('div');
                div.className = 'product-item';

                div.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>Fiyat: ${product.price} ₺</p>
                    <p>Stok: ${product.stock}</p>
                    <button class="update-btn" data-id="${product.id}">Güncelle</button>
                    <button class="delete-btn" data-id="${product.id}">Sil</button>
                `;

                productList.appendChild(div);
            });

            setupProductButtons();
        }
    })
    .catch(error => console.error('Hata:', error));

    // Ürün Ekleme
    addProductForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const price = Number(document.getElementById('price').value);
        const stock = Number(document.getElementById('stock').value);

        fetch('http://localhost:5000/add-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, price, stock })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            window.location.reload(); // Sayfayı yenile
        })
        .catch(error => console.error('Hata:', error));
    });
});

function setupProductButtons() {
    const token = localStorage.getItem('token');

    const updateButtons = document.querySelectorAll('.update-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');

    updateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.id;
            const newName = prompt('Yeni ürün adı:');
            const newPrice = prompt('Yeni fiyat:');
            const newStock = prompt('Yeni stok adedi:');

            fetch(`http://localhost:5000/update-product/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: newName,
                    price: Number(newPrice),
                    stock: Number(newStock)
                })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                window.location.reload();
            })
            .catch(error => console.error('Hata:', error));
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.id;

            fetch(`http://localhost:5000/delete-product/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                window.location.reload();
            })
            .catch(error => console.error('Hata:', error));
        });
    });
}
