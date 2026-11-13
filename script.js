document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // =========================================================================
  // 01. TEXT SPLITTER UTILITY
  // =========================================================================
  document.querySelectorAll('.split-words').forEach((el) => {
    const text = el.innerText;
    el.innerHTML = '';
    text.split(' ').forEach((word) => {
      if (word.trim() === '') return;
      el.innerHTML += `<span class="word-wrap"><span class="word">${word}&nbsp;</span></span>`;
    });
  });

  const loader = document.querySelector('.loader');
  const countdown = document.querySelector('.kinetic-countdown');
  const hero = document.querySelector('.s-hero');
  const heroImageBox = hero.querySelector('.hero-img-box');
  const heroImage = heroImageBox.querySelector('.img-parallax');
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;
  const supportsCustomCursor = window.matchMedia(
    '(hover: hover) and (pointer: fine)',
  ).matches;
  const lenis = reducedMotion
    ? null
    : new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

  if (lenis) {
    lenis.stop();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  gsap.set('.nav', { autoAlpha: 0, y: -20 });
  gsap.set('.s-hero .hero-title', {
    autoAlpha: reducedMotion ? 1 : 0,
    y: reducedMotion ? 0 : 24,
  });
  gsap.set('.s-hero .gs-fade', { autoAlpha: 0, y: 20 });
  if (!reducedMotion) {
    gsap.set(heroImageBox, {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
    });
  }

  if (supportsCustomCursor && !reducedMotion) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    const dotXTo = gsap.quickTo(cursorDot, 'x', {
      duration: 0.1,
      ease: 'power2.out',
    });
    const dotYTo = gsap.quickTo(cursorDot, 'y', {
      duration: 0.1,
      ease: 'power2.out',
    });

    const moveCursor = (event) => {
      if (event.pointerType !== 'mouse') return;
      mouseX = event.clientX;
      mouseY = event.clientY;
      dotXTo(mouseX);
      dotYTo(mouseY);
    };

    hero.addEventListener('pointerenter', (event) => {
      if (event.pointerType !== 'mouse') return;
      hero.classList.add('is-cursor-active');
      document.body.classList.add('hero-cursor-active');
      moveCursor(event);
    });
    hero.addEventListener('pointermove', moveCursor);
    hero.addEventListener('pointerleave', () => {
      hero.classList.remove('is-cursor-active');
      document.body.classList.remove('hero-cursor-active');
      cursorRing.classList.remove('active');
      cursorRing.textContent = '';
    });

    hero.querySelectorAll('.hero-img-box, .hero-action').forEach((target) => {
      target.addEventListener('pointerenter', (event) => {
        if (event.pointerType !== 'mouse') return;
        cursorRing.classList.add('active');
        cursorRing.textContent = target.matches('.hero-img-box') ? 'VIEW' : 'GO';
      });
      target.addEventListener('pointerleave', () => {
        cursorRing.classList.remove('active');
        cursorRing.textContent = '';
      });
    });

    gsap.ticker.add(() => {
      if (!hero.classList.contains('is-cursor-active')) return;
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      gsap.set(cursorRing, { x: ringX, y: ringY });
    });

    const imageXTo = gsap.quickTo(heroImage, 'x', {
      duration: 0.8,
      ease: 'power3.out',
    });
    const imageYTo = gsap.quickTo(heroImage, 'y', {
      duration: 0.8,
      ease: 'power3.out',
    });

    heroImageBox.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      const bounds = heroImageBox.getBoundingClientRect();
      const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;
      imageXTo(-offsetX * 8);
      imageYTo(-offsetY * 8);
    });
    heroImageBox.addEventListener('pointerenter', (event) => {
      if (event.pointerType !== 'mouse') return;
      gsap.to(heroImage, {
        scale: 1.025,
        duration: 1,
        ease: 'power3.out',
      });
    });
    heroImageBox.addEventListener('pointerleave', () => {
      imageXTo(0);
      imageYTo(0);
      gsap.to(heroImage, {
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
      });
    });
  }

  const pageLoaded =
    document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise((resolve) => {
          window.addEventListener('load', resolve, { once: true });
        });

  const countdownProgress = { value: 9 };

  const revealPage = () => {
    countdown.classList.add('is-finished');

    gsap
      .timeline({
        onComplete: () => {
          loader.style.display = 'none';
          lenis?.start();
          ScrollTrigger.refresh();
        },
      })
      .to(loader, {
        yPercent: -100,
        duration: reducedMotion ? 0 : 1.2,
        ease: 'power4.inOut',
      })
      .to(
        '.nav',
        {
          autoAlpha: 1,
          y: 0,
          duration: reducedMotion ? 0 : 0.8,
          ease: 'power3.out',
        },
        reducedMotion ? '>' : '-=0.4',
      )
      .to(
        heroImageBox,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: reducedMotion ? 0 : 1.4,
          ease: 'power4.inOut',
        },
        reducedMotion ? '>' : '-=0.9',
      )
      .fromTo(
        heroImage,
        { scale: reducedMotion ? 1 : 1.12 },
        {
          scale: 1,
          duration: reducedMotion ? 0 : 1.8,
          ease: 'power3.out',
        },
        '<',
      )
      .to(
        '.s-hero .hero-title',
        {
          autoAlpha: 1,
          y: 0,
          duration: reducedMotion ? 0 : 1,
          stagger: reducedMotion ? 0 : 0.12,
          ease: 'power4.out',
        },
        reducedMotion ? '>' : '-=0.5',
      )
      .to(
        '.s-hero .gs-fade',
        {
          autoAlpha: 1,
          y: 0,
          duration: reducedMotion ? 0 : 1,
          ease: 'power3.out',
        },
        reducedMotion ? '>' : '-=0.8',
      );
  };

  pageLoaded.then(() => {
    if (reducedMotion) {
      revealPage();
      return;
    }

    gsap.to(countdownProgress, {
      value: 0,
      duration: 9,
      ease: 'none',
      onUpdate: () => {
        countdown.style.setProperty(
          '--number',
          Math.ceil(countdownProgress.value),
        );
      },
      onComplete: revealPage,
    });
  });
});
