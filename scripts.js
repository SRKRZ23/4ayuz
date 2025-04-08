// Preloader
const preloader = document.querySelector('.preloader');
if (preloader) {
  window.addEventListener('load', () => {
    preloader.classList.add('hidden');
  });
}

// Header scroll effect
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Chat bot
const chatIcon = document.querySelector('.chat-icon');
const chatWindow = document.querySelector('.chat-window');
if (chatIcon && chatWindow) {
  chatIcon.addEventListener('click', () => {
    chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
    gsap.from(chatWindow, { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' });
  });

  const chatOptions = document.querySelectorAll('.chat-option');
  chatOptions.forEach(option => {
    option.addEventListener('click', () => {
      const response = option.getAttribute('data-response');
      const chatBody = document.querySelector('.chat-body');
      const message = document.createElement('p');
      message.classList.add('bot-message');
      message.textContent = response === 'Заявка' ? 'Пожалуйста, оставьте свои данные, и мы свяжемся с вами!' : 'Вот ссылка на наше портфолио: [Портфолио](#)';
      chatBody.appendChild(message);
      chatBody.scrollTop = chatBody.scrollHeight;
    });
  });
}

// Blog modal and animation
const blogItems = document.querySelectorAll('.blog-item');
const blogModal = document.querySelector('.blog-modal');
const blogModalContent = document.querySelector('.blog-modal .modal-content');
const blogModalClose = document.querySelector('.blog-modal .modal-close');

if (blogItems.length > 0 && blogModal && blogModalContent && blogModalClose) {
  // Логика модального окна
  blogItems.forEach(item => {
    item.addEventListener('click', () => {
      const title = item.querySelector('h3').textContent;
      const text = item.querySelector('p').textContent;
      blogModalContent.querySelector('h2').textContent = title;
      blogModalContent.querySelector('p').textContent = text;
      blogModal.style.display = 'flex';
      gsap.from(blogModalContent, { opacity: 0, y: 50, duration: 0.5, ease: 'power2.out' });
    });
  });

  blogModalClose.addEventListener('click', () => {
    gsap.to(blogModalContent, { opacity: 0, y: 50, duration: 0.5, ease: 'power2.out', onComplete: () => {
      blogModal.style.display = 'none';
    }});
  });

  blogModal.addEventListener('click', (e) => {
    if (e.target === blogModal) {
      gsap.to(blogModalContent, { opacity: 0, y: 50, duration: 0.5, ease: 'power2.out', onComplete: () => {
        blogModal.style.display = 'none';
      }});
    }
  });

  // Анимация для blogItems (убираем stagger)
  gsap.from(blogItems, {
    scrollTrigger: {
      trigger: '.blog-posts',
      start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });
}

// Portfolio animations (убираем stagger)
const portfolioItems = document.querySelectorAll('.portfolio-item');
if (portfolioItems.length > 0) {
  gsap.from(portfolioItems, {
    scrollTrigger: {
      trigger: '.portfolio-grid',
      start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });
}

// Filter animation (убираем stagger в фильтрации)
const filterButtons = document.querySelectorAll('.filter-btn');
if (filterButtons.length > 0) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'flex';
          gsap.fromTo(item, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
        } else {
          gsap.to(item, { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out', onComplete: () => {
            item.style.display = 'none';
          }});
        }
      });

      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });
}

// Portfolio modal
const portfolioModal = document.querySelector('.portfolio-modal');
const portfolioModalContent = document.querySelector('.portfolio-modal .modal-content');
const portfolioModalClose = document.querySelector('.portfolio-modal .modal-close');
const portfolioModalImage = document.querySelector('.modal-image');
const portfolioModalTitle = document.querySelector('.modal-title');
const portfolioModalDescription = document.querySelector('.modal-description');
const portfolioButtons = document.querySelectorAll('.portfolio-btn');

if (portfolioModal && portfolioModalContent && portfolioModalClose && portfolioModalImage && portfolioModalTitle && portfolioModalDescription && portfolioButtons.length > 0) {
  portfolioButtons.forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.portfolio-item');
      const imgSrc = item.querySelector('img').src;
      const title = item.getAttribute('data-title');
      const description = item.getAttribute('data-description');

      portfolioModalImage.src = imgSrc;
      portfolioModalTitle.textContent = title;
      portfolioModalDescription.textContent = description;
      portfolioModal.style.display = 'flex';

      gsap.from(portfolioModalContent, { opacity: 0, y: 50, duration: 0.5, ease: 'power2.out' });
    });
  });

  portfolioModalClose.addEventListener('click', () => {
    gsap.to(portfolioModalContent, { opacity: 0, y: 50, duration: 0.5, ease: 'power2.out', onComplete: () => {
      portfolioModal.style.display = 'none';
    }});
  });

  portfolioModal.addEventListener('click', (e) => {
    if (e.target === portfolioModal) {
      gsap.to(portfolioModalContent, { opacity: 0, y: 50, duration: 0.5, ease: 'power2.out', onComplete: () => {
        portfolioModal.style.display = 'none';
      }});
    }
  });
}

// Animations for other sections (убираем stagger)
const testimonialItems = document.querySelectorAll('.testimonial-item');
if (testimonialItems.length > 0) {
  gsap.from(testimonialItems, {
    scrollTrigger: {
      trigger: '.testimonials, .portfolio-testimonials, .about-testimonials',
      start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });
}

const ctaSection = document.querySelector('.cta-section');
if (ctaSection) {
  gsap.from(ctaSection, {
    scrollTrigger: {
      trigger: '.cta-section',
      start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });
}

const benefitItems = document.querySelectorAll('.benefit-item');
if (benefitItems.length > 0) {
  gsap.from(benefitItems, {
    scrollTrigger: {
      trigger: '.intro-benefits',
      start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });
}

const carouselItems = document.querySelectorAll('.carousel-item');
if (carouselItems.length > 0) {
  gsap.from(carouselItems, {
    scrollTrigger: {
      trigger: '.carousel',
      start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });
}

const serviceItems = document.querySelectorAll('.service-item');
if (serviceItems.length > 0) {
  gsap.from(serviceItems, {
    scrollTrigger: {
      trigger: '.services-list',
      start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });
}

const teamMembers = document.querySelectorAll('.team-member');
if (teamMembers.length > 0) {
  gsap.from(teamMembers, {
    scrollTrigger: {
      trigger: '.team',
      start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });
}

const valueItems = document.querySelectorAll('.value-item');
if (valueItems.length > 0) {
  gsap.from(valueItems, {
    scrollTrigger: {
      trigger: '.values',
      start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });
}

const awardItems = document.querySelectorAll('.award-item');
if (awardItems.length > 0) {
  gsap.from(awardItems, {
    scrollTrigger: {
      trigger: '.awards',
      start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });
}

const certificateItems = document.querySelectorAll('.certificate-item');
if (certificateItems.length > 0) {
  gsap.from(certificateItems, {
    scrollTrigger: {
      trigger: '.certificate-items',
      start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });
}

const statItems = document.querySelectorAll('.stat-item');
if (statItems.length > 0) {
  gsap.from(statItems, {
    scrollTrigger: {
      trigger: '.stats',
      start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });
}

const faqItems = document.querySelectorAll('.faq-item');
if (faqItems.length > 0) {
  gsap.from(faqItems, {
    scrollTrigger: {
      trigger: '.contact-faq',
      start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });
}