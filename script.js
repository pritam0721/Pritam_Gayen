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
  const lenis = new Lenis();

  lenis.stop();
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  gsap.set('.nav', { autoAlpha: 0, y: -20 });
  gsap.set('.s-hero .gs-fade', { autoAlpha: 0, y: 20 });

  const pageLoaded =
    document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise((resolve) => {
          window.addEventListener('load', resolve, { once: true });
        });

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;
  const countdownProgress = { value: 9 };

  const revealPage = () => {
    countdown.classList.add('is-finished');

    gsap
      .timeline({
        onComplete: () => {
          loader.style.display = 'none';
          lenis.start();
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
        '.s-hero .word',
        {
          y: '0%',
          duration: reducedMotion ? 0 : 1.2,
          stagger: reducedMotion ? 0 : 0.05,
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
        countdown.style.setProperty('--number', Math.ceil(countdownProgress.value));
      },
      onComplete: revealPage,
    });
  });
});
