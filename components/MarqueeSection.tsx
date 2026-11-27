"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { gsap } from "gsap";
import { motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import styles from "./MarqueeSection.module.css";

const tools = [
  {
    name: "Python",
    does: "Automation and AI that handles the busywork",
    color: "#4b8bbe",
  },
  {
    name: "React",
    does: "Screens people actually enjoy using",
    color: "#61dafb",
  },
  {
    name: "TypeScript",
    does: "Safer code, fewer surprises",
    color: "#3178c6",
  },
  {
    name: "Docker",
    does: "Runs the same on every machine",
    color: "#2496ed",
  },
  { name: "Linux", does: "Servers that stay up", color: "#fcc624" },
  {
    name: "Frappe",
    does: "ERP, HR and CRM shaped around your business",
    color: "#e07b5a",
  },
  {
    name: "AI",
    does: "Assistants that read, sort and answer",
    color: "#98d85b",
  },
  {
    name: "Automation",
    does: "Routine work that runs itself",
    color: "#ffa00a",
  },
];

const COPIES = 3;

function Words({ clone = false }: { clone?: boolean }) {
  return (
    <div
      className={`${styles.mqGroup} ${clone ? styles.mqClone : ""}`}
      aria-hidden="true"
    >
      {tools.map((tool, index) => (
        <span className={styles.mqWordItem} key={tool.name}>
          <span
            className={`${styles.mqWord} ${index % 2 ? styles.isOutline : ""}`}
          >
            {tool.name}
          </span>
          <span className={styles.mqStar}>✦</span>
        </span>
      ))}
    </div>
  );
}

function Chips({ clone = false }: { clone?: boolean }) {
  return (
    <div
      className={`${styles.mqGroup} ${clone ? styles.mqClone : ""}`}
      aria-hidden="true"
    >
      {tools.map((tool) => (
        <span
          className={styles.mqChip}
          key={tool.name}
          style={{ "--c": tool.color } as CSSProperties}
        >
          <i />
          <b>{tool.name}</b>
          <span>{tool.does}</span>
        </span>
      ))}
    </div>
  );
}

export default function MarqueeSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const lenisRef = useRef(lenis);

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduce) return;

    type Row = {
      el: HTMLElement;
      x: number;
      w: number;
      base: number;
      dir: number;
    };

    const rows: Row[] = Array.from(
      root.querySelectorAll<HTMLElement>("[data-row]"),
    ).map((el) => ({
      el,
      x: 0,
      w: 0,
      base: Number(el.dataset.speed ?? 60),
      dir: Number(el.dataset.dir ?? 1),
    }));

    const measure = () => {
      rows.forEach((row) => {
        const group = row.el.querySelector<HTMLElement>(`.${styles.mqGroup}`);
        row.w = group ? group.offsetWidth : 0;
      });
    };
    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(root);
    if (document.fonts?.ready) void document.fonts.ready.then(measure);

    let inView = true;
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    intersectionObserver.observe(root);

    let flow = 1;

    const tick = (_time: number, deltaMs: number) => {
      if (!inView) return;

      const dt = Math.min(deltaMs, 64) / 1000;
      const currentLenis = lenisRef.current;
      const velocity = currentLenis ? Math.abs(currentLenis.velocity) : 0;
      if (currentLenis?.direction) {
        flow += (currentLenis.direction - flow) * 0.06;
      }
      const boost = 1 + Math.min(velocity * 0.35, 8);

      rows.forEach((row) => {
        if (!row.w) return;

        const paused =
          row.el.matches(":hover") ||
          row.el.contains(document.activeElement);
        const speed = paused ? 0 : row.base * boost * flow * row.dir;
        row.x -= speed * dt;
        if (row.x <= -row.w) row.x += row.w;
        if (row.x > 0) row.x -= row.w;
        row.el.style.transform = `translate3d(${row.x.toFixed(2)}px,0,0)`;
      });
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      rows.forEach((row) => {
        row.el.style.transform = "";
      });
    };
  }, [reduce]);

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.65, ease: "easeOut" as const, delay },
  });

  return (
    <motion.section
      ref={rootRef}
      className={`${styles.mq} ${reduce ? styles.mqStatic : ""}`}
      aria-label="Tools and technologies"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <div className={styles.mqHead}>
        <motion.span className={styles.mqEyebrow} {...fade(0)}>
          The toolbox
        </motion.span>
        <motion.h2 className={styles.mqTitle} {...fade(0.08)}>
          What I build with, <em>and what it does for you.</em>
        </motion.h2>
        <motion.p className={styles.mqLede} {...fade(0.16)}>
          You don&rsquo;t need to know these names. Each one is a tool I picked
          because it makes your software faster to build, easier to trust and
          cheaper to keep running.
        </motion.p>
      </div>

      <ul className={styles.mqSr}>
        {tools.map((tool) => (
          <li key={tool.name}>
            {tool.name}: {tool.does}
          </li>
        ))}
      </ul>

      <div className={styles.mqRows}>
        <div className={styles.mqMask}>
          <div className={styles.mqTrack} data-row data-speed="70" data-dir="1">
            {Array.from({ length: COPIES }, (_, index) => (
              <Words key={index} clone={index > 0} />
            ))}
          </div>
        </div>
        <div className={styles.mqMask}>
          <div
            className={`${styles.mqTrack} ${styles.mqTrackChips}`}
            data-row
            data-speed="46"
            data-dir="-1"
          >
            {Array.from({ length: COPIES }, (_, index) => (
              <Chips key={index} clone={index > 0} />
            ))}
          </div>
        </div>
      </div>

      <motion.p className={styles.mqFoot} {...fade(0.1)}>
        Hover a row to pause it. Scroll to speed it up.
      </motion.p>
    </motion.section>
  );
}
