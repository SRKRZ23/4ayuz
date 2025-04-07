gsap.registerPlugin(ScrollTrigger);


// Preloader
const preloader = document.querySelector('.preloader');
if (preloader) {
  window.addEventListener('load', () => {
    gsap.to('.preloader-logo', { scale: 1.1, repeat: -1, yoyo: true, duration: 1 });
    const minDisplayTime = new Promise(resolve => setTimeout(resolve, 2000));
    Promise.all([minDisplayTime]).then(() => {
      gsap.to(preloader, { opacity: 0, duration: 0.5, onComplete: () => preloader.classList.add('hidden') });
    });
  });
}

// Hero анимация
const heroH1 = document.querySelector(".hero h1");
if (heroH1) {
  gsap.from(heroH1, { y: 20, opacity: 0, duration: 0.7, ease: "power2.out" });
}

// Анимации для страниц
const pageHeaders = document.querySelectorAll(".services-page h1, .portfolio-page h1, .about-page h1, .contacts-page h1, .blog-section h1");
if (pageHeaders.length > 0) {
  gsap.from(pageHeaders, { scrollTrigger: { trigger: ".services-page, .portfolio-page, .about-page, .contacts-page, .blog-section", start: "top 80%" }, y: 50, opacity: 0, duration: 0.7 });
}

const animatedItems = document.querySelectorAll(".carousel-item, .service-item, .portfolio-item, .stat-item, .contact-info, .blog-post");
if (animatedItems.length > 0) {
  gsap.from(animatedItems, { scrollTrigger: { trigger: ".carousel, .services-list, .portfolio-grid, .stats, .contact-info, .blog-posts", start: "top 80%" }, y: 30, opacity: 0, stagger: 0.2, duration: 0.5 });
}

// Блог модалка
const readMoreLinks = document.querySelectorAll('.read-more');
const blogModal = document.querySelector('.blog-modal');
if (readMoreLinks.length > 0 && blogModal) {
  const modalContent = blogModal.querySelector('.modal-content');
  const modalClose = blogModal.querySelector('.modal-close');
  let isAnimating = false;
  readMoreLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (isAnimating) return;
      isAnimating = true;
      const post = link.closest('.blog-post');
      modalContent.querySelector('h2').textContent = post.querySelector('h2').textContent;
      modalContent.querySelector('p').textContent = post.getAttribute('data-full-text') || post.querySelector('p').textContent;
      blogModal.style.display = 'flex';
      gsap.fromTo('.modal-content', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out', onComplete: () => isAnimating = false });
    });
  });
  modalClose.addEventListener('click', closeModal);
  blogModal.addEventListener('click', (e) => { if (e.target === blogModal) closeModal(); });
  function closeModal() {
    if (isAnimating) return;
    isAnimating = true;
    gsap.to('.modal-content', { scale: 0.8, opacity: 0, duration: 0.3, onComplete: () => { blogModal.style.display = 'none'; isAnimating = false; } });
  }
}

// Фильтрация портфолио
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
if (filterButtons.length > 0 && portfolioItems.length > 0) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const category = button.getAttribute('data-category');
      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
          item.style.display = 'block';
          gsap.from(item, { y: 20, opacity: 0, duration: 0.5 });
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Фильтрация блога
const blogFilterButtons = document.querySelectorAll('.blog-filter .filter-btn');
const blogPosts = document.querySelectorAll('.blog-post');
if (blogFilterButtons.length > 0 && blogPosts.length > 0) {
  blogFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
      blogFilterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const category = button.getAttribute('data-category');
      blogPosts.forEach(post => {
        const postCategory = post.getAttribute('data-category');
        if (category === 'all' || postCategory === category) {
          post.style.display = 'block';
          gsap.from(post, { y: 20, opacity: 0, duration: 0.5 });
        } else {
          post.style.display = 'none';
        }
      });
    });
  });
}

// Чат-бот
const chatIcon = document.querySelector('.chat-icon');
const chatWindow = document.querySelector('.chat-window');
if (chatIcon && chatWindow) {
  const chatBody = document.querySelector('.chat-body');
  const chatOptions = document.querySelectorAll('.chat-option');
  chatIcon.addEventListener('click', () => {
    const isOpen = chatWindow.style.display === 'flex';
    if (!isOpen) {
      chatWindow.style.display = 'flex';
      gsap.fromTo(chatWindow, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 });
    } else {
      gsap.to(chatWindow, { scale: 0, opacity: 0, duration: 0.3, onComplete: () => chatWindow.style.display = 'none' });
    }
  });
  chatOptions.forEach(button => {
    button.addEventListener('click', () => {
      const response = button.getAttribute('data-response');
      const message = document.createElement('p');
      message.className = 'bot-message';
      message.textContent = response;
      chatBody.appendChild(message);
      gsap.from(message, { y: 20, opacity: 0, duration: 0.5 });
      setTimeout(() => chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' }), 100);
    });
  });
}

// Tooltips
const tooltipItems = document.querySelectorAll('[data-tooltip]');
if (tooltipItems.length > 0) {
  tooltipItems.forEach(item => {
    const tooltip = item.querySelector('.tooltip-text');
    item.addEventListener('mouseenter', () => {
      gsap.fromTo(tooltip, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 });
    });
    item.addEventListener('mouseleave', () => {
      gsap.to(tooltip, { y: 10, opacity: 0, duration: 0.3 });
    });
  });
}