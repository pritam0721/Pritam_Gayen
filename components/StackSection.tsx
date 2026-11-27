"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import "./stack-section.css";

/* ------------------------------------------------------------------ */
/*  Content (edit freely)                                              */
/* ------------------------------------------------------------------ */

type Tech = {
  name: string;
  abbr: string;
  bg: string;
  fg?: string;
  hero?: boolean; // gets a floating tile in the scene (every tech still gets a pill)
  logo?: string;  // optional: URL/path of an official SVG logo, shown instead of the abbreviation
};

const stages: {
  key: string; label: string; kicker: string; title: [string, string];
  description: string; rgb: string; techs: Tech[];
}[] = [
  {
    key: "frontend", label: "Front end", kicker: "01 · Front end", rgb: "224,123,90",
    title: ["What people", "see and touch."],
    description:
      "The screens, buttons and pages your customers use every day, built to feel fast and look sharp on any device.",
    techs: [
      { name: "React", abbr: "Re", bg: "#61dafb", fg: "#14110f", hero: true },
      { name: "Next.js", abbr: "N", bg: "#111111", fg: "#ffffff", hero: true },
      { name: "TypeScript", abbr: "TS", bg: "#3178c6", fg: "#ffffff", hero: true },
      { name: "HTML/CSS", abbr: "</>", bg: "#e44d26", fg: "#ffffff", hero: true },
    ],
  },
  {
    key: "backend", label: "Back end & data", kicker: "02 · Back end & data", rgb: "94,100,255",
    title: ["The engine", "behind the screen."],
    description:
      "The logic, APIs and databases that store your information, answer every request and keep things running behind the scenes.",
    techs: [
      { name: "Python", abbr: "Py", bg: "#3776ab", fg: "#ffd43b", hero: true },
      { name: "Rust", abbr: "Rs", bg: "#f0ede8", fg: "#b7410e", hero: true },
      { name: "Node.js", abbr: "No", bg: "#3c873a", fg: "#ffffff", hero: true },
      { name: "PostgreSQL", abbr: "Pg", bg: "#336791", fg: "#ffffff", hero: true },
      { name: "MongoDB", abbr: "Mo", bg: "#47a248", fg: "#ffffff", hero: true },
      { name: "Redis", abbr: "Rd", bg: "#dc382d", fg: "#ffffff", hero: true },
      { name: "Express", abbr: "Ex", bg: "#444444", fg: "#ffffff" },
      { name: "REST", abbr: "API", bg: "#6c5ce7", fg: "#ffffff" },
      { name: "MariaDB", abbr: "Ma", bg: "#003545", fg: "#ffffff" },
      { name: "SQL", abbr: "SQL", bg: "#e9a23b", fg: "#14110f" },
      { name: "RAG", abbr: "RAG", bg: "#9b5cff", fg: "#ffffff" },
    ],
  },
  {
    key: "deploy", label: "Deploy & secure", kicker: "03 · Deploy & secure", rgb: "40,167,69",
    title: ["Shipped safely,", "every time."],
    description:
      "Automated pipelines test and release each change, containers run it the same everywhere, and hardened servers keep it safe.",
    techs: [
      { name: "Docker", abbr: "Dk", bg: "#2496ed", fg: "#ffffff", hero: true },
      { name: "Kubernetes", abbr: "K8s", bg: "#326ce5", fg: "#ffffff", hero: true },
      { name: "CI/CD", abbr: "CI", bg: "#6c5ce7", fg: "#ffffff", hero: true },
      { name: "AWS", abbr: "AWS", bg: "#ff9900", fg: "#14110f", hero: true },
      { name: "Linux hardening", abbr: "Lx", bg: "#fcc624", fg: "#14110f", hero: true },
    ],
  },
  {
    key: "ai", label: "AI & automation", kicker: "04 · AI & automation", rgb: "255,160,10",
    title: ["Work that", "runs itself."],
    description:
      "Assistants and workflows that read, decide and act, so repetitive work happens on its own. Currently going deeper on LangChain.",
    techs: [
      { name: "LangChain (learning)", abbr: "LC", bg: "#1c7c54", fg: "#ffffff", hero: true },
      { name: "Agentic workflows", abbr: "AI", bg: "#9b5cff", fg: "#ffffff", hero: true },
      { name: "n8n", abbr: "n8n", bg: "#ea4b71", fg: "#ffffff", hero: true },
    ],
  },
];

