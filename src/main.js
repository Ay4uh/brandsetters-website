import './style.css'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 1. Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('glass-dark');
      navbar.classList.add('scrolled-glass'); // to handle any specific full-width overrides if needed
    } else {
      navbar.classList.remove('glass-dark');
      navbar.classList.remove('scrolled-glass');
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

// 3. Scroll Reveal Animations (Apple-like fluidity)
const revealElements = document.querySelectorAll('.reveal');
// Initial state: shifted down, transparent, and blurred
gsap.set(revealElements, { opacity: 0.95, y: 40 });

ScrollTrigger.batch('.reveal', {
  start: "top 90%",
  onEnter: (elements) => {
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: "power4.out", // Soft, long-tail spring feel typical of Apple UI
    });
  },
  once: true
});
// GSAP default ease 'power3.out' is close enough to 0.16, 1, 0.3, 1, but power4.out is even silkier.
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

// 6. Custom Cursor (iOS 26 Liquid Glass)
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

if (cursor && follower) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Use requestAnimationFrame for smooth lerping
  function renderCursor() {
    // Cursor snaps instantly
    cursorX = mouseX;
    cursorY = mouseY;
    
    // Follower lerps slowly behind
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;

    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Hover state detection
  const clickables = document.querySelectorAll("a, button, .portfolio-card, .service-card");
  clickables.forEach(el => {
    el.addEventListener("mouseenter", () => {
      follower.classList.add("hovering");
    });
    el.addEventListener("mouseleave", () => {
      follower.classList.remove("hovering");
    });
  });
}
