let lastScrollTop = 0;
const header = document.getElementById("header");
const logo = document.getElementById("logo");

window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY;

  if (scrollTop === 0) {
    header.classList.remove("fixed");
    logo.src = "/assets/Radian-Logo.webp";   // اللوجو الأبيض
  } else if (scrollTop < lastScrollTop) {
    header.classList.add("fixed");
    logo.src = "/assets/Logo-Dark.webp";   // اللوجو الأسود
  } else {
    header.classList.remove("fixed");
    logo.src = "/assets/Radian-Logo.webp";   // يرجع للأبيض لو نازل
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// عناصر
const menuIcon = document.getElementById("menuIcon");
const sidePanel = document.getElementById("sidePanel");
const closeBtn = document.getElementById("closeBtn");
const overlay = document.getElementById("overlay");

// فتح
function openMenu() {
  sidePanel.classList.remove("-translate-x-full");
  sidePanel.classList.add("translate-x-0");
  overlay.classList.remove("opacity-0", "pointer-events-none");
  overlay.classList.add("opacity-100", "pointer-events-auto");
  // للـ accessibility
  sidePanel.setAttribute("aria-hidden", "false");
}

// غلق
function closeMenu() {
  sidePanel.classList.remove("translate-x-0");
  sidePanel.classList.add("-translate-x-full");
  overlay.classList.remove("opacity-100", "pointer-events-auto");
  overlay.classList.add("opacity-0", "pointer-events-none");
  sidePanel.setAttribute("aria-hidden", "true");
}

// أحداث
menuIcon.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

// اغلاق بالـ Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});
        const slides = [
      { 
        img: "/assets/Slider-1.webp", 
        text: "التميز الهندسي عبر القارات", 
        btnText: "اعرف المزيد عن راديان", 
        btnLink: "#about" 
      },
      { 
        img: "/assets/Slider-2.webp", 
        text: "بناء المستقبل مع راديان", 
        btnText: "استعرض خدماتنا", 
        btnLink: "#about" 
      }
    ];


const sliderWrapper = document.getElementById("sliderWrapper");
const sliderContent = document.getElementById("sliderContent");
const sliderText = document.getElementById("sliderText");
const sliderBtn = document.getElementById("sliderBtn");
const dots = document.querySelectorAll(".dot");

function goToSlide(index) {
  // 1. احذف أي صورة قديمة
  sliderWrapper.innerHTML = "";

  // 2. اعمل عنصر جديد للصورة
  const imgDiv = document.createElement("div");
  imgDiv.className =
    "absolute inset-0 bg-cover bg-center scale-100 transition-transform duration-[5000ms] ease-out";
  imgDiv.style.backgroundImage = `url('${slides[index].img}')`;

  // 3. ضيف الصورة
  sliderWrapper.appendChild(imgDiv);

  // 4. شغل الزوم بعد لحظة
  setTimeout(() => {
    imgDiv.classList.add("scale-110");
  }, 50);

  // 5. اخفاء النص القديم
  sliderContent.classList.add("opacity-0", "translate-y-5");

  // 6. بعد نص ثانية غيّر النص + الزر
  setTimeout(() => {
    sliderText.textContent = slides[index].text;
    sliderBtn.textContent = slides[index].btnText;
    sliderBtn.href = slides[index].btnLink;

    sliderContent.classList.remove("opacity-0", "translate-y-5");
  }, 500);

  // 7. تحديث الدوائر
  dots.forEach(dot => dot.classList.remove("bg-white"));
  dots[index].classList.add("bg-white");
}

dots.forEach(dot => {
  dot.addEventListener("click", () => goToSlide(dot.dataset.slide));
});

// أول سلايد
goToSlide(0);
