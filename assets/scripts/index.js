const clockImage = document.querySelector(".clock-section .clockimg");
console.log(clockImage);
new simpleParallax(clockImage, {
  overflow: true,
});
// needs parallax fixing
const swiper = new Swiper(".swiper-container", {
  direction: "horizontal",
  loop: true,
  slidesPerView: "auto",
  initialSlide: 2,
  speed: 2000,
  spaceBetween: 32,
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
