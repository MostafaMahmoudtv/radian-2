var swiper = new Swiper(".mySwiperb", {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 2500, // الوقت بين كل انتقال (بالمللي ثانية)
    disableOnInteraction: false, // يكمّل بعد ما المستخدم يتفاعل
  },
  speed: 800, // سرعة الانتقال (أنيميشن السلايد نفسه)
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
