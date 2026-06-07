document.addEventListener("DOMContentLoaded", () => {
  // --- Hero Slider Logic ---
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[index].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Auto-scroll slider
  setInterval(nextSlide, 5000);

  const lightbox = GLightbox({
    selector: ".glightbox",
  });

  // --- Mobile Menu Toggle Logic ---
  const menuBtn = document.getElementById("menu-btn");
  const closeBtn = document.getElementById("close-btn");
  const sideDrawer = document.getElementById("side-drawer");
  const overlay = document.getElementById("drawer-overlay");
  const drawerItems = document.querySelectorAll(".drawer-item");
  const archivesNav = document.querySelector(".archives-nav");

  function toggleMenu() {
    sideDrawer.classList.toggle("active");
    overlay.style.display = sideDrawer.classList.contains("active")
      ? "block"
      : "none";
  }

  // স্ক্রল লজিক: Yearly Archives সেকশন পার হলে বাটন দেখাবে
  window.addEventListener("scroll", () => {
    if (window.innerWidth <= 990 && archivesNav) {
      const rect = archivesNav.getBoundingClientRect();
      // যদি archivesNav এর নিচের অংশ (bottom) স্ক্রিনের ওপরের বাইরে চলে যায়
      if (rect.bottom < 0) {
        menuBtn.style.display = "flex";
      } else {
        menuBtn.style.display = "none";
      }
    } else {
      if (menuBtn) menuBtn.style.display = "none";
    }
  });

  if (menuBtn) menuBtn.addEventListener("click", toggleMenu);
  if (closeBtn) closeBtn.addEventListener("click", toggleMenu);
  if (overlay) overlay.addEventListener("click", toggleMenu);

  drawerItems.forEach((item) => {
    item.addEventListener("click", toggleMenu);
  });
});
