var swiper = new Swiper(".mySwiperb", {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 2500, 
    disableOnInteraction: false, 
  },
  speed: 800, 
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});
