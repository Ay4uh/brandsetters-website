import './style.css'
import VanillaTilt from 'vanilla-tilt';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Fix initial visibility issues by clearing any default reveal classes
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
const heroTl = gsap.timeline({ delay: 0.5 });
const heroWords = document.querySelectorAll('.hero-word');
const heroTyping = document.querySelector('.hero-typing');
const heroCta = document.querySelectorAll('.hero-cta .btn');
const heroSubtitle = document.querySelector('.hero-subtitle');

if (heroWords.length > 0) {
  // Set initial state
  gsap.set([heroSubtitle, heroCta], { opacity: 0, y: 20 });

  heroTl.to(heroWords[0], { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
        .to(heroWords[1], { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "+=0.2")
        .to(heroTyping, { text: "Unforgettable.", duration: 1, ease: "none" }, "+=0.3")
        .to(heroSubtitle, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.5")
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

// About Section
gsap.to(".about .mask-text", {
  y: "0%",
  duration: 0.8,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".about",
    start: "top 80%",
  }
});

gsap.from(".about-content p", {
  opacity: 0,
  y: 30,
  duration: 0.8,
  delay: 0.3,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".about",
    start: "top 80%",
  }
});

// Services Stagger
gsap.from(".services .service-card", {
  y: 50,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".services",
    start: "top 75%",
  }
});
gsap.from(".services .section-header", {
  y: 30, opacity: 0, duration: 0.6, ease: "power2.out",
  scrollTrigger: { trigger: ".services", start: "top 85%" }
});

// Pricing Section
const pricingTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".pricing",
    start: "top 75%",
  }
});

pricingTl.from(".pricing .section-header", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" })
         .from(".pricing-card", { y: 50, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.3")
         .from(".volume-card", { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.4")
         .from(".pricing-custom-text", { opacity: 0, duration: 0.5 }, "-=0.2");

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
      start: "top 75%",
    }
  });
});

// Why Personal Branding Matters
gsap.from(".branding-matters .section-header", {
  y: 30, opacity: 0, duration: 0.6, ease: "power2.out",
  scrollTrigger: { trigger: ".branding-matters", start: "top 85%" }
});
gsap.from(".branding-list li", {
  x: -30,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".branding-content",
    start: "top 80%",
  }
});
gsap.from(".branding-intro", {
  y: 20, opacity: 0, duration: 0.6, ease: "power2.out",
  scrollTrigger: { trigger: ".branding-content", start: "top 80%" }
});

// Our Work
gsap.from(".work .section-header", {
  y: 30, opacity: 0, duration: 0.6, ease: "power2.out",
  scrollTrigger: { trigger: ".work", start: "top 85%" }
});
gsap.from(".portfolio-item", {
  scale: 0.95,
  opacity: 0,
  duration: 0.6,
  stagger: 0.15,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".portfolio-grid",
    start: "top 80%",
  }
});

// Footer
gsap.from(".footer-brand p, .footer-info, .footer-bottom", {
  y: 20,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".footer",
    start: "top 85%",
  }
});

// Footer Heading text reveal word by word
const footerHeading = document.querySelector('.footer-heading');
if (footerHeading) {
  const text = footerHeading.innerText;
  footerHeading.innerHTML = "";
  const words = text.split(" ");
  words.forEach(word => {
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.style.opacity = "0";
    span.style.transform = "translateY(20px)";
    span.style.marginRight = "8px";
    span.innerText = word;
    footerHeading.appendChild(span);
  });
  
  gsap.to(".footer-heading span", {
    y: 0,
    opacity: 1,
    duration: 0.5,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".footer",
      start: "top 85%",
    }
  });
}
