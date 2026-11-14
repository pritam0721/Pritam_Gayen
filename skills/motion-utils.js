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

  // =========================================================================
  // 02. SMOOTH SCROLLING (Lenis)
  // =========================================================================
  const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });
  lenis.stop();
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // =========================================================================
  // 03. MAGNETIC CURSOR & HOVER LOGIC
  // =========================================================================
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  let mouseX = window.innerWidth / 2,
    mouseY = window.innerHeight / 2;
  let ringX = mouseX,
    ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(cursorDot, {
      x: mouseX,
      y: mouseY,
      duration: 0.1,
      ease: 'power2.out',
    });
  });

  gsap.ticker.add(() => {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    gsap.set(cursorRing, { x: ringX, y: ringY });
  });

  document
    .querySelectorAll('.hover-target, .hover-trigger, .hl-img')
    .forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorRing.classList.add('active');
        cursorRing.innerText = 'VIEW';
      });
      el.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('active');
        cursorRing.innerText = '';
      });
    });

  // =========================================================================
  // 04. LIQUID SVG FILTER (Hero Hover)
  // =========================================================================
  const liquidMap = document.querySelector('#liquidMap');
  const heroImgBox = document.querySelector('.hero-img-box');
  let liquidTl = gsap.timeline({ paused: true });
  liquidTl
    .to(liquidMap, { attr: { scale: 40 }, duration: 0.8, ease: 'power2.out' })
    .to(liquidMap, { attr: { scale: 0 }, duration: 1.2, ease: 'power2.inOut' });

  if (heroImgBox && liquidMap)
    heroImgBox.addEventListener('mouseenter', () => liquidTl.restart());

  // =========================================================================
  // 05. CINEMATIC PRELOADER
  // =========================================================================
  let progress = { val: 0 };
  const percEl = document.querySelector('.loader-perc');
  const tlLoader = gsap.timeline({
    onComplete: () => {
      lenis.start();
      initScrollAnimations();
    },
  });

  tlLoader
    .to(progress, {
      val: 100,
      duration: 2.2,
      ease: 'power3.inOut',
      onUpdate: () => {
        percEl.innerText = Math.round(progress.val);
        gsap.set('.loader-bar', { width: progress.val + '%' });
      },
    })
    .to('.loader', {
      yPercent: -100,
      duration: 1.2,
      ease: 'power4.inOut',
      delay: 0.2,
    })
    .to(
      '#hero-img',
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1.8,
        ease: 'power4.inOut',
      },
      '-=0.8',
    )
    .fromTo(
      '#hero-img .img-parallax',
      { scale: 1.3 },
      { scale: 1, duration: 2.5, ease: 'power3.out' },
      '-=1.8',
    )
    .to(
      '.s-hero .word',
      { y: '0%', duration: 1.2, stagger: 0.05, ease: 'power4.out' },
      '-=1.5',
    )
    .to(
      '.s-hero .gs-fade',
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=1.2',
    );

  // =========================================================================
  // 06. CORE SCROLL ANIMATIONS FUNCTION
  // =========================================================================
  function initScrollAnimations() {
    // A. ⭐️ THE CREATIVE HIGHLIGHTER SCRUB (Words & Inline Media Reveal) ⭐️
    gsap.to('.hl-word, .hl-img', {
      opacity: 1,
      filter: 'grayscale(0%)',
      stagger: 0.05,
      scrollTrigger: {
        trigger: '.hl-container',
        start: 'top 75%',
        end: 'bottom 60%',
        scrub: 1,
      },
    });

    // B. ⭐️ FIXED CINEMATIC EXPAND (Width/Height hardware animation) ⭐️
    if (window.innerWidth > 1024) {
      const expandTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#expand-trigger',
          start: 'center center',
          end: '+=1500',
          pin: true,
          scrub: 1,
        },
      });

      // Directly animate the physical container dimensions for 0 bugs in Safari/Chrome
      expandTl
        .to('.expand-container', {
          width: '100vw',
          height: '100vh',
          borderRadius: '0px',
          ease: 'power2.inOut',
          duration: 1,
        })
        .to(
          '#expand-img',
          { filter: 'brightness(0.7) grayscale(0%)', duration: 1 },
          '<',
        )
        .to('.expand-text', { opacity: 1, duration: 0.3 }, '-=0.2');
    }

    // C. HORIZONTAL GALLERY SCROLL
    if (window.innerWidth > 1024) {
      const hTrack = document.querySelector('.horiz-track');
      let hTween = gsap.to(hTrack, {
        xPercent: -100 * (2 / 3),
        ease: 'none',
        scrollTrigger: {
          trigger: '#hz-trigger',
          pin: true,
          scrub: 1,
          end: () => '+=' + hTrack.scrollWidth,
        },
      });

      gsap.utils.toArray('.hz-img').forEach((mask) => {
        gsap.to(mask, {
          scrollTrigger: {
            trigger: mask,
            containerAnimation: hTween,
            start: 'left 75%',
            toggleActions: 'play none none reverse',
          },
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.5,
          ease: 'power4.inOut',
        });
      });
    }

    // D. THE HOVER LIST (Fluid physics engine)
    const listItems = document.querySelectorAll('.hover-trigger');
    const gallery = document.getElementById('cursor-gallery');
    const galleryImgs = gallery.querySelectorAll('.cg-img');

    const xTo = gsap.quickTo(gallery, 'x', {
      duration: 0.6,
      ease: 'power3.out',
    });
    const yTo = gsap.quickTo(gallery, 'y', {
      duration: 0.6,
      ease: 'power3.out',
    });
    const rotTo = gsap.quickTo(gallery, 'rotation', {
      duration: 0.8,
      ease: 'power3.out',
    });

    let isHoveringList = false;

    document.getElementById('hover-list').addEventListener('mousemove', (e) => {
      if (isHoveringList) {
        xTo(e.clientX);
        yTo(e.clientY);
        const rotX = (e.clientX / window.innerWidth - 0.5) * 20;
        rotTo(rotX);
      }
    });

    listItems.forEach((item) => {
      item.addEventListener('mouseenter', (e) => {
        isHoveringList = true;
        const idx = item.getAttribute('data-idx');

        galleryImgs.forEach((img) => img.classList.remove('active'));
        galleryImgs[idx].classList.add('active');

        gsap.set(gallery, { x: e.clientX, y: e.clientY });
        gsap.to(gallery, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.5)',
        });

        cursorRing.style.opacity = '0';
      });

      item.addEventListener('mouseleave', () => {
        isHoveringList = false;
        gsap.to(gallery, {
          opacity: 0,
          scale: 0.6,
          duration: 0.4,
          ease: 'power2.in',
        });
        cursorRing.style.opacity = '1';
      });
    });

    // E. INFINITE MARQUEE SCROLL
    gsap.to('.marquee-wrap', {
      xPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.s-marquee',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // F. MASONRY DETAILS GRID (Parallax Speeds)
    if (window.innerWidth > 1024) {
      gsap.utils.toArray('.grid-col').forEach((col) => {
        let speed = col.getAttribute('data-speed');
        gsap.to(col, {
          y: () => -150 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: '.archive-grid',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }

    // G. GLOBAL UTILITIES (Staggers, Fades, Vertical Masks)
    document.querySelectorAll('section:not(.s-hero)').forEach((sec) => {
      const words = sec.querySelectorAll('.word');
      if (words.length) {
        gsap.to(words, {
          scrollTrigger: {
            trigger: sec,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          y: '0%',
          duration: 1.2,
          stagger: 0.04,
          ease: 'power4.out',
        });
      }

      const fades = sec.querySelectorAll('.gs-fade');
      if (fades.length) {
        gsap.fromTo(
          fades,
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: 'power3.out',
          },
        );
      }

      const imgMasks = sec.querySelectorAll(
        '.img-mask:not(#hero-img):not(.hz-img)',
      );
      imgMasks.forEach((mask) => {
        gsap.to(mask, {
          scrollTrigger: {
            trigger: mask,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.6,
          ease: 'power4.inOut',
        });
      });
    });

    // H. UNIVERSAL IMAGE PARALLAX (Inside masks)
    gsap.utils.toArray('.img-parallax').forEach((img) => {
      if (img.closest('.s-expand')) return;
      gsap.to(img, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    // I. DYNAMIC THEME COLOR SHIFTING
    ScrollTrigger.create({
      trigger: '#theme-trigger-dark',
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => (document.body.className = 'theme-dark'),
      onLeaveBack: () => (document.body.className = 'theme-light'),
    });
    ScrollTrigger.create({
      trigger: '#theme-trigger-light',
      start: 'top 60%',
      end: 'bottom 0%',
      onEnter: () => (document.body.className = 'theme-light'),
      onLeaveBack: () => (document.body.className = 'theme-dark'),
    });
  }
});
