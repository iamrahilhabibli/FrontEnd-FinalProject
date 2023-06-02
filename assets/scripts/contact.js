var image = document.getElementsByClassName("contactparallaximage");
new simpleParallax(image);
var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.carto.com/">Carto</a>',
}).addTo(map);

function updateCartItemsCount() {
  const itemsCountElement = document.querySelector(
    ".shopping-cart-items-count"
  );
  itemsCountElement.innerText = cart.length.toString();
}

function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
  localStorage.setItem("subtotal", cartSubtotal.toFixed(2));
}

function loadCart() {
  const savedCart = JSON.parse(localStorage.getItem("shoppingCart"));
  if (savedCart) {
    cart = savedCart;
    displayCartItems(cart);
    updateSubtotal(cart);
    updateCartItemsCount();
  }
}

window.addEventListener("storage", (event) => {
  if (event.key === "shoppingCart") {
    const savedCart = JSON.parse(event.newValue);

    displayCartItems(savedCart);
    updateSubtotal(savedCart);
    updateCartItemsCount();
  }
});

function displayCartItems(cart) {
  const productContainer = document.querySelector(".navbar-cart-product");

  productContainer.innerHTML = "";

  for (const item of cart) {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container");

    itemContainer.innerHTML = `
      <a href=""><img class="itemimg" src="${item.image}" alt="" /></a>
      <div class="item-content">
        <a class="closebtn-deleteitem" href="#">
          <button class="closebtn-deleteitem" type="button">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </a>
        <div class="pl-3">
          <a class="navbar-cart-product" href="">${item.name}</a>
          <small class="d-block text-muted">Quantity: ${item.count}</small>
          <strong class="d-block text-sm">$${item.price.toFixed(2)}</strong>
        </div>
      </div>
    `;

    const deleteButton = itemContainer.querySelector(".closebtn-deleteitem");
    deleteButton.addEventListener("click", () => {
      removeCartItem(item.id);
    });

    productContainer.appendChild(itemContainer);
  }
}

function updateSubtotal(cart) {
  const subtotalElement = document.querySelector(".float-right");

  let subtotal = 0;

  for (const item of cart) {
    subtotal += item.price * item.count;
  }

  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
}

function removeCartItem(itemId) {
  const itemIndex = cart.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
    displayCartItems(cart);
    updateSubtotal(cart);
    updateCartItemsCount();
    saveCart();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadCart();
});

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
