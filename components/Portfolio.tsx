"use client";

import { useEffect, useRef } from "react";
import { MotionConfig } from "framer-motion";
import { useLenis } from "lenis/react";
import initializePortfolio from "../app/portfolio-animations.js";
import HeroSection from "./HeroSection";
import CapabilitiesSection from "./CapabilitiesSection";
import ExpandSection from "./ExpandSection";
import CaseStudiesSection from "./CaseStudiesSection";
import StackSection from "./StackSection";
import MarqueeSection from "./MarqueeSection";
import ArchiveSection from "./ArchiveSection";
import ContactSection from "./ContactSection";

export default function Portfolio() {
  const pageRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!lenis && !prefersReducedMotion) return;

    return initializePortfolio(root, prefersReducedMotion ? undefined : lenis);
  }, [lenis]);

  return (
    <MotionConfig reducedMotion="user">
      <div ref={pageRef}>
      <div className="noise"></div>
      <div className="cursor-dot"></div>
      <div className="cursor-ring"></div>
      <div className="loader">
        <div className="k-container">
          <div className="t-caption text-muted mb-4">
            {"Brewing Creativity"}
          </div>
          <div className="kinetic-countdown">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <nav className="nav nav-auto-reveal" aria-label="Main navigation">
        <div className="nav-brand t-caption">
          {"Pritam Gayen"}
        </div>
        <div className="nav-links t-caption">
          <a href="#work">
            {"Work"}
          </a>
          <a href="#stack">
            {"Stack"}
          </a>
          <a href="#contact">
            {"Contact"}
          </a>
        </div>
      </nav>
        <main>
          <HeroSection />
          <CapabilitiesSection />
          <ExpandSection />
          <CaseStudiesSection />
          <MarqueeSection />
          <StackSection />
          <ArchiveSection />
          <ContactSection />
        </main>
      </div>
    </MotionConfig>
  );
}
