"use client";

import { motion } from "framer-motion";

export default function MarqueeSection() {
  return (
    <motion.section className="section theme-dark s-marquee"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
            <div className="marquee-wrap">
              <h1 className="marquee-text">
                {"\n          PYTHON ✦ REACT ✦ TYPESCRIPT ✦ DOCKER ✦ LINUX ✦\n        "}
              </h1>
              <h1 className="marquee-text">
                {"\n          PYTHON ✦ REACT ✦ TYPESCRIPT ✦ DOCKER ✦ LINUX ✦\n        "}
              </h1>
              <h1 className="marquee-text">
                {"\n          PYTHON ✦ REACT ✦ TYPESCRIPT ✦ DOCKER ✦ LINUX ✦\n        "}
              </h1>
            </div>
          </motion.section>
  );
}
