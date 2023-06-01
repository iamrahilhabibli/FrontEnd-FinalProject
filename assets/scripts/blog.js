var image = document.getElementsByClassName("parallaxmainimage");
new simpleParallax(image);

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
