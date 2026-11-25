"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="section s-hero padding-x">
            <div className="hero-content">
              <div className="t-caption text-muted mb-4 gs-fade">
                {"\n          Full stack engineer\n        "}
              </div>
              <h1 className="t-display hero-title">
                {"I build systems"}
              </h1>
              <h1 className="t-display hero-title hero-line-offset">
                {"\n          that run the "}
                <span className="hero-image-letters">
                  {"business."}
                </span>
              </h1>
              <div className="hero-actions gs-fade">
                <motion.a
                  className="hero-action hero-action-primary"
                  href="#work"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 420, damping: 20 }}
                >
                  {"Explore my work"}
                </motion.a>
                <motion.a
                  className="hero-action hero-action-secondary"
                  href="#contact"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 420, damping: 20 }}
                >
                  {"Get in touch"}
                </motion.a>
              </div>
            </div>
            <div className="img-mask hero-img-box hover-scale hover-target" id="hero-img">
              <Image
                src="/hero.png"
                className="img-parallax"
                alt="Illustrated portrait of Pritam Gayen"
                width={2125}
                height={2125}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </section>
  );
}
