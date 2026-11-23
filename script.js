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
  const nav = document.querySelector('.nav');
  const creativeSection = document.querySelector('.s-creative');
  const systemsOverviewElement = document.querySelector('.systems-overview');
  const systemsMapElement = systemsOverviewElement
    ? systemsOverviewElement.querySelector('.systems-map')
    : null;
  const systemsRiverElement = systemsMapElement
    ? systemsMapElement.querySelector('.systems-river')
    : null;
  const systemsRiverProgressElement = systemsRiverElement
    ? systemsRiverElement.querySelector('.systems-river-progress')
    : null;
  const systemsMapNodes = systemsMapElement
    ? Array.from(systemsMapElement.querySelectorAll('.systems-node'))
    : [];
  const updateSystemsRiverGeometry = () => {
    if (
      !systemsMapElement ||
      !systemsRiverElement ||
      !systemsRiverProgressElement ||
      systemsMapNodes.length === 0
    ) {
      return;
    }

    const mapBounds = systemsMapElement.getBoundingClientRect();
    if (!mapBounds.width || !mapBounds.height) return;

    const points = systemsMapNodes.map((node) => {
      const iconBounds = node
        .querySelector('.systems-node-icon')
        .getBoundingClientRect();

      return {
        x: iconBounds.left + iconBounds.width / 2 - mapBounds.left,
        y: iconBounds.top + iconBounds.height / 2 - mapBounds.top,
      };
    });
    const pathData = points.reduce((data, point, index) => {
      if (index === 0) return `M ${point.x} ${point.y}`;

      const previous = points[index - 1];
      const controlY = previous.y + (point.y - previous.y) / 2;
      return `${data} C ${previous.x} ${controlY}, ${point.x} ${controlY}, ${point.x} ${point.y}`;
    }, '');

    systemsRiverElement.setAttribute(
      'viewBox',
      `0 0 ${mapBounds.width} ${mapBounds.height}`,
    );
    systemsRiverProgressElement.setAttribute('d', pathData);
    if (!reducedMotion) {
      const riverLength = systemsRiverProgressElement.getTotalLength();
      systemsRiverProgressElement.style.strokeDasharray =
        `${riverLength} ${riverLength}`;
      systemsRiverProgressElement.style.strokeDashoffset = `${riverLength}`;
    }
  };

  let systemsMapObserver;
  if (systemsMapElement) {
    updateSystemsRiverGeometry();
    systemsMapObserver = new ResizeObserver(() => {
      updateSystemsRiverGeometry();
      ScrollTrigger.refresh();
    });
    systemsMapObserver.observe(systemsMapElement);
    window.addEventListener('resize', () => {
      updateSystemsRiverGeometry();
      if (systemsMapObserver) ScrollTrigger.refresh();
    });
  }

  if (nav && supportsCustomCursor) {
    let navHideTimeout;
    const revealNav = () => {
      window.clearTimeout(navHideTimeout);
      nav.classList.add('is-visible');
    };
    const scheduleNavHide = () => {
      window.clearTimeout(navHideTimeout);
      navHideTimeout = window.setTimeout(() => {
        if (!nav.matches(':hover') && !nav.contains(document.activeElement)) {
          nav.classList.remove('is-visible');
        }
      }, 450);
    };

    window.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      if (event.clientY <= 22) {
        revealNav();
      } else if (nav.classList.contains('is-visible') && !nav.matches(':hover')) {
        scheduleNavHide();
      }
    });
    nav.addEventListener('pointerenter', revealNav);
    nav.addEventListener('pointerleave', scheduleNavHide);
    nav.addEventListener('focusin', revealNav);
    nav.addEventListener('focusout', (event) => {
      if (!nav.contains(event.relatedTarget)) scheduleNavHide();
    });
  }

  if (nav) {
    const pageSections = Array.from(
      document.querySelectorAll('main > section'),
    );
    const updateNavTheme = () => {
      const referenceY = window.innerHeight * 0.55;
      const sectionAtReference = pageSections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= referenceY && bounds.bottom > referenceY;
      });

      if (!sectionAtReference) return;
      const isCreative = sectionAtReference === creativeSection;
      nav.classList.toggle('nav-theme-petrol', isCreative);
      nav.classList.toggle(
        'nav-theme-dark',
        !isCreative && sectionAtReference.classList.contains('theme-dark'),
      );
    };

    window.addEventListener('scroll', updateNavTheme, { passive: true });
    window.addEventListener('resize', updateNavTheme);
    ScrollTrigger.addEventListener('refresh', updateNavTheme);
    updateNavTheme();
  }

  if (creativeSection && !reducedMotion) {
    const creativeIntro = creativeSection.querySelector('.creative-intro');
    const systemsOverview = systemsOverviewElement;
    const creativeBeats = Array.from(
      creativeSection.querySelectorAll('.creative-beat'),
    );
    const creativeBeatsContainer =
      creativeSection.querySelector('.creative-beats');
    const creativeOutro = creativeSection.querySelector('.creative-outro');
    const progressCurrent = creativeSection.querySelector(
      '.creative-progress-current',
    );
    const progressFill = creativeSection.querySelector(
      '.creative-progress-fill',
    );
    const creativeMedia = gsap.matchMedia();

    creativeMedia.add(
      {
        isDesktop: '(min-width: 761px)',
        isMobile: '(max-width: 760px)',
      },
      (context) => {
        const { isDesktop } = context.conditions;

        gsap.fromTo(
          creativeIntro,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: creativeIntro,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          },
        );

        const systemsNodes = systemsMapNodes;
        const systemsRiverProgress = systemsRiverProgressElement;
        systemsOverview.classList.remove('is-complete');
        systemsNodes.forEach((node) => node.classList.remove('is-complete'));
        const systemsTimeline = gsap.timeline({
          onStart: () => systemsOverview.classList.add('is-running'),
          onComplete: () => {
            systemsOverview.classList.remove('is-running');
            systemsOverview.classList.add('is-complete');
          },
          onReverseComplete: () => {
            systemsOverview.classList.remove('is-running', 'is-complete');
          },
          scrollTrigger: {
            trigger: systemsOverview,
            start: 'top 78%',
            end: 'bottom 40%',
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });

        systemsTimeline.fromTo(
          systemsRiverProgress,
          { strokeDashoffset: () => systemsRiverProgress.getTotalLength() },
          { strokeDashoffset: 0, duration: 1, ease: 'none' },
          0,
        );
        systemsNodes.forEach((node, index) => {
          const position = 0.04 + (index / (systemsNodes.length - 1)) * 0.9;
          const icon = node.querySelector('.systems-node-icon');
          const copy = node.querySelector('.systems-node-copy');
          const glowTargets = [icon, copy];
          const accent = getComputedStyle(node)
            .getPropertyValue('--system-accent')
            .trim();

          systemsTimeline.fromTo(
            node,
            { autoAlpha: 0, scale: 0.82 },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.1,
              ease: 'back.out(1.7)',
              onComplete: () => node.classList.add('is-complete'),
              onReverseComplete: () => node.classList.remove('is-complete'),
            },
            position,
          );
          systemsTimeline.fromTo(
            icon,
            { scale: 0.45, rotation: -14 },
            {
              scale: 1,
              rotation: 0,
              duration: 0.16,
              ease: 'back.out(1.7)',
            },
            position + 0.01,
          );
          systemsTimeline.to(
            glowTargets,
            {
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.4)',
              borderColor: accent,
              duration: 0.08,
              ease: 'power1.out',
            },
            position,
          );
          if (index < systemsNodes.length - 1) {
            const nextPosition =
              0.04 +
              ((index + 1) / (systemsNodes.length - 1)) * 0.9;
            systemsTimeline.to(
              glowTargets,
              {
                boxShadow: '0 0 0 rgba(255, 255, 255, 0)',
                borderColor: 'rgba(242, 239, 233, 0.2)',
                duration: 0.08,
                ease: 'power1.out',
              },
              nextPosition - 0.08,
            );
          }
        });

        gsap.fromTo(
          creativeSection,
          { backgroundColor: '#F2EFE9', color: '#1C1A17' },
          {
            backgroundColor: '#263B38',
            color: '#F2EFE9',
            ease: 'none',
            scrollTrigger: {
              trigger: creativeSection,
              start: 'top 88%',
              end: 'top 18%',
              scrub: true,
            },
          },
        );

        gsap.fromTo(
          creativeOutro,
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: creativeOutro,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          },
        );

        const addArtworkAnimations = (timeline, beat, position) => {
          const art = beat.querySelector('.capability-art');
          const metrics = beat.querySelectorAll('.dashboard-metric');
          const chartBars = beat.querySelectorAll('.chart-bars i');
          const dashboardStatus = beat.querySelector('.dashboard-status');
          const aiPrompt = beat.querySelector('.ai-prompt');
          const aiPromptText = beat.querySelector('.ai-prompt p');
          const aiThinking = beat.querySelector('.ai-thinking');
          const aiThinkingDots = beat.querySelectorAll('.ai-thinking i');
          const aiResponse = beat.querySelector('.ai-response');
          const aiResponseLines = beat.querySelectorAll('.ai-response-line');
          const aiTags = beat.querySelector('.ai-tags');
          const aiSpark = beat.querySelector('.ai-spark');
          const workflowSteps = beat.querySelectorAll('.workflow-step');
          const workflowConnectors = beat.querySelectorAll(
            '.workflow-connector i',
          );
          const workflowChecks = beat.querySelectorAll('.workflow-check');
          const workflowFooter = beat.querySelector('.workflow-footer');

          timeline.fromTo(
            art,
            { autoAlpha: 0, y: 16, scale: 0.98 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.34,
              ease: 'power2.out',
            },
            position,
          );

          if (metrics.length) {
            timeline.fromTo(
              metrics,
              { autoAlpha: 0, y: 14 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.28,
                stagger: 0.12,
                ease: 'power2.out',
              },
              position + 0.18,
            );
            timeline.fromTo(
              chartBars,
              { scaleY: 0 },
              {
                scaleY: 1,
                duration: 0.32,
                stagger: 0.05,
                ease: 'power3.out',
              },
              position + 0.38,
            );
            timeline.fromTo(
              dashboardStatus,
              { autoAlpha: 0, x: 12 },
              {
                autoAlpha: 1,
                x: 0,
                duration: 0.25,
                ease: 'power2.out',
              },
              position + 0.48,
            );
          }

          if (aiPrompt) {
            timeline.fromTo(
              aiSpark,
              { autoAlpha: 0, scale: 0.55, rotation: -70 },
              {
                autoAlpha: 1,
                scale: 1,
                rotation: 0,
                duration: 0.32,
                ease: 'back.out(1.7)',
              },
              position + 0.08,
            );
            timeline.fromTo(
              aiPrompt,
              { autoAlpha: 0, x: 22 },
              {
                autoAlpha: 1,
                x: 0,
                duration: 0.32,
                ease: 'power2.out',
              },
              position + 0.2,
            );
            timeline.fromTo(
              aiPromptText,
              { clipPath: 'inset(0 100% 0 0)' },
              {
                clipPath: 'inset(0 0% 0 0)',
                duration: 0.4,
                ease: 'power1.out',
              },
              position + 0.36,
            );
            timeline.set(
              aiThinking,
              { display: 'flex', autoAlpha: 0 },
              position + 0.82,
            );
            timeline.fromTo(
              aiThinking,
              { autoAlpha: 0, y: 6 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.2,
                ease: 'power2.out',
              },
              position + 0.82,
            );
            timeline.fromTo(
              aiThinkingDots,
              { autoAlpha: 0.35, scale: 0.7 },
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.22,
                stagger: 0.13,
                ease: 'power1.out',
              },
              position + 0.9,
            );
            timeline.to(
              aiThinking,
              {
                autoAlpha: 0,
                y: -4,
                duration: 0.18,
                ease: 'power1.in',
              },
              position + 1.55,
            );
            timeline.set(
              aiThinking,
              { display: 'none' },
              position + 1.74,
            );
            timeline.fromTo(
              aiResponse,
              { autoAlpha: 0, y: 8 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.24,
                ease: 'power2.out',
              },
              position + 1.72,
            );
            timeline.fromTo(
              aiResponseLines,
              {
                autoAlpha: 0,
                y: 8,
                clipPath: 'inset(0 0 100% 0)',
              },
              {
                autoAlpha: 1,
                y: 0,
                clipPath: 'inset(0 0 0% 0)',
                duration: 0.34,
                stagger: 0.4,
                ease: 'power2.out',
              },
              position + 1.94,
            );
            timeline.fromTo(
              aiTags,
              { autoAlpha: 0, y: 8 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.24,
                ease: 'power2.out',
              },
              position + 3.12,
            );
          }

          if (workflowSteps.length) {
            timeline.fromTo(
              workflowSteps,
              { autoAlpha: 0, x: -14 },
              {
                autoAlpha: 1,
                x: 0,
                duration: 0.24,
                stagger: 0.22,
                ease: 'power2.out',
              },
              position + 0.14,
            );
            timeline.fromTo(
              workflowConnectors,
              { scaleY: 0 },
              {
                scaleY: 1,
                duration: 0.22,
                stagger: 0.22,
                ease: 'power1.out',
              },
              position + 0.32,
            );
            timeline.fromTo(
              workflowChecks,
              { scale: 0 },
              {
                scale: 1,
                duration: 0.2,
                stagger: 0.22,
                ease: 'back.out(1.8)',
              },
              position + 0.34,
            );
            timeline.fromTo(
              workflowFooter,
              { autoAlpha: 0, y: 8 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.2,
                ease: 'power2.out',
              },
              position + 0.9,
            );
          }
        };

        const updateProgress = (index) => {
          progressCurrent.textContent = String(index + 1).padStart(2, '0');
          gsap.to(progressFill, {
            scaleX: (index + 1) / creativeBeats.length,
            duration: 0.35,
            overwrite: true,
            ease: 'power2.out',
          });
        };

        if (isDesktop) {
          const transitionPoints = [2, 6.5];
          const slideDuration = 9;

          creativeSection.classList.add('has-scroll-slides');
          gsap.set(creativeBeats, { autoAlpha: 0, y: 32, scale: 0.98 });
          gsap.set(creativeBeats[0], { autoAlpha: 1, y: 0, scale: 1 });

          const slideTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: creativeBeatsContainer,
              start: 'top top+=88',
              end: () =>
                `+=${window.innerHeight * (creativeBeats.length + 1.5)}`,
              pin: true,
              scrub: 1.1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const timelinePosition = self.progress * slideDuration;
                const index = transitionPoints.filter(
                  (point) => timelinePosition >= point,
                ).length;
                progressCurrent.textContent = String(index + 1).padStart(
                  2,
                  '0',
                );
                gsap.set(progressFill, {
                  scaleX:
                    (1 + self.progress * (creativeBeats.length - 1)) /
                    creativeBeats.length,
                });
              },
            },
          });

          addArtworkAnimations(slideTimeline, creativeBeats[0], 0.12);

          creativeBeats.slice(1).forEach((beat, index) => {
            const previousBeat = creativeBeats[index];
            const transitionAt = transitionPoints[index];

            slideTimeline.to(
              previousBeat,
              {
                autoAlpha: 0,
                y: -40,
                scale: 0.98,
                duration: 0.48,
                ease: 'power2.inOut',
              },
              transitionAt,
            );
            slideTimeline.fromTo(
              beat,
              { autoAlpha: 0, y: 48, scale: 0.98 },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.58,
                ease: 'power2.out',
              },
              transitionAt + 0.04,
            );
            addArtworkAnimations(
              slideTimeline,
              beat,
              transitionAt + 0.64,
            );
          });

          slideTimeline.to(
            {},
            {
              duration: Math.max(
                0,
                slideDuration - slideTimeline.duration(),
              ),
              ease: 'none',
            },
            slideTimeline.duration(),
          );
        } else {
          creativeBeats.forEach((beat, index) => {
            gsap.fromTo(
              beat,
              { autoAlpha: 0, y: 24 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.65,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: beat,
                  start: 'top 86%',
                  toggleActions: 'play none none reverse',
                },
              },
            );

            const artworkTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: beat,
                start: 'top 82%',
                end: 'center 45%',
                scrub: 0.6,
              },
            });
            addArtworkAnimations(artworkTimeline, beat, 0);

            ScrollTrigger.create({
              trigger: beat,
              start: 'top center',
              end: 'bottom center',
              onEnter: () => updateProgress(index),
              onEnterBack: () => updateProgress(index),
            });
          });
        }

        return () => {
          creativeSection.classList.remove('has-scroll-slides');
        };
      },
    );
  }

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
