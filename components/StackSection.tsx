"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getImagePlaceholder } from "./image-placeholder";
import styles from "./StackSection.module.css";

export default function StackSection() {
  return (
    <motion.section className="section s-list theme-dark padding-y padding-x" id="theme-trigger-dark"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
            <span id="stack"></span>
            <div className="t-caption text-accent mb-10 gs-fade text-center">
              {"\n        What I work with\n      "}
            </div>
            <div className="list-wrap" id="hover-list">
              <div className="l-item hover-trigger" data-idx="0">
                <h3 className="t-h1 l-title">
                  {"Front end"}
                </h3>
                <span className="t-caption">
                  {"React, Next.js, TypeScript, HTML/CSS"}
                </span>
              </div>
              <div className="l-item hover-trigger" data-idx="1">
                <h3 className="t-h1 l-title">
                  {"Back end"}
                </h3>
                <span className="t-caption">
                  {"Python, Frappe, Node.js, Express, REST"}
                </span>
              </div>
              <div className="l-item hover-trigger" data-idx="2">
                <h3 className="t-h1 l-title">
                  {"Data"}
                </h3>
                <span className="t-caption">
                  {"MariaDB, MongoDB, Redis, SQL"}
                </span>
              </div>
              <div className="l-item hover-trigger" data-idx="3">
                <h3 className="t-h1 l-title">
                  {"Deploy and secure"}
                </h3>
                <span className="t-caption">
                  {"Docker, CI/CD, AWS, Linux hardening"}
                </span>
              </div>
              <div className="l-item hover-trigger" data-idx="4">
                <h3 className="t-h1 l-title">
                  {"AI"}
                </h3>
                <span className="t-caption">
                  {"LangChain (learning), agentic workflows, Copilot"}
                </span>
              </div>
            </div>
            <div className={styles.cursorImageFollower} id="cursor-gallery">
              <div className={styles.imageInner}>
                <Image
                  src={getImagePlaceholder(800, 600)} unoptimized
                  className={`${styles.image} ${styles.active}`}
                  alt="Front end code"
                  width={800}
                  height={600}
                  sizes="25vw"
                />
                <Image
                  src={getImagePlaceholder(800, 600)} unoptimized
                  className={styles.image}
                  alt="Back end code"
                  width={800}
                  height={600}
                  sizes="25vw"
                />
                <Image
                  src={getImagePlaceholder(800, 600)} unoptimized
                  className={styles.image}
                  alt="Database schema"
                  width={800}
                  height={600}
                  sizes="25vw"
                />
                <Image
                  src={getImagePlaceholder(800, 600)} unoptimized
                  className={styles.image}
                  alt="Terminal on the server"
                  width={800}
                  height={600}
                  sizes="25vw"
                />
                <Image
                  src={getImagePlaceholder(800, 600)} unoptimized
                  className={styles.image}
                  alt="Agent workflow diagram"
                  width={800}
                  height={600}
                  sizes="25vw"
                />
              </div>
            </div>
          </motion.section>
  );
}
