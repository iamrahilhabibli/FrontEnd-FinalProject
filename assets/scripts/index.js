const clockImage = document.querySelector(".clock-section .clockimg");
console.log(clockImage);
new simpleParallax(clockImage, {
  overflow: true,
});
// needs parallax fixing
const swiper = new Swiper(".swiper-container", {
  direction: "horizontal",
  loop: true,
  speed: 2000,
  centeredSlides: true,
  roundLengths: true,
  pagination: {
    el: ".swiper-pagination",
  },
  effect: "slide", // (e.g., 'slide', 'fade', 'cube', 'coverflow', 'flip')
  fadeEffect: {
    crossFade: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