// Where the floating tiles sit (percent of the scene) and how big they are.
const SPOTS = [
  { l: 3, t: 8, s: 1 }, { l: 80, t: 6, s: 0.92 }, { l: 0, t: 66, s: 0.9 },
  { l: 84, t: 62, s: 1.05 }, { l: 44, t: 86, s: 0.82 }, { l: 62, t: -1, s: 0.75 },
];

/* ------------------------------------------------------------------ */
/*  Cute 2D scenes (SVG, three depth layers each)                      */
/* ------------------------------------------------------------------ */

const SCENES: Record<string, { back: ReactNode; mid: ReactNode; front: ReactNode; clip?: boolean }> = {
  frontend: {
    back: (
      <>
        <circle cx="90" cy="70" r="46" fill="#e07b5a" opacity=".18" />
        <circle cx="330" cy="224" r="60" fill="#7cd6fd" opacity=".12" />
        <path className="st-twinkle" d="M340 56l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="#fff" opacity=".8" />
      </>
    ),
    mid: (
      <g className="st-bob">
        <rect x="62" y="48" width="276" height="186" rx="14" fill="#fff" />
        <rect x="62" y="48" width="276" height="26" rx="14" fill="#ece9e4" />
        <rect x="62" y="60" width="276" height="14" fill="#ece9e4" />
        <circle cx="78" cy="61" r="4" fill="#e0715a" /><circle cx="92" cy="61" r="4" fill="#e6b94d" /><circle cx="106" cy="61" r="4" fill="#6cc08b" />
        <rect x="84" y="88" width="40" height="8" rx="4" fill="#ddd8d0" /><rect x="132" y="88" width="40" height="8" rx="4" fill="#ddd8d0" /><rect x="180" y="88" width="40" height="8" rx="4" fill="#ddd8d0" />
        <rect x="84" y="112" width="120" height="12" rx="6" fill="#1d1b18" />
        <rect x="84" y="132" width="90" height="12" rx="6" fill="#e07b5a" />
        <rect x="84" y="154" width="140" height="6" rx="3" fill="#cfcac2" /><rect x="84" y="166" width="118" height="6" rx="3" fill="#cfcac2" />
        <g className="st-button"><rect x="84" y="184" width="70" height="22" rx="11" fill="#e07b5a" /><rect x="100" y="193" width="38" height="4" rx="2" fill="#fff" /></g>
        <rect x="236" y="108" width="84" height="70" rx="10" fill="#8fa89a" />
        <circle cx="262" cy="130" r="10" fill="#f0ede8" />
        <path d="M236 178l32-32 24 20 14-14 14 16v10z" fill="#6f8a7b" />
        <rect x="236" y="188" width="24" height="34" rx="6" fill="#f4f1ea" /><rect x="264" y="188" width="24" height="34" rx="6" fill="#f4f1ea" /><rect x="292" y="188" width="24" height="34" rx="6" fill="#f4f1ea" />
      </g>
    ),
    front: (
      <>
        <g className="st-cursor"><path d="M0 0v26l7-6 5 12 5-2-5-12h9z" fill="#1d1b18" stroke="#fff" strokeWidth="2" strokeLinejoin="round" /></g>
        <g className="st-bob st-d1"><circle cx="40" cy="196" r="8" fill="#e07b5a" /><circle cx="40" cy="220" r="8" fill="#7cd6fd" /><circle cx="40" cy="244" r="8" fill="#98d85b" /></g>
        <g className="st-bob st-d2"><rect x="292" y="30" width="72" height="30" rx="10" fill="#1d1b18" /><text x="328" y="51" textAnchor="middle" fontSize="15" fontWeight="700" fontFamily="monospace" fill="#98d85b">{"</>"}</text></g>
      </>
    ),
  },

  backend: {
    clip: false,
    back: (
      <>
        <ellipse cx="90" cy="52" rx="40" ry="13" fill="#fff" opacity=".1" /><ellipse cx="320" cy="40" rx="34" ry="11" fill="#fff" opacity=".08" />
        <circle cx="330" cy="236" r="54" fill="#5e64ff" opacity=".14" />
      </>
    ),
    mid: (
      <g className="st-bob">
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="40" y={70 + i * 52} width="150" height="42" rx="10" fill="#2a2622" stroke="#3d3832" />
            <circle className={`st-led st-d${i}`} cx="58" cy={91 + i * 52} r="4.5" fill={i === 1 ? "#ffa00a" : "#98d85b"} />
            <rect x="76" y={85 + i * 52} width="92" height="6" rx="3" fill="#3d3832" /><rect x="76" y={96 + i * 52} width="60" height="4" rx="2" fill="#3d3832" />
          </g>
        ))}
        <g>
          <ellipse cx="300" cy="122" rx="48" ry="14" fill="#4a50d9" /><rect x="252" y="82" width="96" height="40" fill="#5e64ff" /><ellipse cx="300" cy="82" rx="48" ry="14" fill="#8a90ff" />
          <ellipse cx="300" cy="188" rx="48" ry="14" fill="#4a50d9" /><rect x="252" y="148" width="96" height="40" fill="#7c85ff" /><ellipse cx="300" cy="148" rx="48" ry="14" fill="#a9afff" />
        </g>
        {["M190 91H252", "M190 143H252", "M190 195H252"].map((d, i) => (
          <g key={d}>
            <path d={d} stroke="#8a90ff" strokeWidth="2" strokeDasharray="4 5" fill="none" opacity=".7" />
            <circle className="st-packet" r="4.5" fill="#98d85b">
              <animateMotion dur="1.8s" begin={`${i * 0.6}s`} repeatCount="indefinite" path={d} />
            </circle>
          </g>
        ))}
      </g>
    ),
    front: (
      <>
        <g className="st-bob st-d1"><rect x="140" y="26" width="110" height="38" rx="11" fill="#fff" /><text x="195" y="51" textAnchor="middle" fontSize="15" fontWeight="700" fontFamily="monospace" fill="#1d1b18">{"{ api }"}</text></g>
        <g className="st-bob st-d2"><rect x="262" y="226" width="74" height="26" rx="13" fill="#28a745" /><text x="299" y="243" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">200 OK</text></g>
      </>
    ),
  },

  deploy: {
    clip: true,
    back: (
      <>
        <path d="M0 236Q100 196 200 236T400 236V300H0z" fill="#fff" opacity=".05" />
        <circle cx="70" cy="64" r="3" fill="#fff" className="st-twinkle" opacity=".8" /><circle cx="360" cy="150" r="2.5" fill="#fff" className="st-twinkle st-d1" opacity=".8" />
      </>
    ),
    mid: (
      <g>
        <rect x="14" y="204" width="372" height="20" rx="10" fill="#2a2622" />
        <line className="st-belt" x1="24" y1="214" x2="376" y2="214" stroke="#5a544c" strokeWidth="3" strokeDasharray="10 10" />
        <circle cx="32" cy="214" r="11" fill="#3d3832" stroke="#5a544c" strokeWidth="2" /><circle cx="368" cy="214" r="11" fill="#3d3832" stroke="#5a544c" strokeWidth="2" />
        {[["#2496ed", 0], ["#ffa00a", 2.6], ["#28a745", 5.2]].map(([c, d]) => (
          <g key={String(c)} className="st-box" style={{ animationDelay: `${-Number(d)}s` }}>
            <rect x="0" y="170" width="48" height="34" rx="6" fill={String(c)} />
            <path d="M12 170v34M24 170v34M36 170v34" stroke="#fff" strokeOpacity=".4" strokeWidth="2" />
          </g>
        ))}
        <g className="st-bob">
          <ellipse cx="300" cy="82" rx="46" ry="20" fill="#f0ede8" /><circle cx="272" cy="72" r="18" fill="#f0ede8" /><circle cx="312" cy="64" r="24" fill="#f0ede8" />
          <path className="st-check" d="M288 80l10 10 22-24" stroke="#28a745" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    ),
    front: (
      <>
        <g>
          <path d="M70 84h84" stroke="#f0ede8" strokeOpacity=".3" strokeWidth="3" />
          {["build", "test", "ship"].map((l, i) => (
            <g key={l}>
              <circle cx={70 + i * 42} cy="84" r="15" fill="#231f1b" stroke="#28a745" strokeWidth="2.5" />
              <path className="st-tick" style={{ animationDelay: `${i * 0.9}s` }} d={`M${63 + i * 42} 84l5 5 9-10`} stroke="#98d85b" strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <text x={70 + i * 42} y="113" textAnchor="middle" fontSize="10" fill="#f0ede8" opacity=".7">{l}</text>
            </g>
          ))}
        </g>
        <g transform="translate(336 150)" className="st-bob st-d1">
          <path d="M0 -28L24 -19V4C24 19 11 28 0 33C-11 28 -24 19 -24 4V-19Z" fill="#28a745" />
          <path d="M-10 2L-2 10L12 -7" stroke="#fff" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </>
    ),
  },

  ai: {
    clip: false,
    back: (
      <>
        <circle className="st-spin" cx="70" cy="232" r="26" fill="none" stroke="#ffa00a" strokeOpacity=".3" strokeWidth="10" strokeDasharray="8.2 8.2" />
        <circle className="st-spin st-rev" cx="338" cy="66" r="20" fill="none" stroke="#9b5cff" strokeOpacity=".3" strokeWidth="8" strokeDasharray="6.3 6.3" />
      </>
    ),
    mid: (
      <g className="st-bob">
        {[["M84 104H150", 40, 90], ["M84 176H165", 40, 162], ["M250 104H316", 316, 90], ["M235 176H316", 316, 162]].map(([d, x, y], i) => (
          <g key={String(d)}>
            <path d={String(d)} stroke="#ffa00a" strokeWidth="2" strokeDasharray="4 5" fill="none" opacity=".6" />
            <rect x={Number(x)} y={Number(y)} width="44" height="30" rx="9" fill="#fff" />
            <rect x={Number(x) + 9} y={Number(y) + 10} width="26" height="4" rx="2" fill="#ddd8d0" /><rect x={Number(x) + 9} y={Number(y) + 18} width="16" height="4" rx="2" fill="#ffa00a" />
            <circle className="st-packet" r="4.5" fill="#ffa00a"><animateMotion dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={String(d)} /></circle>
          </g>
        ))}
        <line x1="200" y1="70" x2="200" y2="52" stroke="#f0ede8" strokeWidth="3" /><circle className="st-ant" cx="200" cy="46" r="6" fill="#ffa00a" />
        <rect x="140" y="96" width="10" height="24" rx="5" fill="#e07b5a" /><rect x="250" y="96" width="10" height="24" rx="5" fill="#e07b5a" />
        <rect x="150" y="70" width="100" height="78" rx="24" fill="#f0ede8" /><rect x="162" y="84" width="76" height="48" rx="16" fill="#231f1b" />
        <circle className="st-eye" cx="184" cy="106" r="7" fill="#98d85b" /><circle className="st-eye" cx="216" cy="106" r="7" fill="#98d85b" />
        <path d="M190 122Q200 130 210 122" stroke="#98d85b" strokeWidth="3" fill="none" strokeLinecap="round" />
        <rect x="165" y="152" width="70" height="52" rx="18" fill="#e07b5a" /><circle cx="200" cy="178" r="8" fill="#f0ede8" />
        <rect x="140" y="160" width="16" height="38" rx="8" fill="#f0ede8" /><rect className="st-wave" x="244" y="160" width="16" height="38" rx="8" fill="#f0ede8" />
      </g>
    ),
    front: (
      <>
        <g className="st-bob st-d1"><rect x="262" y="26" width="76" height="30" rx="10" fill="#fff" /><text x="300" y="46" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1d1b18">Done ✓</text></g>
        <path className="st-twinkle" d="M60 60l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#ffa00a" />
        <path className="st-twinkle st-d1" d="M350 250l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#fff" opacity=".8" />
      </>
    ),
  },
};

