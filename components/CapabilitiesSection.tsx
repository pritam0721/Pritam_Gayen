"use client";

import { motion } from "framer-motion";

export default function CapabilitiesSection() {
  return (
    <motion.section className="section s-creative theme-dark" aria-labelledby="creative-title"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
            <div className="creative-inner">
              <div className="creative-topline">
                <span className="t-caption">
                  {"Thoughtful systems, built around you"}
                </span>
                <div className="creative-progress" aria-hidden="true">
                  <span className="creative-progress-current">
                    {"01"}
                  </span>
                  <span className="creative-progress-track">
                    <span className="creative-progress-fill"></span>
                  </span>
                  <span>
                    {"03"}
                  </span>
                </div>
              </div>
              <div className="creative-intro">
                <h2 id="creative-title">
                  {"\n            More room for "}
                  <em>
                    {"the work"}
                  </em>
                  {" that matters.\n          "}
                </h2>
                <div className="creative-intro-aside">
                  <div className="systems-overview is-complete" role="group" aria-label="System capabilities overview">
                    <div className="systems-overview-header">
                      <span>
                        {"SYSTEM OVERVIEW"}
                      </span>
                      <span className="systems-overview-live">
                        <span className="systems-overview-status" aria-hidden="true">
                          <svg className="systems-overview-spinner" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="8"></circle>
                          </svg>
                          <svg className="systems-overview-check" viewBox="0 0 24 24" fill="none">
                            <path d="m5 12 4 4L19 6"></path>
                          </svg>
                        </span>
                        {"\n                  IN SYNC\n                "}
                      </span>
                    </div>
                    <div className="systems-map">
                      <svg className="systems-river" viewBox="0 0 100 470" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                        <defs>
                          <linearGradient id="systems-river-gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#d78c70"></stop>
                            <stop offset="25%" stopColor="#9bb9d0"></stop>
                            <stop offset="50%" stopColor="#c2a8d5"></stop>
                            <stop offset="75%" stopColor="#92b89a"></stop>
                            <stop offset="100%" stopColor="#e1b46c"></stop>
                          </linearGradient>
                        </defs>
                        <path className="systems-river-progress" d="M 15 48 C 80 48 85 86 85 142 C 85 198 20 180 15 235 C 10 290 80 272 85 329 C 90 386 20 366 15 422"></path>
                      </svg>
                      <div className="systems-node systems-node--web is-complete">
                        <span className="systems-node-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                            <path d="M3 9h18M7 6.5h.01M10 6.5h.01M7 13h4M7 16h7"></path>
                          </svg>
                        </span>
                        <span className="systems-node-copy">
                          <strong>
                            {"Custom websites"}
                          </strong>
                          <small>
                            {"Frontend + backend delivery"}
                          </small>
                        </span>
                        <span className="systems-node-status" aria-hidden="true">
                          <svg className="systems-status-spinner" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="8"></circle>
                          </svg>
                          <svg className="systems-status-check" viewBox="0 0 24 24" fill="none">
                            <path d="m5 12 4 4L19 6"></path>
                          </svg>
                        </span>
                      </div>
                      <div className="systems-node systems-node--saas systems-node--right is-complete">
                        <span className="systems-node-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none">
                            <path d="M7.5 18h9a4 4 0 0 0 .4-8A6 6 0 0 0 6 9a4.5 4.5 0 0 0 1.5 9Z"></path>
                            <circle cx="9" cy="14" r=".65"></circle>
                            <circle cx="12" cy="14" r=".65"></circle>
                            <circle cx="15" cy="14" r=".65"></circle>
                          </svg>
                        </span>
                        <span className="systems-node-copy">
                          <strong>
                            {"SaaS products"}
                          </strong>
                          <small>
                            {"Product flows, roles, and data"}
                          </small>
                        </span>
                        <span className="systems-node-status" aria-hidden="true">
                          <svg className="systems-status-spinner" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="8"></circle>
                          </svg>
                          <svg className="systems-status-check" viewBox="0 0 24 24" fill="none">
                            <path d="m5 12 4 4L19 6"></path>
                          </svg>
                        </span>
                      </div>
                      <div className="systems-node systems-node--ai is-complete">
                        <span className="systems-node-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none">
                            <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"></path>
                            <path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"></path>
                          </svg>
                        </span>
                        <span className="systems-node-copy">
                          <strong>
                            {"Practical AI"}
                          </strong>
                          <small>
                            {"Useful context, better decisions"}
                          </small>
                        </span>
                        <span className="systems-node-status" aria-hidden="true">
                          <svg className="systems-status-spinner" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="8"></circle>
                          </svg>
                          <svg className="systems-status-check" viewBox="0 0 24 24" fill="none">
                            <path d="m5 12 4 4L19 6"></path>
                          </svg>
                        </span>
                      </div>
                      <div className="systems-node systems-node--cicd systems-node--right is-complete">
                        <span className="systems-node-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none">
                            <circle cx="6" cy="6" r="2"></circle>
                            <circle cx="18" cy="18" r="2"></circle>
                            <circle cx="18" cy="6" r="2"></circle>
                            <path d="M8 6h4a4 4 0 0 1 4 4v6M6 8v8"></path>
                          </svg>
                        </span>
                        <span className="systems-node-copy">
                          <strong>
                            {"CI/CD pipelines"}
                          </strong>
                          <small>
                            {"Test, build, and ship confidently"}
                          </small>
                        </span>
                        <span className="systems-node-status" aria-hidden="true">
                          <svg className="systems-status-spinner" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="8"></circle>
                          </svg>
                          <svg className="systems-status-check" viewBox="0 0 24 24" fill="none">
                            <path d="m5 12 4 4L19 6"></path>
                          </svg>
                        </span>
                      </div>
                      <div className="systems-node systems-node--automation is-complete">
                        <span className="systems-node-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none">
                            <path d="M20 7v5h-5M4 17v-5h5"></path>
                            <path d="M5.5 9A7 7 0 0 1 18 6l2 2M4 16l2 2a7 7 0 0 0 12.5-3"></path>
                          </svg>
                        </span>
                        <span className="systems-node-copy">
                          <strong>
                            {"Quiet automation"}
                          </strong>
                          <small>
                            {"Repetitive steps run reliably"}
                          </small>
                        </span>
                        <span className="systems-node-status" aria-hidden="true">
                          <svg className="systems-status-spinner" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="8"></circle>
                          </svg>
                          <svg className="systems-status-check" viewBox="0 0 24 24" fill="none">
                            <path d="m5 12 4 4L19 6"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="systems-overview-footer">
                      <span>
                        {"CONNECTED CAPABILITIES"}
                      </span>
                      <span>
                        {"05 / 05 ACTIVE"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="creative-beats">
                <article className="creative-beat">
                  <div className="creative-copy">
                    <div className="creative-label">
                      <span>
                        {"01"}
                      </span>
                      {" Software"}
                    </div>
                    <h3>
                      {"Complex work, made "}
                      <em>
                        {"clear."}
                      </em>
                    </h3>
                    <p>
                      {"\n                Custom tools that bring your team's work, data, and decisions\n                into one considered place.\n              "}
                    </p>
                  </div>
                  <div className="capability-art capability-art-software" aria-hidden="true">
                    <div className="product-window">
                      <div className="product-window-bar">
                        <span className="window-lights">
                          <i></i>
                          <i></i>
                          <i></i>
                        </span>
                        <span className="product-window-label">
                          {"WORKSPACE / OVERVIEW"}
                        </span>
                        <span className="product-window-status">
                          <i></i>
                          {" LIVE"}
                        </span>
                      </div>
                      <div className="product-window-body">
                        <aside className="product-sidebar">
                          <span className="product-mark">
                            {"P."}
                          </span>
                          <i className="sidebar-item is-current"></i>
                          <i className="sidebar-item"></i>
                          <i className="sidebar-item"></i>
                          <i className="sidebar-item"></i>
                        </aside>
                        <div className="product-dashboard">
                          <div className="dashboard-heading">
                            <div>
                              <span>
                                {"Operations"}
                              </span>
                              <small>
                                {"MONDAY, 9:41 AM"}
                              </small>
                            </div>
                            <span className="dashboard-avatar">
                              {"PG"}
                            </span>
                          </div>
                          <div className="dashboard-metrics">
                            <div className="dashboard-metric">
                              <small>
                                {"In progress"}
                              </small>
                              <strong>
                                {"12"}
                              </strong>
                              <span>
                                {"Across 4 projects"}
                              </span>
                            </div>
                            <div className="dashboard-metric">
                              <small>
                                {"Completed"}
                              </small>
                              <strong>
                                {"86%"}
                              </strong>
                              <span>
                                {"This month"}
                              </span>
                            </div>
                          </div>
                          <div className="dashboard-lower">
                            <div className="dashboard-chart">
                              <span>
                                {"Project activity"}
                              </span>
                              <div className="chart-bars">
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                              </div>
                            </div>
                            <div className="dashboard-status">
                              <span>
                                {"Today"}
                              </span>
                              <strong>
                                {"All caught up"}
                              </strong>
                              <i></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
                <article className="creative-beat">
                  <div className="creative-copy">
                    <div className="creative-label">
                      <span>
                        {"02"}
                      </span>
                      {" Applied AI"}
                    </div>
                    <h3>
                      {"A sharper mind on "}
                      <em>
                        {"your team."}
                      </em>
                    </h3>
                    <p>
                      {"\n                Practical AI that understands the context of your work and\n                helps turn information into useful next steps.\n              "}
                    </p>
                  </div>
                  <div className="capability-art capability-art-ai" aria-hidden="true">
                    <div className="ai-window">
                      <div className="ai-window-heading">
                        <span className="ai-spark">
                          {"✶"}
                        </span>
                        <span>
                          {"WORKING NOTES "}
                          <small>
                            {"AI ASSISTANT"}
                          </small>
                        </span>
                        <i></i>
                      </div>
                      <div className="ai-prompt">
                        <small>
                          {"YOU · 9:42 AM"}
                        </small>
                        <p>
                          {"\n                    Can you summarize this week's feedback and suggest a next\n                    step?\n                  "}
                        </p>
                      </div>
                      <div className="ai-thinking" aria-hidden="true">
                        <span>
                          {"THINKING"}
                        </span>
                        <i></i>
                        <i></i>
                        <i></i>
                      </div>
                      <div className="ai-response">
                        <small>
                          <i></i>
                          {" A USEFUL SUMMARY"}
                        </small>
                        <p>
                          <span className="ai-response-line">
                            {"\n                      Customers appreciate the faster onboarding.\n                    "}
                          </span>
                          <span className="ai-response-line">
                            {"\n                      Several still want clearer progress updates.\n                    "}
                          </span>
                          <span className="ai-response-line">
                            {"\n                      Suggested next step: make progress visible at every\n                      stage.\n                    "}
                          </span>
                        </p>
                        <div className="ai-tags">
                          <span>
                            {"Onboarding"}
                          </span>
                          <span>
                            {"Next step: review updates"}
                          </span>
                        </div>
                      </div>
                      <div className="ai-composer">
                        <span>
                          {"Ask a follow-up…"}
                        </span>
                        <i>
                          {"↑"}
                        </i>
                      </div>
                    </div>
                    <span className="ai-orbit ai-orbit-one"></span>
                    <span className="ai-orbit ai-orbit-two"></span>
                  </div>
                </article>
                <article className="creative-beat">
                  <div className="creative-copy">
                    <div className="creative-label">
                      <span>
                        {"03"}
                      </span>
                      {" Automation"}
                    </div>
                    <h3>
                      {"Good work, moving "}
                      <em>
                        {"on its own."}
                      </em>
                    </h3>
                    <p>
                      {"\n                Reliable workflows that handle repetitive handoffs, so the\n                right work keeps moving—even when you step away.\n              "}
                    </p>
                  </div>
                  <div className="capability-art capability-art-automation" aria-hidden="true">
                    <div className="workflow-card">
                      <div className="workflow-heading">
                        <span>
                          {"ORDER WORKFLOW"}
                        </span>
                        <i>
                          {"···"}
                        </i>
                      </div>
                      <div className="workflow-step">
                        <span className="workflow-icon">
                          {"01"}
                        </span>
                        <span>
                          <strong>
                            {"New order received"}
                          </strong>
                          <small>
                            {"Storefront · Trigger"}
                          </small>
                        </span>
                        <i className="workflow-check"></i>
                      </div>
                      <div className="workflow-connector">
                        <i></i>
                      </div>
                      <div className="workflow-step">
                        <span className="workflow-icon">
                          {"02"}
                        </span>
                        <span>
                          <strong>
                            {"Inventory updated"}
                          </strong>
                          <small>
                            {"Operations · Automatic"}
                          </small>
                        </span>
                        <i className="workflow-check"></i>
                      </div>
                      <div className="workflow-connector">
                        <i></i>
                      </div>
                      <div className="workflow-step">
                        <span className="workflow-icon">
                          {"03"}
                        </span>
                        <span>
                          <strong>
                            {"Team notified"}
                          </strong>
                          <small>
                            {"Team inbox · Delivered"}
                          </small>
                        </span>
                        <i className="workflow-check"></i>
                      </div>
                      <div className="workflow-footer">
                        <i></i>
                        {" RUN COMPLETED "}
                        <span>
                          {"JUST NOW"}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
              <p className="creative-outro">
                {"\n          Less busy work. More room for "}
                <em>
                  {"what's next."}
                </em>
              </p>
            </div>
          </motion.section>
  );
}
