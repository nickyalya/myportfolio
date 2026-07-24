// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursorFollower.style.left = e.clientX + 'px';
  cursorFollower.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .project-card, .exp-card, .achievement-card, .inv-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(1.5)';
    cursorFollower.style.transform = 'scale(1.5)';
    cursorFollower.style.borderColor = 'var(--pink-400)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursorFollower.style.transform = 'scale(1)';
    cursorFollower.style.borderColor = 'var(--lavender-400)';
  });
});

// Navbar scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

toggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  toggle.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    toggle.classList.remove('active');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (scrollY >= top) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Project filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Skill bars animation on scroll
const skillBars = document.querySelectorAll('.bar-fill');
const observerOptions = { threshold: 0.3 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = width;
      }, 200);
    }
  });
}, observerOptions);

skillBars.forEach(bar => observer.observe(bar));

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.timeline-item, .exp-card, .project-card, .achievement-card, .inv-card');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
  fadeObserver.observe(el);
});

// Contact form
document.querySelector('.contact-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you for your message! I will get back to you soon.');
  e.target.reset();
});

// Smooth reveal for about info items
const infoItems = document.querySelectorAll('.info-item');
infoItems.forEach((item, i) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = `all 0.5s ease ${i * 0.1}s`;
});

const infoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.3 });

infoItems.forEach(item => infoObserver.observe(item));

// FYP slider behavior
const sliders = document.querySelectorAll('.fyp-slider');
const sliderButtons = document.querySelectorAll('.slider-btn');
const sliderState = {};

sliders.forEach(slider => {
  const key = slider.dataset.slider;
  sliderState[key] = 0;
});

sliderButtons.forEach(button => {
  button.addEventListener('click', () => {
    const sliderKey = button.dataset.sliderBtn;
    const direction = button.dataset.direction;
    const slider = document.querySelector(`.fyp-slider[data-slider="${sliderKey}"]`);
    const slides = slider.querySelectorAll('.slide');
    const total = slides.length;
    let current = sliderState[sliderKey] || 0;

    if (direction === 'next') {
      current = (current + 1) % total;
    } else {
      current = (current - 1 + total) % total;
    }

    sliderState[sliderKey] = current;
    slider.style.transform = `translateX(-${current * 100}%);`;
  });
});
