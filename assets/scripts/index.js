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
const shoppingCartIcons = document.querySelectorAll(".fa-bag-shopping");
const modalCart = document.querySelector(".modal-dialog");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".modal-header .closebtn");

const sideBarModal = document.querySelector(".sidebar-modal");
const sideBarModalDialog = document.querySelector(
  ".sidebar-modal .modal-dialog"
);
const sideBarCloseBtn = document.querySelector(
  ".sidebar-modal .modal-header .closebtn"
);
const staggeredBars = document.querySelectorAll(".fa-bars-staggered");
const modalContent = document.querySelector(".modal-dialog .modal-content");

shoppingCartIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    modal.style.display = "block";
    modalCart.style.display = "block";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  modalCart.style.display = "none";
});

staggeredBars.forEach((icon) => {
  icon.addEventListener("click", () => {
    sideBarModal.style.display = "block";
    sideBarModalDialog.style.display = "block";
  });
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

const shopLink = document.querySelector(".shop.responsive-footer-tags");
const shopExpandablePlus = document.querySelector(".shop .expandable-plus");
const shopExpandableMinus = document.querySelector(".shop .expandable-minus");
const shopExpandableMenu = document.querySelector(".shop.expand-lg-collapse");

shopLink.addEventListener("click", (event) => {
  event.preventDefault();

  if (shopExpandableMenu.style.display === "none") {
    shopExpandableMenu.style.display = "block";
    shopExpandablePlus.style.transform = "rotate(90deg)";
    shopExpandablePlus.style.opacity = 0;
    shopExpandableMinus.style.transform = "rotate(0)";
    shopExpandableMinus.style.opacity = 1;
  } else {
    shopExpandableMenu.style.display = "none";
    shopExpandablePlus.style.transform = "rotate(0)";
    shopExpandablePlus.style.opacity = 1;
    shopExpandableMinus.style.transform = "rotate(-90deg)";
    shopExpandableMinus.style.opacity = 0;
  }
});

const companyLink = document.querySelector(".company.responsive-footer-tags");
const companyExpandablePlus = document.querySelector(
  ".company .expandable-plus"
);
const companyExpandableMinus = document.querySelector(
  ".company .expandable-minus"
);
const companyExpandableMenu = document.querySelector(
  ".company.expand-lg-collapse"
);

companyLink.addEventListener("click", (event) => {
  event.preventDefault();

  if (companyExpandableMenu.style.display === "none") {
    companyExpandableMenu.style.display = "block";
    companyExpandablePlus.style.transform = "rotate(90deg)";
    companyExpandablePlus.style.opacity = 0;
    companyExpandableMinus.style.transform = "rotate(0)";
    companyExpandableMinus.style.opacity = 1;
  } else {
    companyExpandableMenu.style.display = "none";
    companyExpandablePlus.style.transform = "rotate(0)";
    companyExpandablePlus.style.opacity = 1;
    companyExpandableMinus.style.transform = "rotate(-90deg)";
    companyExpandableMinus.style.opacity = 0;
  }
});

const accountLink = document.querySelector(".account.responsive-footer-tags");
const accountExpandablePlus = document.querySelector(
  ".account .expandable-plus"
);
const accountExpandableMinus = document.querySelector(
  ".account .expandable-minus"
);
const accountExpandableMenu = document.querySelector(
  ".account.expand-lg-collapse"
);

accountLink.addEventListener("click", (event) => {
  event.preventDefault();

  if (accountExpandableMenu.style.display === "none") {
    accountExpandableMenu.style.display = "block";
    accountExpandablePlus.style.transform = "rotate(90deg)";
    accountExpandablePlus.style.opacity = 0;
    accountExpandableMinus.style.transform = "rotate(0)";
    accountExpandableMinus.style.opacity = 1;
  } else {
    accountExpandableMenu.style.display = "none";
    accountExpandablePlus.style.transform = "rotate(0)";
    accountExpandablePlus.style.opacity = 1;
    accountExpandableMinus.style.transform = "rotate(-90deg)";
    accountExpandableMinus.style.opacity = 0;
  }
});

const registerBtn = document
  .querySelector(".nav.list-inline")
  .querySelector(".register");

const loginPanel = document.querySelector(".login.tab-panel");
const registerPanel = document.querySelector("#loginModalTabRegister");
console.log(registerPanel);

registerBtn.addEventListener("click", () => {
  loginPanel.style.display = "none";
  registerPanel.style.display = "block";
});

const faUserBtns = document.querySelectorAll(".fa-user");
const loginModal = document.querySelector(".login-modal");

faUserBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    loginModal.style.display = "block";
  });
});

const closeBtnLogin = document.getElementById("login-closebtn");

closeBtnLogin.addEventListener("click", () => {
  loginModal.style.display = "none";
});
