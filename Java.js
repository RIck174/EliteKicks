// ======================== IMPORTS ========================
import { addToCart, loadCartFromStorage } from './cart.js';

// ======================== WISHLIST ========================
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

// ======================== NAV ACTIVE LINK ========================
function setActiveNavLink() {
    const currentPage = location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('.nav ul li a');

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
}

// ======================== CART BUTTONS ========================
function setupCartButtons() {
    if (window.location.pathname.includes('index.html') || 
        window.location.pathname === '/' || 
        window.location.pathname === '/index') {

        document.querySelectorAll('.Product-btn').forEach(button => {
            button.addEventListener('click', () => {
                const product = {
                    id: button.dataset.id,
                    name: button.dataset.name,
                    price: parseFloat(button.dataset.price),
                    image: button.dataset.image
                };
                addToCart(product);
            });
        });
    }
    loadCartFromStorage();
}

// ======================== CART POPUP ========================
function setupCartPopup() {
    const cartIcon = document.getElementById('cartIcon');
    const cartPopup = document.getElementById('cartPopup');

    if (cartIcon && cartPopup) {
        cartIcon.addEventListener('click', function (e) {
            e.stopPropagation();
            cartPopup.classList.toggle('show');
        });

        document.addEventListener('click', function () {
            cartPopup.classList.remove('show');
        });
    }
}

// ======================== CHECKOUT FORM ========================
function setupCheckoutForm() {
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function (e) {
            e.preventDefault();
            document.getElementById('checkout-form-container').style.display = 'none';
            document.getElementById('thank-you-message').classList.remove('hidden');
        });
    }
}

// ======================== SIGNUP FORM ========================
function setupSignupForm() {
    const signupForm = document.getElementById("signupForm");
    if (!signupForm) return; // Only run on signup page

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const fullName = signupForm.fullName.value.trim();
        const email = signupForm.email.value.trim();
        const password = signupForm.password.value.trim();
        const confirmPassword = signupForm.confirmPassword.value.trim();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];

        const userData = { fullName, email, password, cart: cartItems, wishlist: wishlistItems };

        // Save user data
        localStorage.setItem(`user_${email}`, JSON.stringify(userData));

        // Create "token" (just storing email here as identifier)
        localStorage.setItem("currentUser", email);

        alert(`Welcome ${fullName}! Your account has been created.`);

        // Redirect to homepage
        window.location.href = "index.html";
    });
}

// ======================== WISHLIST ICONS ========================
function setupWishlistIcons() {
    const heartIcons = document.querySelectorAll('.wishlist-icon');
    if (heartIcons.length > 0) {
        heartIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                const productCard = icon.closest('.product-card');
                const product = {
                    id: productCard.querySelector("button").dataset.id,
                    name: productCard.querySelector("button").dataset.name,
                    price: parseFloat(productCard.querySelector("button").dataset.price),
                    image: productCard.querySelector("button").dataset.image,
                };

                const wishlist = loadWishlist();
                const existingIndex = wishlist.findIndex(item => item.id === product.id);

                if (existingIndex > -1) {
                    wishlist.splice(existingIndex, 1);
                    icon.setAttribute("name", "heart-outline");
                } else {
                    wishlist.push(product);
                    icon.setAttribute("name", "heart");
                }

                saveWishlist(wishlist);
                updateWishlistCount();
            });
        });
        updateWishlistCount();
    }
}

// ======================== LOGIN / LOGOUT LINK ========================
function handleUserLinks() {
    const userList = document.querySelector('.User ul');
    if (!userList) return;

    // Find the login link (matching your navbar)
    const loginLink = Array.from(userList.querySelectorAll('a')).find(a => 
        a.getAttribute('href').toLowerCase() === 'login.html'
    );

    const currentUser = localStorage.getItem("currentUser");

    if (currentUser && loginLink) {
        loginLink.textContent = "Log Out";
        loginLink.href = "#";
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem("currentUser"); // Delete token
            location.reload(); // Refresh page
        });
    }
}



// ======================== LOGIN FORM ========================
function setupLoginForm() {
    const loginForm = document.getElementById("loginForm"); // make sure your login form has id="loginForm"
    if (!loginForm) return;

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = loginForm.email.value.trim();
        const password = loginForm.password.value.trim();

        // Get user data from localStorage
        const userData = JSON.parse(localStorage.getItem(`user_${email}`));

        if (!userData) {
            alert("User not found. Please sign up first.");
            return;
        }

        if (userData.password !== password) {
            alert("Incorrect password. Try again.");
            return;
        }

        // Save "token"
        localStorage.setItem("currentUser", email);

        alert(`Welcome back, ${userData.fullName}!`);
        window.location.href = "index.html"; // redirect to home page
    });
}


// ======================== INIT ========================
document.addEventListener('DOMContentLoaded', () => {
    setupLoginForm();
    setActiveNavLink();
    handleUserLinks(); // Replace Login with Logout if logged in
    setupCartButtons();
    setupCartPopup();
    setupCheckoutForm();
    setupSignupForm();
    setupWishlistIcons();
    updateWishlistCount();
});
