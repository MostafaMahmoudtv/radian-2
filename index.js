let lastScrollTop = 0;
const header = document.getElementById("header");
const logo = document.getElementById("logo");

window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY;

  if (scrollTop === 0) {
    // فوق خالص
    header.classList.remove("fixed");
    logo.src = "/assets/Radian-Logo.webp"; // اللوجو الأبيض
    menuIcon.style.color = "white"; // الآيكون أبيض
  } else if (scrollTop < lastScrollTop) {
    // طالع لفوق
    header.classList.add("fixed");
    logo.src = "/assets/Logo-Dark.webp";
    menuIcon.style.color = "black";
  } else {
    // نازل لتحت
    header.classList.remove("fixed");
    logo.src = "/assets/Radian-Logo.webp";
    menuIcon.style.color = "white";
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
    text: "التميّز الهندسي عبر القارات",
    btnText: "  اعرف المزيد عن راديان  " + " " + " 🡤 ",
    btnLink: "#about",
  },
  {
    img: "/assets/Slider-2.webp",
    text: "تحويل الأفكار إلى تحف هندسية",
    btnText: "استعرض خدماتنا" + " " + " 🡤 ",
    btnLink: "#about",
  },
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
    // تقسيم النص لأول كلمة وبقية النص
    const fullText = slides[index].text;
    const firstSpace = fullText.indexOf(" ");
    let firstWord, restText;

    if (firstSpace === -1) {
      firstWord = fullText;
      restText = "";
    } else {
      firstWord = fullText.slice(0, firstSpace);
      restText = fullText.slice(firstSpace);
    }

    // اعرض النص مع أول كلمة ملونة ومائلة
    sliderText.innerHTML = `<span class="text-blue-400 italic">${firstWord}</span>${restText}`;

    // تحديث الزر
    sliderBtn.textContent = slides[index].btnText;
    sliderBtn.href = slides[index].btnLink;

    // إظهار النص مع الأنيميشن
    sliderContent.classList.remove("opacity-0", "translate-y-5");
  }, 500);

  // 7. تحديث الدوائر
  dots.forEach((dot) => dot.classList.remove("bg-white"));
  dots[index].classList.add("bg-white");
}

// التعامل مع الضغط على الدوائر
dots.forEach((dot) => {
  dot.addEventListener("click", () => goToSlide(dot.dataset.slide));
});

// أول سلايد
goToSlide(0);
function animateCounter(counter) {
  const target = +counter.getAttribute("data-target");
  const duration = 2000;
  const step = target / (duration / 16);

  let count = 0;
  function updateCounter() {
    count += step;
    if (count < target) {
      counter.textContent = Math.floor(count);
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target.toLocaleString();
    }
  }
  updateCounter();
}

function handleScroll() {
  const counters = document.querySelectorAll(".counter");
  counters.forEach((counter) => {
    const rect = counter.getBoundingClientRect();
    if (
      rect.top < window.innerHeight &&
      !counter.classList.contains("started")
    ) {
      counter.classList.add("started");
      animateCounter(counter);
    }
  });
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("load", handleScroll);

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 5, // عدد الصور اللي تبان مع بعض
  spaceBetween: 30, // المسافة بينهم
  loop: true, // يخليها تلف باستمرار
  autoplay: {
    delay: 3000, // كل ثانية يتحرك
    disableOnInteraction: false,
  },
  speed: 1500,
  breakpoints: {
    320: { slidesPerView: 2 },
    640: { slidesPerView: 3 },
    1024: { slidesPerView: 5 },
  },
});
const items = document.querySelectorAll("#projects-list > div");
const toggleBtn = document.getElementById("toggle-btn");
let expanded = false;

// في البداية اعرض نص العناصر فقط
const initialCount = Math.ceil(items.length / 2);
items.forEach((item, i) => {
  if (i < initialCount) item.classList.remove("hidden");
});

toggleBtn.addEventListener("click", () => {
  expanded = !expanded;
  if (expanded) {
    items.forEach((item) => item.classList.remove("hidden"));
    toggleBtn.textContent = "عرض أقل";
  } else {
    items.forEach((item, i) => {
      if (i < initialCount) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
    toggleBtn.textContent = "عرض المزيد";
  }
});
document.querySelectorAll(".dropdownWrapper").forEach((wrapper) => {
  const btn = wrapper.querySelector(".dropdownBtn");
  const menu = wrapper.querySelector(".dropdownMenu");
  const icon = wrapper.querySelector(".dropdownIcon");

  // الفتح/الإغلاق عند المرور أو الضغط
  btn.addEventListener("mouseenter", (e) => {
    e.stopPropagation();
    menu.classList.toggle("hidden");
    icon.classList.toggle("rotate-180");
  });

  // إغلاق عند الضغط خارج العنصر
  document.addEventListener("mouseover", (e) => {
    if (!wrapper.contains(e.target)) {
      menu.classList.add("hidden");
      icon.classList.remove("rotate-180");
    }
  });
});
