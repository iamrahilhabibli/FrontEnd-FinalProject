// let img2 = document.getElementsByClassName("parallaxmainimage");
// new simpleParallax(img2, {
//   overflow: true,
// });

// var image = document.getElementsByClassName("parallaxmainimage");
// new simpleParallax(image, {
//   scale: 1.5,
// });
var image = document.getElementsByClassName("parallaxmainimage");
new simpleParallax(image, {
  delay: 0,
  transition: "cubic-bezier(0,0,0,1)",
});
