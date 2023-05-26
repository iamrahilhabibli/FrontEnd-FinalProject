const clockImage = document.querySelector(".clock-section .clockimg");
console.log(clockImage);
new simpleParallax(clockImage, {
  overflow: true,
});
// needs parallax fixing
const swiper = new Swiper(".swiper-container", {
  direction: "horizontal",
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
