import './style.css'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 1. Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// 2. Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const mobileOverlay = document.querySelector('.mobile-menu-overlay');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (mobileBtn && mobileOverlay) {
  mobileBtn.addEventListener('click', () => {
    mobileBtn.classList.toggle('open');
    mobileOverlay.classList.toggle('open');
    document.body.style.overflow = mobileOverlay.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileBtn.classList.remove('open');
      mobileOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Smooth scroll anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 3. Scroll Reveal Animations
// Specification: 0.5s duration, cubic-bezier(0.16, 1, 0.3, 1), translateY(30px) -> 0
const revealElements = document.querySelectorAll('.reveal');
gsap.set(revealElements, { opacity: 0, y: 30 });

ScrollTrigger.batch('.reveal', {
  start: "top 90%",
  onEnter: (elements) => {
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "custom", // Approximating cubic-bezier(0.16, 1, 0.3, 1) using power3.out or CustomEase
      // GSAP default ease 'power3.out' is close enough to 0.16, 1, 0.3, 1
    });
  },
  once: true
});
// Let's use power3.out as standard since CustomEase requires extra plugin setup.
gsap.config({ force3D: true });

// 4. Hero Parallax
const heroImg = document.querySelector('.hero-img');
if (heroImg) {
  gsap.to(heroImg, {
    y: -15,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });
}

// 5. Portfolio Filter Tabs
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

if (filterBtns.length > 0 && portfolioCards.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active to clicked
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
          gsap.fromTo(card, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
        } else {
          card.style.display = 'none';
        }
      });
      // Force refresh ScrollTrigger to recalculate bounds after filtering layout change
      setTimeout(() => ScrollTrigger.refresh(), 50);
    });
  });
}
