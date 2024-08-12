let products = null;
let cart = null;
// get datas from file json
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
    })

function addDataToHTML() {
    // remove datas default from HTML
    let listProductHTML = document.querySelector('.listProduct');

    // add new datas
    if (products != null) // if has data
    {
        products.forEach(product => {
            let newProduct = document.createElement('a');
            newProduct.href = '/detail.html?id=' + product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML =
                `<img src="${product.image}" alt="">
        <h2>${product.name}</h2>
        <div class="price">$${product.price}</div>`;
            listProductHTML.appendChild(newProduct);

        });
    }
}

if (products !== null) { // Check if products data is available
    products.forEach(product => {
        let newProduct = document.createElement('div');
        newProduct.classList.add('item');
        newProduct.innerHTML = `
        <img src="${product.image}" alt="">
        <h2>${product.name}</h2>
        <div class="price">$${product.price.toFixed(2)}</div>
        <input type="number" min="1" value="1" id="quantity-${product.id}" />
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
        listProductHTML.appendChild(newProduct);
    });
}

function addToCart(productId) {
    const quantity = parseInt(document.getElementById(`quantity-${productId}`).value, 10);
    const product = products.find(p => p.id === productId);

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }

    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartTotalDiscount = document.getElementById('cart-total-discount');
    cartItems.innerHTML = '';

    const discount = 0.1; // Example discount (10%)
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = total.toFixed(2);
    cartTotalDiscount.textContent = (total - (total * discount)).toFixed(2);
}

function openCart() {
    document.getElementById('cart-modal').style.display = 'block';
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

document.getElementById('open-cart').addEventListener('click', openCart);
document.getElementById('close-cart').addEventListener('click', closeCart);