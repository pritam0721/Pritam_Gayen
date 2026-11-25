"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getImagePlaceholder } from "./image-placeholder";

export default function CaseStudiesSection() {
  return (
    <motion.section className="s-horiz theme-light" id="hz-trigger"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
            <span id="work"></span>
            <div className="horiz-track">
              <div className="h-panel">
                <div className="h-text">
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
                <div className="img-mask h-img hz-img hover-scale hover-target">
                  <Image
                    loading="lazy"
                    src={getImagePlaceholder(1200, 800)} unoptimized
                    className="img-parallax"
                    alt="ERP screenshot"
                    width={1200}
                    height={800}
                    sizes="(max-width: 760px) 100vw, 48vw"
                  />
                </div>
              </div>
              <div className="h-panel">
                <div className="h-text">
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
                <div className="img-mask h-img hz-img hover-scale hover-target">
                  <Image
                    loading="lazy"
                    src={getImagePlaceholder(1200, 800)} unoptimized
                    className="img-parallax"
                    alt="HR platform screenshot"
                    width={1200}
                    height={800}
                    sizes="(max-width: 760px) 100vw, 48vw"
                  />
                </div>
              </div>
              <div className="h-panel">
                <div className="h-text">
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
                <div className="img-mask h-img hz-img hover-scale hover-target">
                  <Image
                    loading="lazy"
                    src={getImagePlaceholder(1200, 800)} unoptimized
                    className="img-parallax"
                    alt="Jigsaw Compliance screenshot"
                    width={1200}
                    height={800}
                    sizes="(max-width: 760px) 100vw, 48vw"
                  />
                </div>
              </div>
            </div>
          </motion.section>
  );
}
