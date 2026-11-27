"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { getImagePlaceholder } from "./image-placeholder";
import styles from "./CaseStudiesSection.module.css";

export default function CaseStudiesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const trackX = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6667%"]);

  return (
    <motion.section ref={sectionRef} className={`${styles.gallery} theme-light`} id="hz-trigger"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
            <span id="work"></span>
            <motion.div className={styles.track} style={{ x: trackX }}>
              <div className={styles.panel}>
                <div className={styles.text}>
                  <div className="t-caption text-accent mb-6 gs-fade">
                    {"Custom ERP"}
                  </div>
                  <h2 className="t-h2 split-words mb-6">
                    <span className="italic font-serif">
                      {"Company ERP."}
                    </span>
                  </h2>
                  <p className="t-body gs-fade">
                    {"\n              Built and deployed alone, front end and back end, on Python and\n              MariaDB. Includes an accounts module for daily journals,\n              expenses and miscellaneous transactions.\n            "}
                  </p>
                  <div className="t-caption text-muted gs-fade">
                    {"\n              Python / MariaDB / Linux\n            "}
                  </div>
                </div>
                <motion.div
                  className={`${styles.imageMask} ${styles.image} ${styles.hoverScale} hover-target`}
                  initial={{ clipPath: "inset(100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0 0)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Image
                    loading="lazy"
                    src={getImagePlaceholder(1200, 800)} unoptimized
                    className={styles.imageParallax}
                    alt="ERP screenshot"
                    width={1200}
                    height={800}
                    sizes="(max-width: 1024px) 90vw, 48vw"
                  />
                </motion.div>
              </div>
              <div className={styles.panel}>
                <div className={styles.text}>
                  <div className="t-caption text-accent mb-6 gs-fade">
                    {"\n              Employee platform\n            "}
                  </div>
                  <h2 className="t-h2 split-words mb-6">
                    <span className="italic font-serif">
                      {"Role-based HR."}
                    </span>
                  </h2>
                  <p className="t-body gs-fade">
                    {"\n              Built on Frappe/HRMS with a team of 2-3 engineers. HR runs\n              payroll, attendance and interviews, directors get an operations\n              dashboard, and employees download their own PF statements.\n            "}
                  </p>
                  <div className="t-caption text-muted gs-fade">
                    {"\n              Frappe / HRMS / Python\n            "}
                  </div>
                </div>
                <motion.div
                  className={`${styles.imageMask} ${styles.image} ${styles.hoverScale} hover-target`}
                  initial={{ clipPath: "inset(100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0 0)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Image
                    loading="lazy"
                    src={getImagePlaceholder(1200, 800)} unoptimized
                    className={styles.imageParallax}
                    alt="HR platform screenshot"
                    width={1200}
                    height={800}
                    sizes="(max-width: 1024px) 90vw, 48vw"
                  />
                </motion.div>
              </div>
              <div className={styles.panel}>
                <div className={styles.text}>
                  <div className="t-caption text-accent mb-6 gs-fade">
                    {"\n              Client platform\n            "}
                  </div>
                  <h2 className="t-h2 split-words mb-6">
                    <span className="italic font-serif">
                      {"Jigsaw Compliance."}
                    </span>
                  </h2>
                  <p className="t-body gs-fade">
                    {"\n              Technical build of an international platform for car finance\n              claims, delivered as the sole developer while coordinating with\n              larger teams. (Confirm you may name the client.)\n            "}
                  </p>
                  <div className="t-caption text-muted gs-fade">
                    {"\n              Full stack / Client delivery\n            "}
                  </div>
                </div>
                <motion.div
                  className={`${styles.imageMask} ${styles.image} ${styles.hoverScale} hover-target`}
                  initial={{ clipPath: "inset(100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0 0)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Image
                    loading="lazy"
                    src={getImagePlaceholder(1200, 800)} unoptimized
                    className={styles.imageParallax}
                    alt="Jigsaw Compliance screenshot"
                    width={1200}
                    height={800}
                    sizes="(max-width: 1024px) 90vw, 48vw"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.section>
  );
}
