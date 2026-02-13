// Initialize Lucide Icons
lucide.createIcons();

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  offset: 100,
});

// Sticky Header effect
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Smooth Scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // Account for fixed header
        behavior: "smooth",
      });
    }
  });
});

// Mobile Menu Logic
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const body = document.body;

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle("active");
        
        // Change icon based on state
        const icon = menuToggle.querySelector("i");
        if (mobileMenu.classList.contains("active")) {
            icon.setAttribute("data-lucide", "x");
        } else {
            icon.setAttribute("data-lucide", "menu");
        }
        lucide.createIcons();
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            mobileMenu.classList.remove("active");
            menuToggle.querySelector("i").setAttribute("data-lucide", "menu");
            lucide.createIcons();
        }
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            menuToggle.querySelector("i").setAttribute("data-lucide", "menu");
            lucide.createIcons();
        });
    });
}

// Add dynamic behavior to stats (counter increment effect)
const counterElements = document.querySelectorAll(".stat-number");

const animateCounters = () => {
  counterElements.forEach((el) => {
    const targetText = el.innerText.trim();
    const targetNum = parseInt(targetText.replace(/[^0-9]/g, ""));
    const suffix = targetText.replace(/[0-9]/g, "");
    
    let count = 0;
    const duration = 2000;
    const increment = targetNum / (duration / 16);

    const updateCount = () => {
      if (count < targetNum) {
        count += increment;
        el.innerText = Math.ceil(count) + suffix;
        requestAnimationFrame(updateCount);
      } else {
        el.innerText = targetNum + suffix;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          updateCount();
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
  });
};

// Start counters
if ("IntersectionObserver" in window) {
    animateCounters();
}
