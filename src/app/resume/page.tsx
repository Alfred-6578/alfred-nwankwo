"use client";

import Link from "next/link";

export default function ResumePage() {
  return (
    <div className="resume-viewport min-h-screen bg-[#f3efe7] text-[#0a0a0b]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=JetBrains+Mono:wght@300..600&family=Geist:wght@300..700&display=swap');
        .display { font-family: 'Bricolage Grotesque', sans-serif; font-variation-settings: 'wdth' 92; }
        .mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .resume-viewport { font-family: 'Geist', ui-sans-serif, system-ui, sans-serif; }

        /* ===== Screen (on-portfolio viewing) ===== */
        .resume-page {
          background: #ffffff;
          color: #111111;
          max-width: 820px;
          margin: 0 auto;
          padding: 56px 64px;
          box-shadow: 0 30px 80px -30px rgba(0,0,0,0.25), 0 6px 20px -8px rgba(0,0,0,0.15);
        }

        .r-section-heading {
          font-family: 'Geist', ui-sans-serif, system-ui, sans-serif;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #ff5c35;
          padding-bottom: 4px;
          border-bottom: 1.5px solid #ff5c35;
          margin-bottom: 12px;
        }

        .r-role-line { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; }
        .r-role-title { font-weight: 600; font-size: 13px; color: #111; }
        .r-role-meta { font-size: 12px; color: #4a4a55; font-style: italic; margin-top: 1px; }
        .r-role-date { font-size: 11px; color: #6a6a75; white-space: nowrap; font-family: 'JetBrains Mono', monospace; }

        .r-bullets { list-style: none; padding: 0; margin: 6px 0 0; }
        .r-bullets li {
          position: relative;
          padding-left: 14px;
          margin-bottom: 4px;
          font-size: 12px;
          line-height: 1.5;
          color: #2a2a2f;
        }
        .r-bullets li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 8px;
          width: 4px;
          height: 4px;
          background: #ff5c35;
          border-radius: 1px;
        }

        .r-project-title { font-weight: 600; font-size: 13px; color: #111; }
        .r-project-meta { font-size: 11px; color: #6a6a75; font-family: 'JetBrains Mono', monospace; margin-top: 1px; }
        .r-project-desc { font-size: 12px; line-height: 1.5; color: #2a2a2f; margin-top: 4px; }

        .r-skills-row { font-size: 12px; line-height: 1.7; color: #2a2a2f; }
        .r-skills-row strong { color: #111; font-weight: 600; display: inline-block; min-width: 92px; }

        .r-link { color: inherit; text-decoration: none; }
        .r-link:hover { text-decoration: underline; text-decoration-color: #ff5c35; text-underline-offset: 2px; }
        @media print { .r-link:hover { text-decoration: none; } }

        /* ===== Print (Save as PDF) ===== */
        @media print {
          @page { size: A4; margin: 0.55in; }

          html, body { background: #fff !important; }
          .no-print { display: none !important; }
          .resume-viewport { background: #fff !important; }
          .resume-page {
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }

          /* Keep sections together on a single page when possible */
          .r-avoid-break { page-break-inside: avoid; break-inside: avoid; }
          h1, h2, h3 { page-break-after: avoid; break-after: avoid; }
        }
      `}</style>

      {/* Toolbar — hidden on print */}
      <div className="no-print sticky top-0 z-20 backdrop-blur bg-[#f3efe7]/80 border-b border-[#e2dcd0]">
        <div className="max-w-[820px] mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 rounded-full border border-[#c9c0af] bg-white px-4 py-1.5 text-[12px] hover:border-[#ff5c35] transition-all"
          >
            <span className="text-[#ff5c35]">←</span>
            Back to portfolio
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full bg-[#ff5c35] text-white px-5 py-1.5 text-[12px] font-semibold hover:bg-[#ff7a5c] transition-colors cursor-pointer"
          >
            Download PDF
            <span>↓</span>
          </button>
        </div>
      </div>

      {/* Actual résumé sheet */}
      <main className="py-10 md:py-14 px-4">
        <article className="resume-page">
          {/* ======== HEADER ======== */}
          <header className="r-avoid-break">
            <h1
              className="display"
              style={{ fontSize: "40px", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1, margin: 0 }}
            >
              Alfred Nwankwo
            </h1>
            <p
              style={{
                fontSize: "13px",
                letterSpacing: "0.02em",
                color: "#4a4a55",
                margin: "8px 0 10px",
                fontWeight: 500,
              }}
            >
              Senior Frontend Engineer{" "}<span style={{ color: "#ff5c35" }}>·</span>{" "}Next.js, React &amp; TypeScript
            </p>
            <p
              className="mono"
              style={{
                fontSize: "10.5px",
                color: "#4a4a55",
                margin: 0,
                lineHeight: 1.7,
                letterSpacing: "0.01em",
              }}
            >
              <a href="mailto:alfred.nwankwo719@gmail.com" className="r-link">
                alfred.nwankwo719@gmail.com
              </a>{" "}
              <span style={{ color: "#ff5c35" }}>·</span>{" "}
              <a href="tel:+2347077629457" className="r-link">+234 707 762 9457</a>{" "}
              <span style={{ color: "#ff5c35" }}>·</span>{" "}Remote{" "}
              <span style={{ color: "#ff5c35" }}>·</span>{" "}UTC+1{" "}<span style={{ color: "#ff5c35" }}>·</span>{" "}
              Lagos, Nigeria
              <br />
              <a
                href="https://alfred-nwankwo.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="r-link"
              >
                alfred-nwankwo.vercel.app
              </a>{" "}
              <span style={{ color: "#ff5c35" }}>·</span>{" "}
              <a
                href="https://github.com/alfred-nwankwo"
                target="_blank"
                rel="noreferrer"
                className="r-link"
              >
                github.com/alfred-nwankwo
              </a>{" "}
              <span style={{ color: "#ff5c35" }}>·</span>{" "}
              <a
                href="https://linkedin.com/in/alfred-nwankwo"
                target="_blank"
                rel="noreferrer"
                className="r-link"
              >
                linkedin.com/in/alfred-nwankwo
              </a>
            </p>
          </header>

          <hr style={{ border: 0, borderTop: "1px solid #e2dcd0", margin: "18px 0" }} />

          {/* ======== SUMMARY ======== */}
          <section className="r-avoid-break" style={{ marginBottom: "18px" }}>
            <h2 className="r-section-heading">Summary</h2>
            <p style={{ fontSize: "12px", lineHeight: 1.55, color: "#2a2a2f", margin: 0 }}>
              Frontend engineer with{" "}<strong>3+ years</strong>{" "}building production web apps in Next.js, React and
              TypeScript, usually as the lead or sole frontend developer, owning architecture, reusable components and
              REST API integration end to end. Strong on performance, payments, technical SEO and web security. Track
              record: initial page load cut{" "}<strong>60%</strong>, a{" "}<strong>27,000+ line</strong>{" "}TypeScript platform
              shipped solo, and a single shared token refresh across{" "}<strong>20+ parallel requests</strong>.
              Comfortable working remotely with distributed teams.
            </p>
          </section>

          {/* ======== EXPERIENCE ======== */}
          <section style={{ marginBottom: "18px" }}>
            <h2 className="r-section-heading">Experience</h2>

            <div className="r-avoid-break" style={{ marginBottom: "14px" }}>
              <div className="r-role-line">
                <div>
                  <div className="r-role-title">
                    Frontend Developer{" "}<span style={{ color: "#ff5c35" }}>·</span>{" "}Toon Central
                  </div>
                  <div className="r-role-meta">
                    African comics &amp; short-video platform{" "}<span style={{ color: "#ff5c35" }}>·</span>{" "}
                    <a href="https://toon-central.vercel.app" target="_blank" rel="noreferrer" className="r-link">
                      toon-central.vercel.app
                    </a>
                  </div>
                </div>
                <div className="r-role-date">Oct 2026 — Present</div>
              </div>
              <ul className="r-bullets">
                <li>
                  Rebuilt the reader and creator frontend in{" "}<strong>Next.js 16 + TypeScript</strong>:{" "}<strong>47 routes</strong>,{" "}<strong>135 reusable components</strong>{" "}and{" "}<strong>27,000+ lines</strong>, covering a comic reader, shorts feed, creator studio and account area, all integrated with the backend{" "}<strong>REST API</strong>.
                </li>
                <li>
                  Built{" "}<strong>Paystack payment flows</strong>: credit packs, recurring plans with cancel and switch, per-episode unlocks and purchase history, plus payment-status checks after checkout.
                </li>
                <li>
                  Led{" "}<strong>technical SEO</strong>: server-rendered pages, keyword-rich addresses for each comic,{" "}<strong>JSON-LD structured data</strong>, sitemap, robots and canonical links. The previous live site had none of these.
                </li>
                <li>
                  <strong>Performance and security hardening</strong>: tagged server-side caching of public API reads with instant expiry on creator edits; fixed site-wide API timeouts on{" "}<strong>IPv6/NAT64 networks</strong>{" "}by tuning Node&apos;s connection fallback; same-site checks on internal API routes and per-viewer view-count limits.
                </li>
              </ul>
            </div>

            <div className="r-avoid-break" style={{ marginBottom: "14px" }}>
              <div className="r-role-line">
                <div>
                  <div className="r-role-title">
                    Frontend Developer{" "}<span style={{ color: "#ff5c35" }}>·</span>{" "}Emkairos Intelli Systems
                  </div>
                  <div className="r-role-meta">
                    Startup{" "}<span style={{ color: "#ff5c35" }}>·</span>{" "}YapShop, WhatsApp AI commerce platform{" "}<span style={{ color: "#ff5c35" }}>·</span>{" "}
                    <a href="https://yapshop.emkairosintellisystems.com" target="_blank" rel="noreferrer" className="r-link">
                      yapshop.emkairosintellisystems.com
                    </a>
                  </div>
                </div>
                <div className="r-role-date">May — Jul 2026</div>
              </div>
              <ul className="r-bullets">
                <li>
                  Built the operator dashboard for merchants selling on WhatsApp through a{" "}<strong>Claude-driven AI agent</strong>:{" "}<strong>22 routes</strong>,{" "}<strong>140 components</strong>,{" "}<strong>23,000+ lines</strong>{" "}of TypeScript, plus the marketing site and a platform admin tool.
                </li>
                <li>
                  <strong>Realtime handoff queue</strong>{" "}over a token-authed{" "}<strong>WebSocket</strong>; claim / assign / reassign flows gated by{" "}<strong>per-resource permissions</strong>{" "}across 4 roles, enforced at render time and on every mutation.
                </li>
                <li>
                  Rendered the agent&apos;s product templates inline as Cloudinary media cards with{" "}<strong>React.memo</strong>&apos;d bubbles;{" "}<strong>optimistic updates</strong>{" "}with revert-on-error; admin API behind a Next.js proxy so the JWT never reaches the browser.
                </li>
              </ul>
            </div>

            <div className="r-avoid-break" style={{ marginBottom: "14px" }}>
              <div className="r-role-line">
                <div>
                  <div className="r-role-title">
                    Lead Frontend Developer{" "}<span style={{ color: "#ff5c35" }}>·</span>{" "}Sonichoice Logistics
                  </div>
                  <div className="r-role-meta">
                    Contract{" "}<span style={{ color: "#ff5c35" }}>·</span>{" "}Multi-branch delivery operations platform{" "}<span style={{ color: "#ff5c35" }}>·</span>{" "}
                    <a href="https://inventory.sonichoicelogistics.com" target="_blank" rel="noreferrer" className="r-link">
                      inventory.sonichoicelogistics.com
                    </a>
                  </div>
                </div>
                <div className="r-role-date">Mar — Apr 2026</div>
              </div>
              <ul className="r-bullets">
                <li>
                  Shipped{" "}<strong>2 role tiers</strong>{" "}with branch-scoped action gating enforced at both render and API layers; URL-deep-linked detail views across{" "}<strong>5 resource types</strong>; activity audit feed with{" "}<strong>3s-debounced</strong>{" "}search.
                </li>
                <li>
                  Client-side{" "}<strong>PDF + Excel exports</strong>{" "}across all 5 resource types (styled headers, alternating row colors, branded layouts); race-condition guards ensure stale responses never overwrite the active selection.
                </li>
              </ul>
            </div>

            <div className="r-avoid-break" style={{ marginBottom: "14px" }}>
              <div className="r-role-line">
                <div>
                  <div className="r-role-title">
                    Lead Frontend Developer{" "}<span style={{ color: "#ff5c35" }}>·</span>{" "}AfrikDish
                  </div>
                  <div className="r-role-meta">
                    Contract{" "}<span style={{ color: "#ff5c35" }}>·</span>{" "}African &amp; Caribbean food-delivery marketplace
                  </div>
                </div>
                <div className="r-role-date">Oct 2024 — Nov 2025</div>
              </div>
              <ul className="r-bullets">
                <li>
                  Built the complete responsive frontend:{" "}<strong>3 role-based dashboards</strong>{" "}(admin / vendor / customer) across{" "}<strong>50+ pages</strong>{" "}and{" "}<strong>15,000+ lines</strong>{" "}of TypeScript, with{" "}<strong>Paystack</strong>{" "}checkout, Google OAuth and Google Maps.
                </li>
                <li>
                  Cut initial page load{" "}<strong>60%</strong>{" "}via Next.js SSR, code splitting, and skeleton loading;{" "}<strong>100% TypeScript</strong>{" "}coverage cut runtime errors{" "}<strong>~85%</strong>{" "}vs the prior JS baseline.
                </li>
                <li>
                  Built{" "}<strong>JWT auth</strong>{" "}with a single in-flight token refresh shared across{" "}<strong>20+ parallel fetches</strong>, preventing duplicate refresh calls under load.
                </li>
              </ul>
            </div>

            <div className="r-avoid-break" style={{ marginBottom: "14px" }}>
              <div className="r-role-line">
                <div>
                  <div className="r-role-title">
                    Frontend Developer Intern{" "}<span style={{ color: "#ff5c35" }}>·</span>{" "}Genesys Tech Hub
                  </div>
                  <div className="r-role-meta">
                    Technology training &amp; development center, Nigeria
                  </div>
                </div>
                <div className="r-role-date">May — Dec 2022</div>
              </div>
              <ul className="r-bullets">
                <li>
                  Shipped{" "}<strong>8+ responsive UI components</strong>{" "}across 3 production apps using React and Tailwind; integrated REST APIs for auth, data fetching, and real-time updates.
                </li>
                <li>
                  Cut bundle sizes{" "}<strong>25%</strong>{" "}via code splitting and lazy loading, improving Time to Interactive across shared component libraries.
                </li>
              </ul>
            </div>
          </section>

          {/* ======== SELECTED PROJECTS ======== */}
          <section style={{ marginBottom: "18px" }}>
            <h2 className="r-section-heading">Selected Projects</h2>

            <div className="r-avoid-break" style={{ marginBottom: "12px" }}>
              <div className="r-role-line">
                <div>
                  <div className="r-project-title">
                    StayHaven{" "}<span style={{ color: "#ff5c35" }}>·</span>{" "}Full-stack hospitality platform
                  </div>
                  <div className="r-project-meta">
                    Next.js 16 · Prisma · Postgres · Supabase · Paystack
                  </div>
                </div>
                <div className="r-role-date">
                  <a
                    href="https://stay-haven-chi.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    className="r-link"
                  >
                    stay-haven-chi.vercel.app
                  </a>
                </div>
              </div>
              <p className="r-project-desc">
                End-to-end hotel platform covering the full guest journey — browsing, booking, payments, tiered
                loyalty — plus dedicated workflows for front-desk staff and admins.
              </p>
              <ul className="r-bullets">
                <li>
                  <strong>4 role tiers</strong>{" "}(Guest / Staff / Manager / Admin),{" "}<strong>20+ Prisma models</strong>,{" "}
                  <strong>9 transactional email templates</strong>, and a{" "}<strong>4-tier loyalty program</strong>{" "}
                  (Bronze → Platinum) with live tier-threshold upgrades.
                </li>
                <li>
                  Payment-gated upgrade &amp; extension flows with async Paystack pay-links; Supabase Realtime
                  notification bus fanning out to every authenticated client; admin analytics across{" "}
                  <strong>7d / 30d / 90d / 12m</strong>{" "}views with PDF + XLSX exports.
                </li>
              </ul>
            </div>

            <div className="r-avoid-break">
              <div className="r-role-line">
                <div>
                  <div className="r-project-title">
                    SiteGenie{" "}<span style={{ color: "#ff5c35" }}>·</span>{" "}AI landing-page generator
                  </div>
                  <div className="r-project-meta">Next.js 16 · Gemini 2.5 Flash · React 19</div>
                </div>
                <div className="r-role-date">
                  <a
                    href="https://site-geniee.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    className="r-link"
                  >
                    site-geniee.vercel.app
                  </a>
                </div>
              </div>
              <p className="r-project-desc">
                SaaS that ships production-ready landing pages in{" "}
                <strong>under 10 seconds</strong>{" "}from a plain-text business description.
              </p>
              <ul className="r-bullets">
                <li>
                  Inline editing engine with path-aware state updates across{" "}<strong>5 section types</strong>;{" "}
                  <strong>3 layout variants</strong>{" "}per section (single / two-column / image);{" "}
                  <strong>9 palettes</strong>{" "}switching via CSS custom properties with zero re-render.
                </li>
                <li>
                  Structured-JSON prompt engineering across{" "}<strong>4 industries</strong>{" "}with per-style tone
                  rules; per-section regeneration with layout-matched skeletons; client-side HTML + Tailwind
                  export.
                </li>
              </ul>
            </div>
          </section>

          {/* ======== SKILLS ======== */}
          <section className="r-avoid-break" style={{ marginBottom: "16px" }}>
            <h2 className="r-section-heading">Skills</h2>
            <div className="r-skills-row">
              <div><strong>Frontend</strong>Next.js 16 · React 19 · TypeScript · JavaScript · HTML5 · CSS3 · Tailwind CSS · React Query · Framer Motion</div>
              <div><strong>Practices</strong>Responsive design · Performance optimization · Technical SEO · Web security · Reusable component design</div>
              <div><strong>Realtime</strong>WebSocket · Server-Sent Events · Supabase Realtime</div>
              <div><strong>Backend</strong>Node.js · PostgreSQL · Prisma · Supabase · MongoDB · Firebase</div>
              <div><strong>Integrations</strong>REST · Paystack · Cloudinary · Google Maps · OAuth 2.0 · JWT · WhatsApp Cloud API · Claude AI · Gemini AI</div>
              <div><strong>Tools</strong>Git · GitHub Actions · Vercel · Figma · Postman · Chrome DevTools</div>
            </div>
          </section>

          {/* ======== EDUCATION ======== */}
          <section className="r-avoid-break">
            <h2 className="r-section-heading">Education</h2>
            <div className="r-role-line">
              <div>
                <div className="r-role-title">Bachelor of Science in Computer Science</div>
                <div className="r-role-meta">
                  Enugu State University of Science and Technology (ESUT), Nigeria
                </div>
              </div>
              <div className="r-role-date">2022 — 2026</div>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
