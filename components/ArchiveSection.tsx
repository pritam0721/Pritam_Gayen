"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { getImagePlaceholder } from "./image-placeholder";
import styles from "./ArchiveSection.module.css";

export default function ArchiveSection() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });
  const firstColumnY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const secondColumnY = useTransform(scrollYProgress, [0, 1], [0, -127.5]);
  const thirdColumnY = useTransform(scrollYProgress, [0, 1], [0, -165]);

  return (
    <motion.section className={`${styles.section} ${styles.paddingY} ${styles.paddingX} theme-light`} id="theme-trigger-light"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
            <div className="flex-center w-full mx-auto" style={{ marginBottom: "8vh", maxWidth: "900px" }}>
              <div className="t-caption text-accent mb-6 gs-fade">
                {"More work"}
              </div>
              <h2 className="t-body-lg gs-fade" style={{ textAlign: "center", fontSize: "clamp(1.5rem, 3vw, 3rem)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
                {"\n          Side projects, internship work and open source.\n        "}
              </h2>
            </div>
            <div className={styles.grid} ref={gridRef}>
              <motion.div className={styles.column} style={{ y: firstColumnY }}>
                <motion.a className={`${styles.imageMask} ${styles.square} ${styles.hoverScale} hover-target`} href="#"
                  initial={{ clipPath: "inset(100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0 0)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Image
                    loading="lazy"
                    src={getImagePlaceholder(900, 900)} unoptimized
                    className={styles.imageParallax}
                    alt="MERN e-commerce platform"
                    width={900}
                    height={900}
                    sizes="(max-width: 1024px) 90vw, 28vw"
                  />
                </motion.a>
                <motion.a className={`${styles.imageMask} ${styles.portrait} ${styles.hoverScale} hover-target`} href="#"
                  initial={{ clipPath: "inset(100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0 0)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Image
                    loading="lazy"
                    src={getImagePlaceholder(800, 1200)} unoptimized
                    className={styles.imageParallax}
                    alt="Collaborative code editor"
                    width={800}
                    height={1200}
                    sizes="(max-width: 1024px) 90vw, 28vw"
                  />
                </motion.a>
              </motion.div>
              <motion.div className={styles.column} style={{ y: secondColumnY }}>
                <motion.a className={`${styles.imageMask} ${styles.portrait} ${styles.hoverScale} hover-target`} href="#"
                  initial={{ clipPath: "inset(100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0 0)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Image
                    loading="lazy"
                    src={getImagePlaceholder(800, 1200)} unoptimized
                    className={styles.imageParallax}
                    alt="1Stop Booking backend"
                    width={800}
                    height={1200}
                    sizes="(max-width: 1024px) 90vw, 28vw"
                  />
                </motion.a>
                <motion.a className={`${styles.imageMask} ${styles.square} ${styles.hoverScale} hover-target`} href="#"
                  initial={{ clipPath: "inset(100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0 0)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Image
                    loading="lazy"
                    src={getImagePlaceholder(900, 900)} unoptimized
                    className={styles.imageParallax}
                    alt="Technical blog"
                    width={900}
                    height={900}
                    sizes="(max-width: 1024px) 90vw, 28vw"
                  />
                </motion.a>
              </motion.div>
              <motion.div className={styles.column} style={{ y: thirdColumnY }}>
                <motion.a className={`${styles.imageMask} ${styles.square} ${styles.hoverScale} hover-target`} href="#"
                  initial={{ clipPath: "inset(100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0 0)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Image
                    loading="lazy"
                    src={getImagePlaceholder(900, 900)} unoptimized
                    className={styles.imageParallax}
                    alt="Open-source contributions"
                    width={900}
                    height={900}
                    sizes="(max-width: 1024px) 90vw, 28vw"
                  />
                </motion.a>
                <motion.a className={`${styles.imageMask} ${styles.portrait} ${styles.hoverScale} hover-target`} href="#"
                  initial={{ clipPath: "inset(100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0 0)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Image
                    loading="lazy"
                    src={getImagePlaceholder(800, 1200)} unoptimized
                    className={styles.imageParallax}
                    alt="Hackathon project"
                    width={800}
                    height={1200}
                    sizes="(max-width: 1024px) 90vw, 28vw"
                  />
                </motion.a>
              </motion.div>
            </div>
          </motion.section>
  );
}
