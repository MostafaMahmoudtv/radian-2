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
    header?.classList.remove("fixed");
    if (logo) logo.src = "/assets/Radian-Logo.webp";
    if (menuIcon) menuIcon.style.color = "white";
  } else if (scrollTop < lastScrollTop) {
    header?.classList.add("fixed");
    if (logo) logo.src = "/assets/Logo-Dark.webp";
    if (menuIcon) menuIcon.style.color = "black";
  } else {
    header?.classList.remove("fixed");
    if (logo) logo.src = "/assets/Radian-Logo.webp";
    if (menuIcon) menuIcon.style.color = "white";
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ========== Side Menu ==========
function openMenu() {
  sidePanel?.classList.remove("-translate-x-full");
  sidePanel?.classList.add("translate-x-0");
  overlay?.classList.remove("opacity-0", "pointer-events-none");
  overlay?.classList.add("opacity-100", "pointer-events-auto");
  sidePanel?.setAttribute("aria-hidden", "false");
}

function closeMenu() {
  sidePanel?.classList.remove("translate-x-0");
  sidePanel?.classList.add("-translate-x-full");
  overlay?.classList.remove("opacity-100", "pointer-events-auto");
  overlay?.classList.add("opacity-0", "pointer-events-none");
  sidePanel?.setAttribute("aria-hidden", "true");
}

menuIcon?.addEventListener("click", openMenu);
closeBtn?.addEventListener("click", closeMenu);
overlay?.addEventListener("click", closeMenu);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// ========== Slider (مُحدّث) ==========
const slides = [
  // استخدم backticks علشان HTML multi-line، هنا النص + sv
  {
    img: "/assets/Slider-1.webp",
    text: "التميّز الهندسي عبر القارات",
    btnText: "اعرف المزيد عن راديان",
    btnLink: "about.html",
  },
  {
    img: "/assets/Slider-2.webp",
    text: "تحويل الأفكار إلى تحف هندسية",
    btnText: "استعرض خدماتنا",
    btnLink: "services.html",
  },
];

const sliderWrapper = document.getElementById("sliderWrapper");
const sliderContent = document.getElementById("sliderContent");
const sliderText = document.getElementById("sliderText");
const sliderBtn = document.getElementById("sliderBtn");
const dots = document.querySelectorAll(".dot");
const movingBorder = document.getElementById("movingBorder");
const slideNumbers = document.querySelectorAll(".slide-number");

// إنشاء عنصر الضباب
const fogOverlay = document.createElement("div");
fogOverlay.className = "fog-overlay";
document.body.appendChild(fogOverlay);

if (
  sliderWrapper &&
  sliderContent &&
  sliderText &&
  sliderBtn &&
  dots.length &&
  movingBorder
) {
  // تحديد مواقع النقاط مسبقاً
  const dotPositions = [0, 40]; // المسافات بين النقاط

  function goToSlide(index) {
    // تفعيل تأثير الضباب
    fogOverlay.classList.add("active");

    // تحديث الخلفية
    sliderWrapper.innerHTML = "";

    const imgDiv = document.createElement("div");
    imgDiv.className =
      "absolute inset-0 bg-cover bg-center scale-100 transition-transform duration-[15000ms] ease-out";
    imgDiv.style.backgroundImage = `url('${slides[index].img}')`;
    imgDiv.style.backgroundColor = "rgba(0,0,0,0.3)";
    imgDiv.style.backgroundBlendMode = "darken";

    sliderWrapper.appendChild(imgDiv);

    // حركة التكبير البسيطة
    setTimeout(() => {
      imgDiv.style.transform = "scale(1.23)";
    }, 50);

    // تحريك النص للخارج مؤقتًا
    sliderContent.classList.add("opacity-0", "translate-x-20");

    setTimeout(() => {
      const fullText = slides[index].text;

      // ✨ تقسيم الجملة لكلمات وتلوين التانية فقط
      const words = fullText.split(" ");
      if (words.length > 1){
  sliderText.innerHTML = `
    <span class="text-blue-400 italic slider-home-colored">${words[0]}</span>
    ${words.slice(1).join(" ")}
  `;
}  else {
        sliderText.innerHTML = fullText;
      }

      sliderBtn.innerHTML = `
        ${slides[index].btnText}
        <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.76236 8.05523H16.9538L16.9497 7.05025H7.05025V16.9497H8.05523V8.76233L16.5962 17.3033L17.3033 16.5962L8.76236 8.05523Z"
                fill="white"
              /></svg
          >
      `;
      sliderBtn.href = slides[index].btnLink;

      // إعادة الظهور بانسيابية
      sliderContent.classList.remove("opacity-0", "translate-x-20");

      // إزالة تأثير الضباب
      setTimeout(() => {
        fogOverlay.classList.remove("active");
      }, 300);
    }, 500);

    // تحريك الدائرة إلى النقطة المحددة
    const topOffset = dotPositions[index] - 9.5; // 25/2 - 6/2 = 12.5 - 3 = 9.5
    movingBorder.style.transform = `translateY(${topOffset}px) translateX(-50%)`;

    // تحديث النقاط
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  // عند الضغط على أي نقطة
  dots.forEach((dot) => {
    dot.addEventListener("click", () => goToSlide(parseInt(dot.dataset.slide)));
  });

  // أول سلايد - نحرك الدائرة للنقطة الأولى
  const initialOffset = dotPositions[0] - 9.5;
  movingBorder.style.transform = `translateY(${initialOffset}px) translateX(-50%)`;
  goToSlide(0);
}

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
const projectsList = document.getElementById("projects-list");
const toggleBtn = document.getElementById("toggle-btn");

if (projectsList && toggleBtn) {
  const items = projectsList.querySelectorAll("div");
  let expanded = false;
  const initialCount = Math.ceil(items.length / 2);

  items.forEach((item, i) => {
    if (i < initialCount) item.classList.remove("hidden");
  });

  toggleBtn.addEventListener("click", () => {
    expanded = !expanded;
    if (expanded) {
      items.forEach((item) => item.classList.remove("hidden"));
      toggleBtn.textContent = "عرض أقل[-]";
    } else {
      items.forEach((item, i) => {
        if (i < initialCount) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
      toggleBtn.textContent = " عرض المزيد [+]";
    }
  });
}

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
      }
    });
    btn.addEventListener("mouseleave", () => {
      if (window.innerWidth > 992) {
        menu.classList.add("hidden");
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
            w.classList.remove("open");
          }
        });

        menu.classList.toggle("hidden");
        wrapper.classList.toggle("open");
      }
    });
  });
});