/* ------------------------------------------------------------------ */
/*  Building blocks                                                    */
/* ------------------------------------------------------------------ */

function Layer({ depth, z, children }: { depth: number; z: number; children: ReactNode }) {
  return (
    <div className="st-layer" style={{ "--p": depth, zIndex: z } as CSSProperties}>
      <div className="st-drift" data-drift={depth}>{children}</div>
    </div>
  );
}

function Svg({ children, clip }: { children: ReactNode; clip?: boolean }) {
  return (
    <svg viewBox="0 0 400 300" className={`st-svg ${clip ? "is-clip" : ""}`} aria-hidden="true">
      {children}
    </svg>
  );
}

function Tile({ tech, spot, index }: { tech: Tech; spot: (typeof SPOTS)[number]; index: number }) {
  const style = {
    left: `${spot.l}%`, top: `${spot.t}%`, "--s": spot.s,
    "--dur": `${3.4 + (index % 3) * 0.6}s`, "--delay": `${-index * 0.7}s`,
    "--fg": tech.fg ?? "#fff", zIndex: 3 + (index % 2) * 2,
  } as CSSProperties;
  return (
    <div className="st-tile" data-tile style={style}>
      <div className="st-float">
        <div className="st-tile-in" style={{ background: tech.bg }}>
          <span className="st-eyes"><i /><i /></span>
          {tech.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={tech.logo} alt="" className="st-logo" />
          ) : (
            <b className="st-abbr">{tech.abbr}</b>
          )}
          <span className="st-smile" />
        </div>
      </div>
      <span className="st-name">{tech.name}</span>
    </div>
  );
}

