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

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
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
    count: 1,
  },
  {
    id: 2,
    name: "Book",
    price: 40.0,
    category: "Books",
    image: "./assets/images/books1.jpg",
    count: 1,
  },
  {
    id: 3,
    name: "Another Chair",
    price: 40.0,
    category: "Chairs",
    image: "./assets/images/anotherchair1.jpg",
    count: 1,
  },
  {
    id: 4,
    name: "Your new chair",
    price: 40.0,
    category: "Chairs",
    image: "./assets/images/yournewchair1.jpg",
    count: 1,
  },
  {
    id: 5,
    name: "Clock",
    price: 40.0,
    category: "Accessories",
    image: "./assets/images/clock1.jpg",
    count: 1,
  },
  {
    id: 6,
    name: "Clock",
    price: 40.0,
    category: "Accessories",
    image: "./assets/images/clock2-1.jpg",
    count: 1,
  },
  {
    id: 7,
    name: "Accessory box",
    price: 40.0,
    category: "Accessories",
    image: "./assets/images/accessorybox-1.jpg",
    count: 1,
  },
  {
    id: 8,
    name: "Beige",
    price: 40.0,
    category: "Accessories",
    image: "./assets/images/beige1.jpg",
    count: 1,
  },
];
const itemContainer = document.querySelector(".item-container");

const productContainer = document.querySelector(".navbar-cart-product");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const subtotal = document.querySelector(".float-right");
let cart = [];
let cartSubtotal = 0;

function updateCartItemsCount() {
  const itemsCountElement = document.querySelector(
    ".shopping-cart-items-count"
  );
  itemsCountElement.innerText = cart.length.toString();
  saveCart();
}

addToCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const productId = parseInt(event.target.dataset.productId);
    const product = products.find((p) => p.id === productId);

    if (product) {
      const cartItem = cart.find((item) => item.id === productId);
      if (cartItem) {
        cartItem.count++;
        updateCartItemQuantity(cartItem);
        updateCartItemsCount();
      } else {
        cart.push({ id: productId, count: 1, ...product });
        renderCartItem(product);
      }

      saveCart();
      updateSubtotal();
      updateCartItemsCount();
    } else {
      console.log(`Product with ID ${productId} not found.`);
    }
  });
});

function renderCartItem(product) {
  const itemContainer = document.createElement("div");
  itemContainer.classList.add("item-container");
  itemContainer.setAttribute("data-id", product.id);

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

  const deleteButton = itemContainer.querySelector(".closebtn-deleteitem");
  deleteButton.addEventListener("click", () => {
    removeCartItem(product.id);
  });

  productContainer.appendChild(itemContainer);
}

function updateCartItemQuantity(cartItem) {
  const itemContainer = document.querySelector(
    `.item-container[data-id="${cartItem.id}"]`
  );
  if (itemContainer) {
    const quantityElement = itemContainer.querySelector(".text-muted");
    quantityElement.innerText = `Quantity: ${cartItem.count}`;
  }
  saveCart();
}

function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
  localStorage.setItem("subtotal", cartSubtotal.toFixed(2));
}

function loadCart() {
  const savedCart = JSON.parse(localStorage.getItem("shoppingCart"));
  const savedSubtotal = parseFloat(localStorage.getItem("subtotal"));
  if (savedCart) {
    cart = savedCart;
    cartSubtotal = savedSubtotal;
    for (const item of cart) {
      renderCartItem(item);
    }
  }
  updateSubtotal();
  updateCartItemsCount();
}

function removeCartItem(productId) {
  const cartItemIndex = cart.findIndex((item) => item.id === productId);
  if (cartItemIndex !== -1) {
    const removedItem = cart.splice(cartItemIndex, 1)[0];
    const itemContainer = document.querySelector(
      `.item-container[data-id="${removedItem.id}"]`
    );
    if (itemContainer) {
      itemContainer.remove();
    }
    updateSubtotal();
    updateCartItemsCount();
    saveCart();
  }
}

function updateSubtotal() {
  let total = 0;
  for (const item of cart) {
    total += item.price * item.count;
  }
  cartSubtotal = total;
  subtotal.innerText = "$" + cartSubtotal.toFixed(2);
  saveCart();
}

function clearCart() {
  cart = [];
  cartSubtotal = 0;
  localStorage.removeItem("shoppingCart");
  localStorage.removeItem("subtotal");
  productContainer.innerHTML = "";
  subtotal.innerText = "$0";
  updateCartItemsCount();
}

if (localStorage.getItem("shoppingCart") != null) {
  loadCart();
} else {
  updateSubtotal();
}

const clearCartButton = document.querySelector(".btn-danger");
clearCartButton.addEventListener("click", () => {
  clearCart();
});

const shopToggle = document.querySelector(".responsive-footer-tags");
const toggleExpandMenu = document
  .querySelector(".responsive.col-lg-7")
  .querySelector(".shop.expand-lg-collapse");
const expandablePlus = document.querySelector(".expandable-plus");
const expandableMinus = document.querySelector(".expandable-minus");

shopToggle.addEventListener("click", (event) => {
  event.preventDefault();

  if (toggleExpandMenu.style.display === "none") {
    toggleExpandMenu.style.display = "block";
    expandablePlus.style.display = "none";
    expandableMinus.style.display = "inline";
  } else {
    toggleExpandMenu.style.display = "none";
    expandablePlus.style.display = "inline";
    expandableMinus.style.display = "none";
  }
});
