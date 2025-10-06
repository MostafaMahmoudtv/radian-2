let lastScrollTop = 0;
const header = document.getElementById("header");
const logo = document.getElementById("logo");
const menuIcon = document.getElementById("menuIcon");
const sidePanel = document.getElementById("sidePanel");
const closeBtn = document.getElementById("closeBtn");
const overlay = document.getElementById("overlay");

// ========== Scroll & Header ==========
window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY;

  if (scrollTop === 0) {
    header.classList.remove("fixed");
    logo.src = "/assets/Radian-Logo.webp";
    menuIcon.style.color = "white";
  } else if (scrollTop < lastScrollTop) {
    header.classList.add("fixed");
    logo.src = "/assets/Logo-Dark.webp";
    menuIcon.style.color = "black";
  } else {
    header.classList.remove("fixed");
    logo.src = "/assets/Radian-Logo.webp";
    menuIcon.style.color = "white";
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ========== Side Menu ==========
function openMenu() {
  sidePanel.classList.remove("-translate-x-full");
  sidePanel.classList.add("translate-x-0");
  overlay.classList.remove("opacity-0", "pointer-events-none");
  overlay.classList.add("opacity-100", "pointer-events-auto");
  sidePanel.setAttribute("aria-hidden", "false");
}

function closeMenu() {
  sidePanel.classList.remove("translate-x-0");
  sidePanel.classList.add("-translate-x-full");
  overlay.classList.remove("opacity-100", "pointer-events-auto");
  overlay.classList.add("opacity-0", "pointer-events-none");
  sidePanel.setAttribute("aria-hidden", "true");
}

menuIcon.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// ========== Slider ==========
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
  sliderWrapper.innerHTML = "";
  const imgDiv = document.createElement("div");
  imgDiv.className =
    "absolute inset-0 bg-cover bg-center scale-100 transition-transform duration-[5000ms] ease-out";
  imgDiv.style.backgroundImage = `url('${slides[index].img}')`;
  sliderWrapper.appendChild(imgDiv);
  setTimeout(() => {
    imgDiv.classList.add("scale-110");
  }, 50);

  sliderContent.classList.add("opacity-0", "translate-y-5");
  setTimeout(() => {
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
    sliderText.innerHTML = `<span class="text-blue-400 italic">${firstWord}</span>${restText}`;
    sliderBtn.textContent = slides[index].btnText;
    sliderBtn.href = slides[index].btnLink;
    sliderContent.classList.remove("opacity-0", "translate-y-5");
  }, 500);

  dots.forEach((dot) => dot.classList.remove("bg-white"));
  dots[index].classList.add("bg-white");
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => goToSlide(dot.dataset.slide));
});

goToSlide(0);

// ========== Counter ==========
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

// ========== Swiper ==========
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 5,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  speed: 1500,
  breakpoints: {
    320: { slidesPerView: 2 },
    640: { slidesPerView: 3 },
    1024: { slidesPerView: 5 },
  },
});

// ========== Show More Projects ==========
const items = document.querySelectorAll("#projects-list > div");
const toggleBtn = document.getElementById("toggle-btn");
let expanded = false;
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

// ========== Dropdown + Arrow ==========
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".dropdownWrapper").forEach((wrapper) => {
    const btn = wrapper.querySelector(".dropdownBtn");
    const menu = wrapper.querySelector(".dropdownMenu");
    const icon = wrapper.querySelector(".fa-angle-down");

    if (!btn || !menu || !icon) return;

    // Desktop hover
    btn.addEventListener("mouseenter", () => {
      if (window.innerWidth > 992) {
        menu.classList.remove("hidden");
        icon.classList.add("rotate-180");
      }
    });
    btn.addEventListener("mouseleave", () => {
      if (window.innerWidth > 992) {
        menu.classList.add("hidden");
        icon.classList.remove("rotate-180");
      }
    });

    // Mobile click
    btn.addEventListener("click", (e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        e.stopPropagation();

        // اقفل باقي القوائم
        document.querySelectorAll(".dropdownWrapper").forEach((w) => {
          if (w !== wrapper) {
            w.querySelector(".dropdownMenu")?.classList.add("hidden");
            w.querySelector(".fa-angle-down")?.classList.remove("rotate-180");
            w.classList.remove("open");
          }
        });

        menu.classList.toggle("hidden");
        icon.classList.toggle("rotate-180");
        wrapper.classList.toggle("open");
      }
    });
  });
});

// ========== Navbar Clone in Sidebar ==========
const nav = document.querySelector(".nav");
const sideNav = nav.cloneNode(true); // نسخة طبق الأصل
sideNav.classList.add("flex-col", "space-y-4", "mt-6", "lg:hidden"); // أضفنا lg:hidden
sideNav.classList.remove("flex", "justify-center");
sidePanel.appendChild(sideNav);

// ========== Parent Dropdowns (nav ul li) ==========
document.querySelectorAll(".nav ul li").forEach((item) => {
  const dropdown = item.querySelector(".dropdown-content");
  if (dropdown) {
    item.classList.add("has-dropdown");
    item.addEventListener("click", function (e) {
      if (window.innerWidth <= 992) {
        e.stopPropagation();
        this.classList.toggle("open");
      }
    });
  }
});
