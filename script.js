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

// Add a little dynamic behavior to stats (counter increment effect)
const stats = document.querySelectorAll(
  '[data-aos="zoom-in"] .font-weight-800',
); // Note: I should have added a class or used parent
// Let's target by style since I didn't add specific classes
const counterElements = document.querySelectorAll(
  'div[style*="font-size: 3rem"]',
);

const animateCounters = () => {
  counterElements.forEach((el) => {
    const targetStr = el.innerText.replace(/[^0-9]/g, "");
    const target = parseInt(targetStr);
    const suffix = el.innerText.replace(/[0-9]/g, "");
    let count = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 16ms is roughly 1 frame

    const updateCount = () => {
      if (count < target) {
        count += increment;
        el.innerText = Math.ceil(count) + suffix;
        setTimeout(updateCount, 16);
      } else {
        el.innerText = target + suffix;
      }
    };

    // Trigger when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          updateCount();
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
  });
};

// Only run counter animation if browser supports IntersectionObserver
if ("IntersectionObserver" in window) {
  animateCounters();
}
