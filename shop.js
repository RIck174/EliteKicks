import { addToCart, loadCartFromStorage } from './cart.js';
loadCartFromStorage();



const products = [
  {
    id: 1,
    name: "Crimson Dash Runners",
    price: 79.99,
    rating: 4.6,
    image: "images/Image 18.png",
    category: "sports"
  },
  {
    id: 2,
    name: "Blaze Edge Sneakers",
    price: 64.50,
    rating: 4.3,
    image: "images/Image 15.png",
    category: "sports"
  },
  {
    id: 3,
    name: "Urban Stride Lows",
    price: 52.00,
    rating: 4.7,
    image: "images/Image 17.png",
    category: "shoes"
  },
  {
    id: 4,
    name: "Velocity Sprint Pros",
    price: 88.00,
    rating: 4.8,
    image: "images/Image 14.png",
    category: "sports"
  },
  {
    id: 5,
    name: "AeroLite Flex",
    price: 59.99,
    rating: 4.5,
    image: "images/Image 60.png",
    category: "sports"
  },
  {
    id: 6,
    name: "Shadow Glide Mids",
    price: 69.00,
    rating: 4.2,
    image: "images/Image 59.png",
    category: "shoes"
  },
  {
    id: 11,
    name: "Steel Pulse Trainers",
    price: 92.00,
    rating: 4.6,
    image: "images/Image 50.png",
    category: "shoes"
  },
  {
    id: 12,
    name: "Nimbus Street Classics",
    price: 75.00,
    rating: 4.4,
    image: "images/Image 51.png",
    category: "shoes"
  },
  {
    id: 13,
    name: "Phoenix Stride",
    price: 68.50,
    rating: 4.7,
    image: "images/Image 52.png",
    category: "shoes"
  },
  {
    id: 14,
    name: "Volt Dash 2.0",
    price: 85.99,
    rating: 4.9,
    image: "images/Image 53.png",
    category: "shoes"
  },
  {
    id: 15,
    name: "Carbon Flow X",
    price: 72.00,
    rating: 4.3,
    image: "images/Image 54.png",
    category: "shoes"
  },
  {
    id: 16,
    name: "Lunar Grip Boost",
    price: 95.00,
    rating: 4.8,
    image: "images/Image 55.png",
    category: "shoes"
  },
  {
    id: 17,
    name: "StreetWave Neo",
    price: 66.00,
    rating: 4.5,
    image: "images/Image 61.png",
    category: "shoes"
  },
  {
    id: 18,
    name: "HyperJet Air",
    price: 79.50,
    rating: 4.6,
    image: "images/Image57.png",
    category: "shoes"
  },
  {
    id: 19,
    name: "Zenith Glide",
    price: 82.99,
    rating: 4.4,
    image: "images/Image 58.png",
    category: "shoes"
  },
  {
    id: 20,
    name: "FlashCore Rev",
    price: 88.50,
    rating: 4.7,
    image: "images/Image 56.png",
    category: "shoes"
  },
  {
    id: 21,
    name: "AeroStride Max",
    price: 94.00,
    rating: 4.9,
    image: "images/12 Image.png",
    category: "shoes"
  },
  
];

  
  function displayProducts(productList) {
    const container = document.getElementById("productsContainer");
    container.innerHTML = "";
  
    productList.forEach(product => {
      const card = document.createElement('div');
      card.className = "product-card";
      
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3 class="product-name">${product.name}</h3>
        <div class="description">
          <p class="price">Ghc ${product.price.toFixed(2)}</p>
          <p class="rating">
            <ion-icon name="star" style="color: gold; vertical-align: middle;"></ion-icon> 
            ${product.rating}
          </p>
          <button 
            class="Product-btn" 
            data-id="${product.id}" 
            data-name="${product.name}" 
            data-price="${product.price}" 
            data-image="${product.image}"
          >
            Add to Cart
          </button>
        </div>
        <ion-icon class="wishlist-icon" name="heart-outline"></ion-icon>
      `;
  
      container.appendChild(card);
    });
  
    // ✅ Attach event listeners AFTER cards are added
  // ✅ Add "Add to Cart" button listeners only if buttons exist
  document.querySelectorAll('.Product-btn').forEach(button => {
    button.addEventListener('click', () => {
      const product = {
        id: button.dataset.id,
        name: button.dataset.name,
        price: parseFloat(button.dataset.price),
        image: button.dataset.image
      };
      addToCart(product);

      // ✅ Show "Added to cart" message if available
      const message = document.getElementById("cartMessage");
      if (message) {
        message.style.display = "block";
        setTimeout(() => { message.style.display = "none"; }, 2000);
      }
    });
  });
}

// ✅ Only run product display if products container exists
if (document.getElementById("productsContainer")) {
  displayProducts(products);

  // ✅ Category filter
  const categoryButtons = document.querySelectorAll(".category-btn");
  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selected = button.getAttribute("data-category");
      document.querySelector(".category-btn.active")?.classList.remove("active");
      button.classList.add("active");
      const filtered = selected === "all"
        ? products
        : products.filter(p => p.category === selected);
      displayProducts(filtered);
    });
  });

  // ✅ Search bar filter
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const searchValue = searchInput.value.toLowerCase();
      document.querySelectorAll(".product-card").forEach(card => {
        const name = card.querySelector(".product-name").textContent.toLowerCase();
        card.style.display = name.includes(searchValue) ? "block" : "none";
      });
    });
  }
}



