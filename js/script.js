class Animation {
  constructor(elements, options = {}) {
    this.elements = elements;
    this.options = Object.assign({
      duration: 700,
      delay: 100,
      translateY: -50,
      opacity: 0,
      stagger: 100,
    }, options);
  }

  animate() {
    this.elements.forEach((el, i) => {
      el.style.opacity = this.options.opacity;
      el.style.transform = `translateY(${this.options.translateY}px)`;
      setTimeout(() => {
        el.style.transition = `opacity ${this.options.duration}ms, transform ${this.options.duration}ms`;
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
      }, this.options.delay + i * this.options.stagger);
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // header__top и title появляются сразу
  const headerTop = document.querySelector('.header__top');
  if (headerTop) {
    new Animation([headerTop], { duration: 800, delay: 100 }).animate();
  }
  const title = document.querySelector('.title__news');
  if (title) {
    new Animation([title], { duration: 800, delay: 900 }).animate();
  }

  // Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  });

  // Fade-in OOP
  class FadeIn {
    constructor(selector, options = {}) {
      this.elements = document.querySelectorAll(selector);
      this.options = Object.assign({
        duration: 800,
        translateY: 40,
        trigger: 0.85,
        stagger: 120,
      }, options);
      this.init();
      window.addEventListener('scroll', () => this.handleScroll());
      this.handleScroll();
    }
    init() {
      this.elements.forEach((el, i) => {
        el.style.opacity = 0;
        el.style.transform = `translateY(${this.options.translateY}px)`;
        el.style.transition = `opacity ${this.options.duration}ms, transform ${this.options.duration}ms`;
      });
    }
    handleScroll() {
      this.elements.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const triggerPoint = window.innerHeight * this.options.trigger;
        if (rect.top < triggerPoint && rect.bottom > 0) {
          setTimeout(() => {
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
          }, i * this.options.stagger);
        }
      });
    }
  }

  new FadeIn('.banner__box', { duration: 700, translateY: 60, stagger: 120 });
  new FadeIn('.info__news-box', { duration: 700, translateY: 60, stagger: 120 });
  new FadeIn('.section__new-box', { duration: 700, translateY: 60, stagger: 120 });
  new FadeIn('.section__new-box2', { duration: 700, translateY: 60, stagger: 120 });
  new FadeIn('.footer__col', { duration: 700, translateY: 60, stagger: 120 });
});