// ========== Navbar Clone in Sidebar ==========
const nav = document.querySelector(".nav");
if (nav && sidePanel) {
  const sideNav = nav.cloneNode(true);
  sideNav.classList.add("flex-col", "space-y-4", "mt-6", "xl:hidden");
  sideNav.classList.remove("flex", "justify-center");
  sidePanel.appendChild(sideNav);
}

// ========== Parent Dropdowns ==========
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

// Preloader
const progressBar = document.getElementById("progress-bar");
const preloader = document.getElementById("preloader");
const mainContent = document.getElementById("main-content");

let progress = 0;

// نحاكي التحميل التدريجي
const fakeLoading = setInterval(() => {
  if (progress < 90) {
    // يتوقف عند 90% إلى أن الصفحة تكمل
    progress += Math.random() * 10;
    if (progress > 90) progress = 90;
    progressBar.style.width = progress + "%";
  }
}, 200);

// عند اكتمال تحميل الصفحة فعليًا
window.addEventListener("load", () => {
  clearInterval(fakeLoading);
  progressBar.style.width = "100%";

  // نديه نص ثانية علشان المستخدم يشوف الاكتمال
  setTimeout(() => {
    preloader.classList.add("fade-out");
    setTimeout(() => {
      preloader.style.display = "none";
      mainContent.classList.remove("hidden");
    }, 600);
  }, 500);
});
// Links
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href) return;
    if (href.startsWith("#")) return;
    let url;
    try {
      url = new URL(href, location.href);
    } catch (err) {
      return;
    }
    if (
      url.origin === location.origin &&
      url.pathname === location.pathname &&
      url.hash
    ) {
      return;
    }
    if (this.target === "_blank" || this.hasAttribute("download")) return;
    if (
      this.hasAttribute("data-no-preload") ||
      this.classList.contains("no-preload") ||
      this.id === "no-preload"
    ) {
      return;
    }
    e.preventDefault();
    const preloader = document.getElementById("preloader");
    if (!preloader) {
      window.location.href = url.href;
      return;
    }
    preloader.classList.remove("fade-out");
    setTimeout(() => {
      window.location.href = url.href;
    }, 450);
  });
});

