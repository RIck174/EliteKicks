import { addToCart } from './cart.js';

function loadWishlist() {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function saveWishlist(wishlist) {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function updateWishlistCount() {
    const wishlist = loadWishlist();
    const countSpan = document.querySelector(".wishlist-count");
    if (countSpan) countSpan.textContent = wishlist.length;
}

function renderWishlist() {
    const wishlist = loadWishlist();
    const container = document.getElementById("wishlistContainer");
    container.innerHTML = "";

    if (wishlist.length === 0) {
        container.innerHTML = "<p>Your wishlist is empty.</p>";
        return;
    }

    wishlist.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("wishlist-card");
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>Price: GHC ${product.price.toFixed(2)}</p>
            <p class="details">These are top-quality sneakers for elite style and comfort.</p>
            <button class="add-to-cart">Add to Cart</button>
            <button class="remove-from-wishlist">Remove</button>
        `;

        card.querySelector(".add-to-cart").addEventListener("click", () => {
            addToCart(product);
            alert("Added to cart!");
        });

        card.querySelector(".remove-from-wishlist").addEventListener("click", () => {
            const updated = loadWishlist().filter(item => item.id !== product.id);
            saveWishlist(updated);
            renderWishlist();
            updateWishlistCount();
        });

        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderWishlist();
    updateWishlistCount();
});
