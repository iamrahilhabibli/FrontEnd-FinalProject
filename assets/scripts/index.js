const clockImage = document.querySelector(".clock-section .clockimg");
new simpleParallax(clockImage, {
  overflow: true,
});
// needs parallax fixing
var mySwiper = new Swiper(".swiper-container", {
  speed: 2000,
  direction: "horizontal",
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
  zoom: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  loop: true,
});

const endDate = new Date();
endDate.setDate(endDate.getDate() + 15);

setInterval(updateCountdown, 1000);

function updateCountdown() {
  const now = new Date();
  const timeDifference = endDate - now;

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}
const shoppingCartIcon = document.querySelector(".fa-bag-shopping");
const modalCart = document.querySelector(".modal-dialog");
const modal = document.querySelector(".modal");
const closeBtn = document
  .querySelector(".modal-header")
  .querySelector(".closebtn");

const sideBarModal = document.querySelector(".sidebar-modal");
const sideBarModalDialog = document
  .querySelector(".sidebar-modal")
  .querySelector(".modal-dialog");
const sideBarCloseBtn = document
  .querySelector(".sidebar-modal")
  .querySelector(".modal-header")
  .querySelector(".closebtn");
const staggeredBar = document.querySelector(".fa-bars-staggered");
const modalContent = document
  .querySelector(".modal-dialog")
  .querySelector("modal-content");

shoppingCartIcon.addEventListener("click", () => {
  modal.style.display = "block";
  modalCart.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  modalCart.style.display = "none";
});
staggeredBar.addEventListener("click", () => {
  sideBarModal.style.display = "block";
  sideBarModalDialog.style.display = "block";
});
sideBarCloseBtn.addEventListener("click", () => {
  sideBarModal.style.display = "none";
  sideBarModalDialog.style.display = "none";
});

// BASKET START

// const itemContainer = document.querySelector(".item-container");
// const productContainer = document.querySelector(".navbar-cart-product");
// const subtotal = document.querySelector(".float-right");

// const addToCartButtons = document.querySelectorAll(".add-to-cart");

const products = [
  {
    id: 1,
    name: "Norwegg Chair",
    price: 40.0,
    category: "Chairs",
    image1: "./assets/images/greenchairzoomedout.jpg",
    count: 0,
  },
  {
    id: 2,
    name: "Book",
    price: 40.0,
    category: "Books",
    image: "./assets/images/books1.jpg",
    count: 0,
  },
  {
    id: 3,
    name: "Another Chair",
    price: 40.0,
    category: "Chairs",
    image: "./assets/images/anotherchair1.jpg",
    count: 0,
  },
  {
    id: 4,
    name: "Your new chair",
    price: 40.0,
    category: "Chairs",
    image: "./assets/images/yournewchair1.jpg",
    count: 0,
  },
  {
    id: 5,
    name: "Clock",
    price: 40.0,
    category: "Accessories",
    image: "./assets/images/clock1.jpg",
    count: 0,
  },
  {
    id: 6,
    name: "Clock",
    price: 40.0,
    category: "Accessories",
    image: "./assets/images/clock2-1.jpg",
    count: 0,
  },
  {
    id: 7,
    name: "Accessory box",
    price: 40.0,
    category: "Accessories",
    image: "./assets/images/accessorybox-1.jpg",
    count: 0,
  },
  {
    id: 8,
    name: "Beige",
    price: 40.0,
    category: "Accessories",
    image: "./assets/images/beige1.jpg",
    count: 0,
  },
];
const itemContainer = document.querySelector(".item-container");
const productContainer = document.querySelector(".navbar-cart-product");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
let cart = [];

addToCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const productId = parseInt(event.target.dataset.productId);
    const product = products.find((p) => p.id === productId);

    if (product) {
      const cartItem = cart.find((item) => item.id === productId);
      if (cartItem) {
        cartItem.count++;
      } else {
        cart.push({ id: productId, count: 1, ...product });
      }

      renderCartItem(product);
      saveCart();
    } else {
      console.log(`Product with ID ${productId} not found.`);
    }
  });
});

function renderCartItem(product) {
  const itemContainer = document.createElement("div");
  itemContainer.classList.add("item-container");

  itemContainer.innerHTML = `
    <a href=""><img class="itemimg" src="${product.image}" alt="" /></a>
    <div class="item-content">
      <a class="closebtn-deleteitem" href="#">
        <button class="closebtn-deleteitem" type="button">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </a>
      <div class="pl-3">
        <a class="navbar-cart-product" href="">${product.name}</a>
        <small class="d-block text-muted">Quantity: ${product.count}</small>
        <strong class="d-block text-sm">$${product.price.toFixed(2)}</strong>
      </div>
    </div>
  `;

  productContainer.appendChild(itemContainer);
}

function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

function loadCart() {
  const savedCart = JSON.parse(localStorage.getItem("shoppingCart"));
  if (savedCart) {
    cart = savedCart;
    for (const item of cart) {
      renderCartItem(item);
    }
  }
}

if (localStorage.getItem("shoppingCart") != null) {
  loadCart();
}

const clearCartButton = document.querySelector(".btn-danger");

clearCartButton.addEventListener("click", () => {
  clearCart();
});

function clearCart() {
  cart = [];

  localStorage.removeItem("shoppingCart");

  const productContainer = document.querySelector(".navbar-cart-product");
  productContainer.innerHTML = "";

  const subtotal = document.querySelector(".float-right");
  subtotal.innerText = "$0";
}