// Cards Wrapper Slider
const slider = document.getElementById("cardsWrapper");
if (slider) {
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener("mouseleave", () => {
    isDown = false;
  });
  slider.addEventListener("mouseup", () => {
    isDown = false;
  });
  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1;
    slider.scrollLeft = scrollLeft - walk;
  });
}

// ========== Scroll To Top ==========
document.addEventListener("DOMContentLoaded", function () {
  const scrollToTopBtn = document.getElementById("scrollToTop");
  const path = document.getElementById("progressPath");

  // لو العنصر مش موجود في الصفحة نخرج بهدوء
  if (!scrollToTopBtn || !path) return;

  const pathLength = path.getTotalLength();

  path.style.strokeDasharray = pathLength;
  path.style.strokeDashoffset = pathLength;

  const updateProgress = () => {
    const scroll = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scroll * pathLength) / height;

    path.style.strokeDashoffset = pathLength - progress;

    if (scroll > 100) {
      scrollToTopBtn.classList.add("active");
    } else {
      scrollToTopBtn.classList.remove("active");
    }
  };

  window.addEventListener("scroll", updateProgress);

  scrollToTopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  updateProgress();
});
document.addEventListener("DOMContentLoaded", function () {
  const dropdownButtons = document.querySelectorAll(".dropdownBtn");

  dropdownButtons.forEach((btn) => {
    const menu = btn.nextElementSibling; // القايمة اللي بعد الزر
    const arrow = btn.querySelector(".arrow"); // السهم لو موجود

    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      // لو الزر ده مفتوح بالفعل → اقفله وارجع
      const isOpen = !menu.classList.contains("hidden");

      // اقفل كل القوائم التانية
      document.querySelectorAll(".dropdownMenu").forEach((m) => {
        if (m !== menu) m.classList.add("hidden");
      });
      document
        .querySelectorAll(".arrow")
        .forEach((a) => a.classList.remove("rotate-90"));

      // لو مش مفتوح → افتحه
      if (!isOpen) {
        menu.classList.remove("hidden");
        arrow?.classList.add("rotate-90");
      } else {
        menu.classList.add("hidden");
        arrow?.classList.remove("rotate-90");
      }
    });
  });

  // اقفل الكل لما تضغط برا
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdownWrapper")) {
      document
        .querySelectorAll(".dropdownMenu")
        .forEach((m) => m.classList.add("hidden"));
      document
        .querySelectorAll(".arrow")
        .forEach((a) => a.classList.remove("rotate-90"));
    }
  });
});
// تحديد الصفحة الحالية (الملف المفتوح)

document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop();
  const allLinks = document.querySelectorAll(
    ".language-option a, .nav a, .dropdown-dropdown-m ul li a"
  );

  allLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (
      linkPage &&
      linkPage.includes(currentPage) &&
      currentPage !== "" &&
      currentPage !== "index.html"
    ) {
      // لو في language-option عادية
      const parentOption = link.closest(".language-option");
      if (parentOption) parentOption.classList.add("active");

      // لو في dropdown فرعية (li داخل ul)
      const li = link.closest("li");
      if (li) li.classList.add("active");

      // كمان نخلّي الخط بتاع الناف الرئيسية يظهر (لو فيه span.absolute)
      const group = link.closest(".group");
      if (group) {
        const underline = group.querySelector("span.absolute");
        if (underline) underline.style.width = "100%";
      }
    }
  });
});
