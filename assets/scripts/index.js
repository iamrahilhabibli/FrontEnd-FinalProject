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

const itemContainer = document.querySelector(".item-container");
const productContainer = document.querySelector(".navbar-cart-product");
const products = [
  {
    id: 1,
    name: "Norwegg Chair",
    price: 40.0,
    category: "Chairs",
  },
  {
    id: 2,
    name: "Book",
    price: 40.0,
    category: "Books",
  },
  {
    id: 3,
    name: "Another Chair",
    price: 40.0,
    category: "Chairs",
  },
  {
    id: 4,
    name: "Your new chair",
    price: 40.0,
    category: "Chairs",
  },
  {
    id: 5,
    name: "Clock",
    price: 40.0,
    category: "Accessories",
  },
  {
    id: 6,
    name: "Clock",
    price: 40.0,
    category: "Accessories",
  },
  {
    id: 7,
    name: "Accessory box",
    price: 40.0,
    category: "Accessories",
  },
  {
    id: 8,
    name: "Beige",
    price: 40.0,
    category: "Accessories",
  },
];

function generateProduct(products) {
  const product = document.createElement("div");
  product.innerHTML = `<div class="item-container">
  <a href=""><img class="itemimg" src="" alt="" /></a>
  <div class="item-content">
    <a class="closebtn-deleteitem" href="#">
      <button class="closebtn-deleteitem" type="button">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </a>
    <div class="pl-3">
      <a class="navbar-cart-product" href="">${products.name}</a
      ><small class="d-block text-muted">Quantity: 1 </small
      ><strong class="d-block text-sm">${products.price}</strong>
    </div>
  </div>
</div>`;
  return product;
}

function renderAllProducts() {
  products.forEach((product) => {
    const apartmentCard = generateProduct(product);
    productContainer.appendChild(apartmentCard);
  });
}
// renderAllProducts();

// Get the necessary elements
// Get the necessary elements
const draggerContainer = document.querySelector(".draggercontainer");
const draggerBar = document.querySelector(".draggerbar");
const draggerRail = document.querySelector(".draggerrail");

// Set initial variables
let isScrolling = false;

// Event listener for scrolling on the dragger container
draggerContainer.addEventListener("wheel", (event) => {
  event.preventDefault();

  // Calculate the scroll amount based on the wheel event
  const scrollAmount = event.deltaY * 0.2;

  // Update the scrollTop position of the dragger container
  draggerContainer.scrollTop += scrollAmount;

  // Update the position of the dragger bar based on the scroll percentage
  const scrollPercentage =
    (draggerContainer.scrollTop /
      (draggerContainer.scrollHeight - draggerContainer.clientHeight)) *
    100;
  draggerBar.style.top = `${scrollPercentage}%`;
});

// Event listener for scroll on the dragger container
draggerContainer.addEventListener("scroll", () => {
  // Update the position of the dragger bar based on the scroll percentage
  const scrollPercentage =
    (draggerContainer.scrollTop /
      (draggerContainer.scrollHeight - draggerContainer.clientHeight)) *
    100;
  draggerBar.style.top = `${scrollPercentage}%`;
});
