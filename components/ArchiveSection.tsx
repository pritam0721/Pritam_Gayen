"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getImagePlaceholder } from "./image-placeholder";

export default function ArchiveSection() {
  return (
    <motion.section className="section padding-y padding-x theme-light" id="theme-trigger-light"
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
            <div className="archive-grid">
              <div className="grid-col" data-speed="1.2">
                <a className="img-mask ar-square hover-scale hover-target" href="#">
                  <Image
                    loading="lazy"
                    src={getImagePlaceholder(900, 900)} unoptimized
                    className="img-parallax"
                    alt="MERN e-commerce platform"
                    width={900}
                    height={900}
                    sizes="(max-width: 760px) 100vw, 33vw"
                  />
                </a>
                <a className="img-mask ar-portrait hover-scale hover-target" href="#">
                  <Image
                    loading="lazy"
                    src={getImagePlaceholder(800, 1200)} unoptimized
                    className="img-parallax"
                    alt="Collaborative code editor"
                    width={800}
                    height={1200}
                    sizes="(max-width: 760px) 100vw, 33vw"
                  />
                </a>
              </div>
              <div className="grid-col" data-speed="0.85">
                <a className="img-mask ar-portrait hover-scale hover-target" href="#">
                  <Image
                    loading="lazy"
                    src={getImagePlaceholder(800, 1200)} unoptimized
                    className="img-parallax"
                    alt="1Stop Booking backend"
                    width={800}
                    height={1200}
                    sizes="(max-width: 760px) 100vw, 33vw"
                  />
                </a>
                <a className="img-mask ar-square hover-scale hover-target" href="#">
                  <Image
                    loading="lazy"
                    src={getImagePlaceholder(900, 900)} unoptimized
                    className="img-parallax"
                    alt="Technical blog"
                    width={900}
                    height={900}
                    sizes="(max-width: 760px) 100vw, 33vw"
                  />
                </a>
              </div>
              <div className="grid-col" data-speed="1.1">
                <a className="img-mask ar-square hover-scale hover-target" href="#">
                  <Image
                    loading="lazy"
                    src={getImagePlaceholder(900, 900)} unoptimized
                    className="img-parallax"
                    alt="Open-source contributions"
                    width={900}
                    height={900}
                    sizes="(max-width: 760px) 100vw, 33vw"
                  />
                </a>
                <a className="img-mask ar-portrait hover-scale hover-target" href="#">
                  <Image
                    loading="lazy"
                    src={getImagePlaceholder(800, 1200)} unoptimized
                    className="img-parallax"
                    alt="Hackathon project"
                    width={800}
                    height={1200}
                    sizes="(max-width: 760px) 100vw, 33vw"
                  />
                </a>
              </div>
            </div>
          </motion.section>
  );
}
