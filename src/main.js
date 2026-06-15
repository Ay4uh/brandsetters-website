import './style.css'
import VanillaTilt from 'vanilla-tilt';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Fix initial visibility issues
document.querySelectorAll('.reveal').forEach(el => el.classList.remove('reveal'));

// Initialize 3D Tilt
VanillaTilt.init(document.querySelectorAll(".service-card, .pricing-card, .volume-card"), {
  max: 5,
  speed: 400,
  glare: true,
  "max-glare": 0.1,
  scale: 1.02
});

// Page Transition Fade In
gsap.from("body", { opacity: 0, duration: 1, ease: "power2.inOut" });

// Hero Timeline
const heroTl = gsap.timeline({ delay: 0.2 });
const heroWords = document.querySelectorAll('.hero-word');
const heroCta = document.querySelectorAll('.hero-cta .btn');
const heroSubtitle = document.querySelector('.hero-subtitle');

if (heroWords.length > 0) {
  gsap.set([heroSubtitle, heroCta], { opacity: 0, y: 20 });

  heroTl.to(heroWords, { opacity: 1, y: 0, duration: 0.6, stagger: 0.3, ease: "power3.out" })
        .to(heroSubtitle, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.2")
        .to(heroCta, { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" }, "-=0.3");
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scroll anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Mobile menu toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
if (mobileBtn && navLinks) {
  mobileBtn.addEventListener('click', () => {
    mobileBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      mobileBtn.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// --- Scroll Animations ---

// Setup initial states for scroll animations
const animElements = [
  ".about .mask-text",
  ".about-content p",
  ".services .service-card",
  ".services .section-header",
  ".pricing .section-header",
  ".pricing-card",
  ".volume-card",
  ".pricing-custom-text",
  ".testimonials .section-header",
  ".testimonial-card",
  ".branding-matters .section-header",
  ".branding-list li",
  ".branding-intro",
  ".work .section-header",
  ".portfolio-item",
  ".footer-brand p",
  ".footer-info",
  ".footer-bottom",
  ".footer-heading span"
];

// Set all animated elements to transparent initially
gsap.set(animElements, { opacity: 0, y: 30 });
gsap.set(".about .mask-text", { y: "100%" });

// Create simple reveal function
function createReveal(selector, stagger = 0) {
  gsap.to(selector, {
    y: 0,
    opacity: 1,
    duration: 0.6,
    stagger: stagger,
    ease: "power2.out",
    scrollTrigger: {
      trigger: selector,
      start: "top 90%",
      toggleActions: "play none none none"
    }
  });
}

// Apply reveals
createReveal(".about .mask-text");
createReveal(".about-content p");
createReveal(".services .section-header");
createReveal(".services .service-card", 0.1);
createReveal(".pricing .section-header");
createReveal(".pricing-card", 0.1);
createReveal(".volume-card", 0.1);
createReveal(".pricing-custom-text");
createReveal(".testimonials .section-header");
createReveal(".testimonial-card", 0.1);
createReveal(".branding-matters .section-header");
createReveal(".branding-intro");
createReveal(".branding-list li", 0.1);
createReveal(".work .section-header");
createReveal(".portfolio-item", 0.1);
createReveal(".footer-brand p");
createReveal(".footer-info");
createReveal(".footer-bottom");

// Footer Heading text reveal word by word
const footerHeading = document.querySelector('.footer-heading');
if (footerHeading && !footerHeading.querySelector('span')) {
  const text = footerHeading.innerText;
  footerHeading.innerHTML = "";
  const words = text.split(" ");
  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.style.opacity = "0";
    span.style.transform = "translateY(20px)";
    span.innerText = word;
    footerHeading.appendChild(span);
    if (index < words.length - 1) {
      footerHeading.appendChild(document.createTextNode(" "));
    }
  });
  createReveal(".footer-heading span", 0.1);
}

// Number Counter
const priceVals = document.querySelectorAll('.price-val');
priceVals.forEach(val => {
  const target = parseInt(val.getAttribute('data-target'));
  gsap.to(val, {
    innerHTML: target,
    duration: 1.5,
    ease: "power2.out",
    snap: { innerHTML: 1 },
    scrollTrigger: {
      trigger: ".pricing",
      start: "top 85%",
    }
  });
});

// Refresh ScrollTrigger after a slight delay to ensure layouts are computed
setTimeout(() => {
  ScrollTrigger.refresh();
}, 500);

// FALLBACK: If elements are still stuck at opacity 0 after 1 second, force them visible.
setTimeout(() => {
  gsap.to(animElements, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    clearProps: "opacity,y" // Clears only GSAP opacity/y so VanillaTilt 3D styles remain intact
  });
}, 1000);
