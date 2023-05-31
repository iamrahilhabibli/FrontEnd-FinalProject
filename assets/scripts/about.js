const swiper = new Swiper(".swiper-container", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  slidesPerView: 5,
  paginationClickable: true,
  pagination: {
    el: ".swiper-pagination",
  },
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

function loadCart() {
  const savedCart = JSON.parse(localStorage.getItem("shoppingCart"));
  if (savedCart) {
    cart = savedCart;
  }
}

function displayCartItems() {
  const productContainer = document.querySelector(".navbar-cart-product");

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

    productContainer.appendChild(itemContainer);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  displayCartItems();
});
