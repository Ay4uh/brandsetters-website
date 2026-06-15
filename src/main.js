import './style.css'
import VanillaTilt from 'vanilla-tilt';

// Initialize 3D Tilt
VanillaTilt.init(document.querySelectorAll(".service-card, .pricing-card, .volume-card"), {
  max: 5,
  speed: 400,
  glare: true,
  "max-glare": 0.1,
  scale: 1.02
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn && navLinks) {
  mobileBtn.addEventListener('click', () => {
    mobileBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu on click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      mobileBtn.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// Reveal elements on scroll
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
};

const revealObserver = new IntersectionObserver(revealCallback, {
  root: null,
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => {
  revealObserver.observe(el);
});