function Scene({ stage }: { stage: (typeof stages)[number] }) {
  const art = SCENES[stage.key];
  const heroes = stage.techs.filter((t) => t.hero);

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", String(((e.clientX - r.left) / r.width - 0.5) * 2));
    e.currentTarget.style.setProperty("--my", String(((e.clientY - r.top) / r.height - 0.5) * 2));
  };
  const leave = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--mx", "0");
    e.currentTarget.style.setProperty("--my", "0");
  };

  return (
    <div className="st-dash" data-scene style={{ "--ac-rgb": stage.rgb } as CSSProperties}>
      <div className="st-scene" onPointerMove={move} onPointerLeave={leave}>
        <div className="st-ground" />
        <Layer depth={0.5} z={1}><Svg>{art.back}</Svg></Layer>
        <Layer depth={1.1} z={2}><Svg clip={art.clip}>{art.mid}</Svg></Layer>
        <Layer depth={1.8} z={3}>
          <div className="st-tiles">
            {heroes.map((t, i) => <Tile key={t.name} tech={t} spot={SPOTS[i]} index={i} />)}
          </div>
        </Layer>
        <Layer depth={2.6} z={4}><Svg>{art.front}</Svg></Layer>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

const q = <T extends Element = HTMLElement>(sel: string, root: Element) =>
  gsap.utils.toArray<T>(sel, root);

export default function StackSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const lenis = useLenis();

  // Keep ScrollTrigger in step with Lenis (harmless if you already do this elsewhere)
  useEffect(() => {
    if (!lenis) return;
    gsap.registerPlugin(ScrollTrigger);
    const sync = () => ScrollTrigger.update();
    lenis.on("scroll", sync);
    return () => lenis.off("scroll", sync);
  }, [lenis]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduce) return;

    let context: gsap.Context | undefined;
    const frame = window.requestAnimationFrame(() => {
      if (!section.isConnected) return;
      gsap.registerPlugin(ScrollTrigger);
      section.dataset.st = "on"; // switches CSS from the static stack to the pinned stage

      context = gsap.context(() => {
        const copies = q("[data-copy]", section);
        const scenes = q("[data-scene]", section);
        const glows = q("[data-glow]", section);
        const steps = q("[data-step]", section);
        const fills = q("[data-fill]", section);
        const count = q("[data-counter]", section)[0];
        if (copies.length !== stages.length || scenes.length !== stages.length) return;

        const L = 6; // timeline units per stage
        gsap.set(glows[0], { opacity: 1 });
        gsap.set(steps[0], { opacity: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * 6}`,
            pin: section,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        scenes.forEach((scene, i) => {
          const copy = copies[i];
          const t0 = i * L;
          const last = i === scenes.length - 1;
          const kids = q("[data-k],[data-t],[data-d]", copy);
          const pills = q("[data-pill]", copy);
          const tiles = q("[data-tile]", scene);
          const drifts = q("[data-drift]", scene);

          // ---- Enter: scene swings in from depth, copy rises, glow fades up
          if (i > 0) {
            const at = t0 - 0.3;
            tl.fromTo(scene, { autoAlpha: 0, y: 90, rotationY: -18, scale: 0.93 },
              { autoAlpha: 1, y: 0, rotationY: 0, scale: 1, duration: 0.9 }, at);
            tl.fromTo(copy, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, at);
            tl.fromTo(kids, { y: 32, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1 }, at);
            tl.fromTo(glows[i], { opacity: 0 }, { opacity: 1, duration: 0.9 }, at);
            tl.to(count, { yPercent: -(100 / stages.length) * i, duration: 0.5 }, at);
          }

          // ---- Little logo tiles pop in one by one, pills follow
          tl.fromTo(tiles, { scale: 0, rotation: -30, autoAlpha: 0 },
            { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.6, ease: "back.out(2.2)", stagger: 0.13 }, t0 + 0.5);
          tl.fromTo(pills, { y: 16, autoAlpha: 0, scale: 0.9 },
            { y: 0, autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(1.8)", stagger: 0.06 }, t0 + 0.7);

          // ---- Depth: each layer drifts at its own speed while you scroll through the stage
          tl.fromTo(drifts,
            { y: (_i: number, el: Element) => Number(el.getAttribute("data-drift")) * 14 },
            { y: (_i: number, el: Element) => Number(el.getAttribute("data-drift")) * -14, duration: L, ease: "none" },
            t0);

          // ---- Exit (the last stage stays)
          if (!last) {
            const out = t0 + L - 0.7;
            tl.to(scene, { autoAlpha: 0, y: -80, rotationY: 18, scale: 0.93, duration: 0.7, ease: "power2.in" }, out);
            tl.to(copy, { autoAlpha: 0, y: -34, duration: 0.5, ease: "power2.in" }, out);
            tl.to(glows[i], { opacity: 0, duration: 0.7 }, out);
            tl.to(steps[i], { opacity: 0.35, duration: 0.3 }, out);
          }

          // ---- Progress
          tl.fromTo(fills[i], { scaleY: 0 }, { scaleY: 1, duration: L, ease: "none" }, t0);
          if (i > 0) tl.to(steps[i], { opacity: 1, duration: 0.3 }, t0 - 0.3);
        });

        ScrollTrigger.refresh();
      }, section);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      context?.revert();
      delete section.dataset.st;
    };
  }, [reduce]);

  return (
    <motion.section
      ref={sectionRef}
      className="section s-list theme-dark st"
      id="theme-trigger-dark"
      aria-label="Tech stack"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <span id="stack" />

      <div className="st-wrap">
        <div className="st-top">
          <span className="st-caption">What I work with</span>
          <span className="st-count" aria-hidden>
            <span className="st-count-win"><span data-counter>{stages.map((_, i) => <i key={i}>0{i + 1}</i>)}</span></span>
            <span> / 0{stages.length}</span>
          </span>
        </div>

        {stages.map((s) => (
          <article className="st-slide" key={s.key}>
            <div className="st-copy-item" data-copy style={{ "--ac-rgb": s.rgb } as CSSProperties}>
              <span className="st-kicker" data-k><i />{s.kicker}</span>
              <h3 className="st-title" data-t>{s.title[0]} <em>{s.title[1]}</em></h3>
              <p className="st-desc" data-d>{s.description}</p>
              <ul className="st-pills">
                {s.techs.map((t) => (
                  <li key={t.name} className="st-pill" data-pill style={{ "--c": t.bg } as CSSProperties}>
                    <span className="st-pill-in"><i />{t.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Scene stage={s} />
          </article>
        ))}

        {stages.map((s) => (
          <div key={s.key} className="st-glow" data-glow style={{ "--ac-rgb": s.rgb } as CSSProperties} aria-hidden />
        ))}

        <div className="st-rail" aria-hidden>
          {stages.map((s) => (
            <div key={s.key} className="st-step" data-step>
              <i><b data-fill /></i>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}