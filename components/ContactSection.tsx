"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <motion.section className="section theme-light padding-x" id="contact" style={{ justifyContent: "flex-end", paddingBottom: "4vh", paddingTop: "15vh" }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
            <div className="text-center w-full" style={{ marginBottom: "15vh" }}>
              <h2 className="t-h2 split-words mb-4">
                {"\n          Have a system that needs building?\n        "}
              </h2>
              <h1 className="t-display split-words text-accent italic">
                {"Let's talk."}
              </h1>
              <p className="t-body mt-4">
                <a className="hover-target" href="mailto:pritamgayen629@gmail.com">
                  {"pritamgayen629@gmail.com"}
                </a>
              </p>
            </div>
            <footer className="w-full gs-fade" style={{ borderTop: "1px solid rgba(28, 26, 23, 0.15)", paddingTop: "2vw", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div className="t-caption text-muted">
                {"© 2026 Pritam Gayen"}
              </div>
              <div className="t-caption">
                <a className="hover-target" href="https://github.com/your-username">
                  {"GitHub"}
                </a>
                {"\n           \n          "}
                <a className="hover-target" href="https://linkedin.com/in/your-username">
                  {"LinkedIn"}
                </a>
                {"\n           \n          "}
                <a className="hover-target text-accent" href="/Pritam_Gayen_CV.pdf">
                  {"Resume"}
                </a>
              </div>
            </footer>
          </motion.section>
  );
}
