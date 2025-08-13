let cartItems = [];

function addToCart(product) {
    const existingProduct = cartItems.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        // Store all needed product data in the cart
        cartItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    updateCartIcon();
    saveCartToStorage();
    renderCartItems(); 
}

// Update the cart icon with the number of items
function updateCartIcon() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Save cart to local storage
function saveCartToStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Load cart from local storage
function loadCartFromStorage() {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
        cartItems = JSON.parse(storedCart);
        renderCartItems(); 
        updateCartIcon()
    }
}

//Render cart items in the popup
function renderCartItems() {
    const container = document.getElementById('cartItemsContainer');
    const cartTitle = document.querySelector('#cartPopup h4'); // Get the cart title element

    container.innerHTML = ''; // Clear previous content

    if (cartItems.length === 0) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        if (cartTitle) cartTitle.textContent = 'Cart (Ghc 0.00)';
        return;
    }

    // Calculate total price
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Update title with total price
    if (cartTitle) {
        cartTitle.textContent = `Cart (Ghc ${totalPrice.toFixed(2)})`;
    }

    cartItems.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('cart-item');

        div.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-price">Ghc ${Number(item.price).toFixed(2)}</p>
                <p class="cart-item-quantity">Qty: ${item.quantity}</p>
            </div>
            <button class="remove-cart-item">✖</button>
        `;

        // Add event listener for remove button
        div.querySelector(".remove-cart-item").addEventListener("click", () => {
            removeFromCart(item.id);
        });

        container.appendChild(div);
    });
}

// Remove item from cart
function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartIcon();
    renderCartItems();
}


export { addToCart, loadCartFromStorage, cartItems};

