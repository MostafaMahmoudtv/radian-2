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
  sidePanel?.classList.remove("translate-x-full");
  sidePanel?.classList.add("translate-x-0");
  overlay?.classList.remove("opacity-0", "pointer-events-none");
  overlay?.classList.add("opacity-100", "pointer-events-auto");
  sidePanel?.setAttribute("aria-hidden", "false");
}

function closeMenu() {
  sidePanel?.classList.remove("translate-x-0");
  sidePanel?.classList.add("translate-x-full");
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

const slides = [
  {
    img: "/assets/Slider-1.webp",
    text: "Engineering Excellence Across Continents",
    btnText: "More About Radian",
    btnLink: "en/about.html",
  },
  {
    img: "/assets/Slider-2.webp",
    text: "Turning Aspirations into Engineering Masterpieces",
    btnText: "View Our Services",
    btnLink: "en/services.html",
  },
];

const sliderWrapper = document.getElementById("sliderWrapper");
const sliderContent = document.getElementById("sliderContent");
const sliderText = document.getElementById("sliderText");
const sliderBtn = document.getElementById("sliderBtn");
const dots = document.querySelectorAll(".dot");
const movingBorder = document.getElementById("movingBorder");
const slideNumbers = document.querySelectorAll(".slide-number");

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
  const dotPositions = [0, 40]; 
  
  function goToSlide(index) {
    fogOverlay.classList.add("active");
    
    sliderWrapper.innerHTML = "";

    const imgDiv = document.createElement("div");
    imgDiv.className =
      "absolute inset-0 bg-cover bg-center scale-100 transition-transform duration-[15000ms] ease-out";
    imgDiv.style.backgroundImage = `url('${slides[index].img}')`;
    imgDiv.style.backgroundColor = "rgba(0,0,0,0.3)";
    imgDiv.style.backgroundBlendMode = "darken";

    sliderWrapper.appendChild(imgDiv);

    setTimeout(() => {
      imgDiv.style.transform = "scale(1.23)";
    }, 50);

    sliderContent.classList.add("opacity-0", "translate-x-20");

    setTimeout(() => {
      const fullText = slides[index].text;

      if (index === 1) {
        // ✅ السلايد الثاني - تلوين كلمة Masterpieces فقط
        sliderText.innerHTML = fullText.replace(
          "Masterpieces",
          `<span class="text-blue-400 italic font-bold slider-home-colored">Masterpieces</span>`
        );
      } else {
        // ✅ السلايد الأول - نفس النظام القديم (تلوين الكلمة الثانية فقط)
        const words = fullText.split(" ");
        if (words.length > 1) {
          sliderText.innerHTML = `
            ${words[0]} 
            <span class="text-blue-400 italic font-bold slider-home-colored ">${words[1]}</span>
            ${words.slice(2).join(" ")}
          `;
        } else {
          sliderText.innerHTML = fullText;
        }
      }

      sliderBtn.innerHTML = `
        ${slides[index].btnText}
        <svg
          class="inline-block w-5 h-5 ml-2 fill-current transition-colors"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.2376 8.05523L7.04617 8.05523L7.05023 7.05025L16.9497 7.05025L16.9497 16.9497L15.9448 16.9538L15.9448 8.76233L7.40379 17.3033L6.69668 16.5962L15.2376 8.05523Z"
            fill="currentColor"
          />
        </svg>
      `;
      sliderBtn.href = slides[index].btnLink;

      sliderContent.classList.remove("opacity-0", "translate-x-20");
      
      setTimeout(() => {
        fogOverlay.classList.remove("active");
      }, 300);
      
    }, 500);

    const topOffset = dotPositions[index] - 9.5;
    movingBorder.style.transform = `translateY(${topOffset}px) translateX(-50%)`;

    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => goToSlide(parseInt(dot.dataset.slide)));
  });

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
      toggleBtn.textContent = "Show less [-]";
    } else {
      items.forEach((item, i) => {
        if (i < initialCount) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
      toggleBtn.textContent = "Show more [+]";
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
  // ========== إصلاح دروب داون السايدبار في وضع الموبايل ==========
if (sidePanel) {
  sidePanel.querySelectorAll(".has-dropdown").forEach((item) => {
    const btn = item.querySelector("a, .dropdownBtn, span");
    const dropdown = item.querySelector(".dropdown-content");

    if (btn && dropdown) {
      btn.addEventListener("click", (e) => {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          e.stopPropagation();

          // افتح أو اقفل القائمة الحالية فقط
          dropdown.classList.toggle("hidden");
          item.classList.toggle("open");
        }
      });
    }
  });

  // لو ضغطت على لينك جوه القائمة → ما تقفلهاش
  sidePanel.querySelectorAll(".dropdown-content a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });
}

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

  // Mouse Events (Desktop)
  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener("mouseleave", () => (isDown = false));
  slider.addEventListener("mouseup", () => (isDown = false));
  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1;
    slider.scrollLeft = scrollLeft - walk;
  });

  // Touch Events (Mobile)
  slider.addEventListener("touchstart", (e) => {
    isDown = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener("touchend", () => (isDown = false));
  slider.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
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
    ".language-option a, .nav a, .dropdown-dropdown-m ul a"
  );

  allLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (
      linkPage &&
      linkPage.includes(currentPage) &&
      currentPage !== "" &&
      currentPage !== "index.html"
    ) {
      // فعّل اللينك نفسه (عشان li جوه a)
      link.classList.add("active");

      // لو جوه language-option
      const parentOption = link.closest(".language-option");
      if (parentOption) parentOption.classList.add("active");

      // لو جوه dropdownMenu (زي traffic-studies)
      const dropdownMenu = link.closest(".dropdownMenu");
      if (dropdownMenu) {
        const dropdownWrapper = dropdownMenu.closest(".dropdownWrapper");
        if (dropdownWrapper) {
          dropdownWrapper.classList.add("active");
          const menu = dropdownWrapper.querySelector(".dropdownMenu");
          if (menu) menu.classList.remove("hidden");
          const arrow = dropdownWrapper.querySelector(".arrow");
        }

        // فعل Services الرئيسي فوق
        const mainDropdown = dropdownMenu.closest(".dropdown-content");
        if (mainDropdown) {
          const mainGroup = mainDropdown.closest(".group");
          if (mainGroup) {
            const underline = mainGroup.querySelector("span.absolute");
            if (underline) underline.style.width = "100%";
          }
        }
      }

      // لو اللينك الرئيسي (زي About, Media Center)
      const group = link.closest(".group");
      if (group) {
        const underline = group.querySelector("span.absolute");
        if (underline) underline.style.width = "100%";
      }
    }
  });
});

const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-10");
          entry.target.classList.add("opacity-100", "translate-y-0");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".fade-section").forEach((el) => observer.observe(el));