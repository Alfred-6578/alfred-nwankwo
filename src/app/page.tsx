"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { ProjectCard } from "@/components/project-card";
import { PROJECTS } from "@/lib/projects";

const NAV_ITEMS = ["Home", "Work", "About", "Stack", "Contact"] as const;

export default function Portfolio() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [viewport, setViewport] = useState({ w: 1200, h: 800 });
  const [lagosTime, setLagosTime] = useState("00:00:00");
  const [copied, setCopied] = useState(false);

  const [activeSection, setActiveSection] = useState<string>("home");
  const navListRef = useRef<HTMLUListElement | null>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  // Measure the active nav item's position inside the pill container and
  // re-measure whenever the active item changes or the viewport resizes.
  useLayoutEffect(() => {
    const ul = navListRef.current;
    if (!ul) return;
    const measure = () => {
      const active = ul.querySelector<HTMLElement>(`[data-nav="${activeSection}"]`);
      if (!active) return;
      const ulRect = ul.getBoundingClientRect();
      const aRect = active.getBoundingClientRect();
      if (aRect.width === 0) return; // hidden (e.g. below md breakpoint)
      setPill({ left: aRect.left - ulRect.left, width: aRect.width });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeSection]);

  // Scroll-spy: update activeSection as sections cross the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -49% 0px", threshold: 0 }
    );
    NAV_ITEMS.forEach((label) => {
      const el = document.getElementById(label.toLowerCase());
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    const updateTime = () => {
      const now = new Date();
      const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
      const lagos = new Date(utcMs + 3600000); // UTC+1
      const h = String(lagos.getHours()).padStart(2, "0");
      const m = String(lagos.getMinutes()).padStart(2, "0");
      const s = String(lagos.getSeconds()).padStart(2, "0");
      setLagosTime(`${h}:${m}:${s}`);
    };

    const raf = requestAnimationFrame(() => {
      onResize();
      updateTime();
    });
    const interval = setInterval(updateTime, 1000);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      clearInterval(interval);
    };
  }, []);

  const par = (strength = 0.015) => {
    const dx = (mouse.x - viewport.w / 2) * strength;
    const dy = (mouse.y - viewport.h / 2) * strength;
    return `translate(${dx}px, ${dy}px)`;
  };


  const projects = PROJECTS.filter((p) => p.slug !== "alfpat-electronics");

  return (
    <div
      className="min-h-screen bg-[#0a0a0b] text-[#f5f2ea] overflow-x-hidden relative selection:bg-[#ff5c35] selection:text-[#0a0a0b]"
      style={{ fontFamily: "'Geist', system-ui, sans-serif" }}
    >
      <Script id="cal-embed-init" strategy="afterInteractive">
        {`(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", "discovery-call", {origin:"https://cal.com"});
Cal.ns["discovery-call"]("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#c8ff3d"},"dark":{"cal-brand":"#c8ff3d"}},"hideEventTypeDetails":false,"layout":"month_view"});`}
      </Script>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=JetBrains+Mono:wght@300..600&family=Geist:wght@300..700&family=Instrument+Serif:ital@0;1&display=swap');

        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
        @keyframes orbPulse { 0%, 100% { opacity: 0.55; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.08); } }
        @keyframes spinSlow { from { transform: rotate(0); } to { transform: rotate(360deg); } }
        @keyframes float1 { 0%, 100% { transform: translateY(0) rotate(-6deg); } 50% { transform: translateY(-10px) rotate(-6deg); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0) rotate(4deg); } 50% { transform: translateY(-14px) rotate(4deg); } }
        @keyframes float3 { 0%, 100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-8px) rotate(-3deg); } }
        @keyframes float4 { 0%, 100% { transform: translateY(0) rotate(7deg); } 50% { transform: translateY(-12px) rotate(7deg); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes dotBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        .fade-up { opacity: 0; animation: fadeUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .scale-in { opacity: 0; animation: scaleIn 1s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

        .display { font-family: 'Bricolage Grotesque', sans-serif; font-variation-settings: 'wdth' 92; }
        .mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .serif { font-family: 'Instrument Serif', serif; }

        .orb-pulse { animation: orbPulse 4.5s ease-in-out infinite; }
        .spin-slow { animation: spinSlow 22s linear infinite; }
        .spin-fast { animation: spinSlow 14s linear infinite; }
        .blink { animation: dotBlink 1.8s ease-in-out infinite; }
        .marquee-track { animation: marquee 50s linear infinite; }

        .float-1 { animation: fadeUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) 1.3s forwards, float1 6s ease-in-out 2.1s infinite; opacity: 0; }
        .float-2 { animation: fadeUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) 1.4s forwards, float2 7s ease-in-out 2.2s infinite; opacity: 0; }
        .float-3 { animation: fadeUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) 1.5s forwards, float3 5.5s ease-in-out 2.3s infinite; opacity: 0; }
        .float-4 { animation: fadeUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) 1.6s forwards, float4 6.5s ease-in-out 2.4s infinite; opacity: 0; }

        .grid-bg {
          background-image:
            linear-gradient(to right, #18181c 1px, transparent 1px),
            linear-gradient(to bottom, #18181c 1px, transparent 1px);
          background-size: 72px 72px;
          -webkit-mask-image: radial-gradient(ellipse 70% 55% at 50% 40%, black 30%, transparent 80%);
          mask-image: radial-gradient(ellipse 70% 55% at 50% 40%, black 30%, transparent 80%);
        }
        .grain {
          position: fixed; inset: 0; pointer-events: none; z-index: 70;
          opacity: 0.045; mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .glow-orange { background: radial-gradient(circle at 50% 55%, #ff5c35 0%, #ff3c1d 35%, transparent 70%); }

        .cta-primary {
          background: #ff5c35;
          box-shadow: 0 10px 40px -10px #ff5c35, inset 0 -2px 0 rgba(0,0,0,0.15);
        }
        .cta-primary:hover { background: #ff7a5c; box-shadow: 0 12px 50px -8px #ff5c35; }
      `}</style>

      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none z-0" />
      <div className="grain" />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: `radial-gradient(650px circle at ${mouse.x}px ${mouse.y}px, rgba(255,92,53,0.08), transparent 50%)` }}
      />

      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 md:px-10 max-[385px]:py-4 py-5 bg-[#0a0a0b]/70 backdrop-blur-md border-b border-[#1a1a1d]/60">
        <div className="fade-up flex items-center gap-2.5" style={{ animationDelay: "0.1s" }}>
          <div className="relative h-9 w-9 rounded-full bg-[#ff5c35] flex items-center justify-center">
            <span className="display text-[#0a0a0b] font-bold text-[13px]">AN</span>
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#c8ff3d] border-2 border-[#0a0a0b] blink" />
          </div>
          <span className="display font-semibold text-[15px]">Alfred<span className="text-[#ff5c35]">.</span></span>
        </div>

        <ul
          ref={navListRef}
          className="fade-up hidden md:flex relative items-center gap-1 rounded-full border border-[#26262a] bg-[#111113]/70 backdrop-blur-md px-1.5 py-1.5"
          style={{ animationDelay: "0.2s" }}
        >
          {/* Sliding pill background */}
          {pill && (
            <span
              aria-hidden
              className="absolute top-1.5 bottom-1.5 rounded-full bg-[#ff5c35] transition-all duration-420 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none"
              style={{ left: pill.left, width: pill.width }}
            />
          )}
          {NAV_ITEMS.map((label) => {
            const key = label.toLowerCase();
            const isActive = activeSection === key;
            return (
              <li key={label} className="relative z-10">
                <a
                  href={`#${key}`}
                  data-nav={key}
                  onClick={() => setActiveSection(key)}
                  className={`block px-4 py-1.5 text-[13px] rounded-full transition-colors duration-300 ${isActive ? "text-[#0a0a0b] font-medium" : "text-[#a0a0a8] hover:text-[#f5f2ea]"}`}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="#contact"
          className="fade-up group inline-flex items-center gap-2.5 rounded-full border border-[#2a2a2f] bg-[#111113] pl-5 pr-1.5 py-1.5 text-[13px] hover:border-[#ff5c35] transition-all"
          style={{ animationDelay: "0.3s" }}
        >
          Contact me
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ff5c35] text-[#0a0a0b] text-[11px] transition-transform group-hover:rotate-45">→</span>
        </a>
      </nav>

      {/* HERO */}
      <section id="home" className="relative z-10 px-4 md:px-10 pt-24 md:pt-28 pb-20">
        <div className="relative max-w-[1280px] mx-auto">
          <div className="fade-up flex items-center justify-center gap-3 mb-3 md:mb-4" style={{ animationDelay: "0.4s" }}>
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#ff5c35]" />
            <span className="mono text-[10px] md:text-[11px] text-[#ff5c35] tracking-[0.3em] uppercase">Hello there</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#ff5c35]" />
          </div>

          <h1 className="display font-bold text-center leading-[0.9] tracking-[-0.035em] relative z-30">
            <div className="fade-up text-[17vw] md:text-[11.5vw]" style={{ animationDelay: "0.55s" }}>
              I&apos;m <span className="serif italic font-normal text-[#ff5c35]">Alfred</span>
            </div>
          </h1>

          <div className="relative grid grid-cols-12 gap-3 md:gap-4 items-center mt-[-1.5vw] md:mt-[-2.5vw]">
            <aside
              className="fade-up col-span-6 md:col-span-3 max-md:hidden order-2 md:order-1 relative z-30"
              style={{ animationDelay: "1.1s", transform: par(0.012) }}
            >
              <div className="relative rounded-2xl border border-[#2a2a2f] bg-[#0f0f12]/85 backdrop-blur-md p-4 md:p-5 hover:border-[#ff5c35]/40 transition-colors">
                <div className="serif italic text-3xl md:text-4xl text-[#ff5c35] leading-none mb-1.5">&ldquo;</div>
                <p className="text-[11px] md:text-[13px] text-[#d4d0c8] leading-snug mb-3">
                  Ships fast, ships clean. Actually reads the design spec — rare breed.
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    {["from-orange-400 to-red-500", "from-blue-400 to-purple-500", "from-green-400 to-teal-500"].map((g, i) => (
                      <div key={i} className={`h-6 w-6 rounded-full border-2 border-[#0f0f12] bg-gradient-to-br ${g}`} />
                    ))}
                  </div>
                  <div className="text-[10px] text-[#71717a] leading-tight">
                    <div className="text-[#f5f2ea] font-semibold text-[11px]">3+ projects shipped</div>
                    <div className="text-[#c8ff3d] tracking-tight flex items-center gap-1">
                      <span className="h-1 w-1 rounded-full bg-[#c8ff3d]" /> All live in prod
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <div className="col-span-12 md:col-span-6 order-1 md:order-2 relative flex items-center justify-center min-h-[55vw] md:min-h-[28vw]">
              <div className="orb-pulse glow-orange absolute w-[80%] md:w-[85%] aspect-square rounded-full blur-3xl z-0" />
              <div
                className="spin-slow absolute w-[75%] md:w-[78%] aspect-square rounded-full z-10"
                style={{ border: "1px dashed #ff5c35", opacity: 0.4 }}
              />
              <div className="absolute w-[65%] md:w-[68%] aspect-square rounded-full z-10 border border-[#ff5c35]/20" />

              <div
                className="fade-up absolute top-0 right-[8%] md:right-[12%] z-40 h-16 w-16 md:h-20 md:w-20 rounded-full bg-[#c8ff3d] flex items-center justify-center"
                style={{ animationDelay: "1.4s" }}
              >
                <div className="spin-fast w-full h-full">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <path id="hire-circle" d="M 50, 50 m -32, 0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0" />
                    </defs>
                    <text className="mono fill-[#0a0a0b] font-semibold" style={{ fontSize: "10px", letterSpacing: "2px" }}>
                      <textPath href="#hire-circle">HIRE ME • HIRE ME • </textPath>
                    </text>
                  </svg>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[#0a0a0b] text-lg">→</span>
                </div>
              </div>

              <div
                className="scale-in relative z-20 w-[62%] md:w-[60%] aspect-square rounded-full overflow-hidden border-[3px] border-[#0a0a0b]"
                style={{
                  animationDelay: "0.85s",
                  background: "linear-gradient(135deg, #ff8855 0%, #ff5c35 50%, #c9431c 100%)",
                  boxShadow: "0 0 0 2px #ff5c35, 0 40px 100px -20px #ff5c35",
                  transform: par(0.006),
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="display text-[#0a0a0b] font-bold text-[24vw] md:text-[13vw] opacity-95 select-none leading-none">A</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0b]/40" />
                {/* <div className="mono absolute bottom-3 left-4 text-[9px] text-[#0a0a0b]/70 uppercase tracking-[0.25em]">
                  {"// your photo here"}
                </div> */}
                <div className="mono absolute bottom-3 right-4 text-[9px] text-[#0a0a0b]/70 uppercase tracking-[0.25em]">
                  .webp
                </div>
              </div>
            </div>

            <aside className="max-md:absolute max-[350px]:z-20 col-span-6 md:col-span-3 order-3 relative z-30 flex flex-col items-start gap-2.5 md:gap-3 py-2">
              <div className="relative float-1 inline-flex items-center gap-2 rounded-full border border-[#2a2a2f] bg-[#111113] px-3.5 py-1.5 md:px-4 md:py-2 shadow-lg shadow-black/40">
                <span className="h-1.5 w-1.5 rounded-full bg-[#61dafb] shadow-[0_0_8px_#61dafb]" />
                <span className=" mono text-[11px] md:text-[12px] text-[#d4d0c8]">React</span>
              </div>
              <div className="float-2 inline-flex items-center gap-2 rounded-full border border-[#2a2a2f] bg-[#111113] px-3.5 py-1.5 md:px-4 md:py-2 ml-4 md:ml-8 shadow-lg shadow-black/40">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <span className="mono text-[11px] md:text-[12px] text-[#d4d0c8]">Next.js</span>
              </div>
              <div className="float-3 inline-flex items-center gap-2 rounded-full border border-[#ff5c35] bg-[#ff5c35]/10 px-3.5 py-1.5 md:px-4 md:py-2 shadow-lg shadow-[#ff5c35]/20">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff5c35] shadow-[0_0_8px_#ff5c35]" />
                <span className="mono text-[11px] md:text-[12px] text-[#ff5c35] font-medium">Motion</span>
              </div>
              <div className="float-4 inline-flex items-center gap-2 rounded-full border border-[#2a2a2f] bg-[#111113] px-3.5 py-1.5 md:px-4 md:py-2 ml-3 md:ml-5 shadow-lg shadow-black/40">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" />
                <span className="mono text-[11px] md:text-[12px] text-[#d4d0c8]">TypeScript</span>
              </div>
              <div className="float-1 inline-flex items-center gap-2 rounded-full border border-[#2a2a2f] bg-[#111113] px-3.5 py-1.5 md:px-4 md:py-2 shadow-lg shadow-black/40">
                <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
                <span className="mono text-[11px] md:text-[12px] text-[#d4d0c8]">Tailwind</span>
              </div>
              {/* <div className="float-2 inline-flex items-center gap-2 rounded-full border border-[#2a2a2f] bg-[#111113] px-3.5 py-1.5 md:px-4 md:py-2 ml-4 md:ml-8 shadow-lg shadow-black/40">
                <span className="h-1.5 w-1.5 rounded-full bg-[#88ce02] shadow-[0_0_8px_#88ce02]" />
                <span className="mono text-[11px] md:text-[12px] text-[#d4d0c8]">GSAP</span>
              </div> */}
              <div className="float-3 inline-flex items-center gap-2 rounded-full border border-[#c8ff3d] bg-[#c8ff3d]/10 px-3.5 py-1.5 md:px-4 md:py-2 shadow-lg shadow-[#c8ff3d]/20">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c8ff3d] shadow-[0_0_8px_#c8ff3d]" />
                <span className="mono text-[11px] md:text-[12px] text-[#c8ff3d] font-medium">Gemini AI</span>
              </div>
              {/* <div className="float-4 inline-flex items-center gap-2 rounded-full border border-[#2a2a2f] bg-[#111113] px-3.5 py-1.5 md:px-4 md:py-2 ml-3 md:ml-5 shadow-lg shadow-black/40">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <span className="mono text-[11px] md:text-[12px] text-[#d4d0c8]">Vercel</span>
              </div> */}
            </aside>
          </div>

          <h1 className="display font-bold text-center leading-[0.9] tracking-[-0.035em] relative z-0 mt-[-8vw] md:mt-[-7vw]">
            <div className="fade-up text-[22vw] md:text-[14vw] text-[#f5f2ea]" style={{ animationDelay: "0.7s" }}>
              NWANKWO<span className="text-[#ff5c35]">.</span>
            </div>
          </h1>

          <div className="fade-up flex flex-wrap items-center justify-center gap-3 mt-[-2vw] md:mt-[-3vw] relative z-40" style={{ animationDelay: "1.75s" }}>
            <a href="#work" className="cta-primary group inline-flex items-center gap-3 rounded-full px-6 py-3 md:px-7 md:py-3.5 text-sm md:text-[15px] font-semibold text-[#0a0a0b] transition-all">
              View my work
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0a0a0b] text-[#ff5c35] text-[11px] transition-transform group-hover:rotate-45">→</span>
            </a>
            <a href="#contact" className="group inline-flex items-center gap-3 rounded-full border border-[#2a2a2f] bg-[#111113]/80 backdrop-blur px-6 py-3 md:px-7 md:py-3.5 text-sm md:text-[15px] text-[#f5f2ea] hover:border-[#ff5c35] transition-all">
              Or just say hi
              <span className="h-2 w-2 rounded-full bg-[#ff5c35] group-hover:scale-150 transition-transform" />
            </a>
          </div>

          <div className="fade-up mt-12 md:mt-16 grid grid-cols-3 max-w-2xl mx-auto" style={{ animationDelay: "1.95s" }}>
            {[
              { num: "3", suffix: "+", label: "Projects shipped" },
              { num: "3", suffix: "y+", label: "Building for the web" },
              { num: "Q2", suffix: "/26", label: "Open for work" },
            ].map((s, i) => (
              <div key={i} className={`text-center ${i < 2 ? "border-r border-[#26262a]" : ""} px-3`}>
                <div className="display text-3xl md:text-[42px] font-bold text-[#f5f2ea] leading-none">
                  {s.num}<span className="text-[#ff5c35]">{s.suffix}</span>
                </div>
                <div className="mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#71717a] mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="relative z-10 border-y border-[#18181b] overflow-hidden py-3.5 bg-[#08080a]">
        <div className="marquee-track flex whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex shrink-0 items-center">
              {["React", "Next.js 16", "TypeScript", "Motion", "Tailwind 4", "GSAP", "Three.js", "Vercel", "Gemini AI", "Paystack", "React Native (learning)", "WebGL"].map((tech) => (
                <span key={`${i}-${tech}`} className="mono text-[12px] tracking-[0.12em] text-[#6a6a72] inline-flex items-center px-7">
                  <span className="text-[#ff5c35] mr-3 text-[8px]">★</span> {tech}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* WORK */}
      <section id="work" className="relative z-10 px-5 md:px-10 pt-24 md:pt-32 pb-20 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-12 gap-4 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-7">
            <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff5c35] mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#ff5c35]" />
              ( 01 ) &nbsp; Selected work
            </div>
            <h2 className="display text-5xl md:text-[72px] font-bold leading-[0.95] tracking-[-0.03em]">
              Stuff I&apos;ve <span className="serif italic font-normal text-[#ff5c35]">actually</span> shipped.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 md:pt-4">
            <p className="text-sm md:text-base text-[#a0a0a8] leading-relaxed mb-5">
              Each preview below is a <span className="text-[#f5f2ea]">working mini-rebuild</span> of the real site at miniature scale — not a screenshot, not an iframe. Hover to pause; click &ldquo;View live&rdquo; to see the real thing.
            </p>
            <div className="flex items-center gap-2 mono text-[10px] text-[#5c5c63] uppercase tracking-[0.2em]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c8ff3d] blink" />
              03 shown · <Link href="/work" className="text-[#f5f2ea] underline decoration-[#ff5c35]">full archive →</Link>
            </div>
          </div>
        </div>

        <div className="space-y-28 md:space-y-40">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.name}
              project={p}
              index={i + 1}
              flipped={i % 2 === 1}
            />
          ))}
        </div>

        <div className="mt-24 md:mt-32 text-center border-t border-[#1a1a1d] pt-16">
          <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#5c5c63] mb-4">
            End of selected work
          </div>
          <h3 className="display text-3xl md:text-4xl font-bold mb-6">
            There&apos;s more in the archive.
          </h3>
          <Link href="/work" className="group inline-flex items-center gap-3 rounded-full border border-[#2a2a2f] bg-[#111113] px-6 py-3 text-sm hover:border-[#ff5c35] transition-all">
            Browse the archive
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#ff5c35] text-[#0a0a0b] text-[10px] transition-transform group-hover:rotate-45">→</span>
          </Link>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section id="about" className="relative z-10 px-5 md:px-10 pt-24 md:pt-32 pb-20 max-w-[1280px] mx-auto">

        {/* Watermark "02" */}
        <div
          className="absolute right-[-3vw] top-[8vw] display font-bold text-[28vw] md:text-[18vw] leading-none pointer-events-none select-none z-0"
          style={{
            color: "rgba(255, 92, 53, 0.04)",
            WebkitTextStroke: "1px rgba(255, 92, 53, 0.15)",
          }}
        >
          02
        </div>

        {/* Section header */}
        <div className="grid grid-cols-12 gap-4 mb-14 md:mb-16 relative z-10">
          <div className="col-span-12 md:col-span-7">
            <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff5c35] mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#ff5c35]" />
              ( 02 ) &nbsp; About me
            </div>
            <h2 className="display text-5xl md:text-[72px] font-bold leading-[0.95] tracking-[-0.03em]">
              The dev, <span className="serif italic font-normal text-[#ff5c35]">briefly</span>.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 md:pt-4">
            <p className="text-sm md:text-base text-[#a0a0a8] leading-relaxed">
              A snapshot of who I am, what I&apos;m into right now, and how I work. Live-updating where it makes sense.
            </p>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-12 gap-3 md:gap-4 relative z-10 auto-rows-auto">

          {/* 1. Intro — large, spans 2 rows on desktop */}
          <div className="col-span-12 md:col-span-7 md:row-span-2 rounded-2xl border border-[#2a2a2f] bg-[#0f0f12]/85 p-6 md:p-8 relative overflow-hidden group hover:border-[#ff5c35]/40 transition-colors">
            <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-[#ff5c35]/5 blur-3xl pointer-events-none" />

            <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff5c35] mb-5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c8ff3d] blink" />
              The dev
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div
                className="h-20 w-20 rounded-full bg-gradient-to-br from-[#ff8855] via-[#ff5c35] to-[#c9431c] flex items-center justify-center flex-shrink-0 border-2 border-[#ff5c35]/30"
                style={{ boxShadow: "0 0 0 4px rgba(255,92,53,0.1)" }}
              >
                <span className="display text-[#0a0a0b] font-bold text-3xl opacity-90">A</span>
              </div>
              <div className="pt-1">
                <h3 className="display text-2xl md:text-3xl font-bold leading-tight mb-1">Alfred Nwankwo</h3>
                <p className="mono text-[11px] text-[#a0a0a8] uppercase tracking-wider">web dev · lagos, ng · 3y+ shipping</p>
              </div>
            </div>

            <p className="text-[#e8e4d8] leading-relaxed mb-4 text-[15px] md:text-base">
              I build interfaces that feel <span className="serif italic text-[#ff5c35]">alive</span> — careful layouts,
              considered motion, the kind of detail you only notice on the second scroll. Three years in, I&apos;ve shipped
              projects ranging from hotel booking sites to full logistics platforms.
            </p>
            <p className="text-[#a0a0a8] leading-relaxed text-sm md:text-[15px] mb-6">
              My sweet spot is modern React stacks — Next.js 14/16, TypeScript, Tailwind, Motion — with genuine
              respect for CSS as its own craft. I care more about how things <em>feel</em> to use than how they look in a screenshot.
            </p>

            <div className="flex items-center gap-3 flex-wrap pt-4 border-t border-[#1f1f24]">
              <a href="#" className="mono text-[11px] uppercase tracking-[0.2em] text-[#ff5c35] hover:text-[#ff7a5c] border-b border-[#ff5c35]/40 hover:border-[#ff5c35] pb-0.5 transition-colors inline-flex items-center gap-1.5">
                Read the long version <span>→</span>
              </a>
              <span className="text-[#2a2a2f]">·</span>
              <a href="#" className="mono text-[11px] uppercase tracking-[0.2em] text-[#a0a0a8] hover:text-[#f5f2ea] transition-colors">
                Résumé →
              </a>
            </div>
          </div>

          {/* 2. Quick facts */}
          <div className="col-span-12 md:col-span-5 rounded-2xl border border-[#2a2a2f] bg-[#0f0f12]/85 p-5 md:p-6 hover:border-[#ff5c35]/40 transition-colors">
            <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff5c35] mb-5">Five true things</div>
            <div className="space-y-3">
              {[
                { k: "Learning", v: "React Native · long overdue · interesting" },
                { k: "Reading", v: "Shape Up — Ryan Singer" },
                { k: "Peak hours", v: "11pm–4am · quiet hours make the best code" },
                { k: "Soundtrack", v: "Phonk, afrobeat, and old songs that refused to stay old" },
                { k: "Hot Take", v: "HIMYM over Friends · don't ask me to justify it" },
              ].map((f) => (
                <div key={f.k} className="flex items-baseline gap-3 text-sm border-b border-[#1a1a1d] pb-3 last:border-b-0 last:pb-0">
                  <span className="mono text-[10px] uppercase tracking-wider text-[#71717a] w-[85px] flex-shrink-0">{f.k}</span>
                  <span className="text-[#d4d0c8] flex-1">{f.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Now playing — solid orange accent card */}
          <div className="col-span-12 md:col-span-5 rounded-2xl bg-gradient-to-br from-[#ff5c35] via-[#ff6844] to-[#c9431c] p-5 md:p-6 relative overflow-hidden group">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3), transparent 50%)",
            }} />
            <div className="relative">
              <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#0a0a0b]/70 mb-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0a0a0b] blink" />
                Now playing · via Spotify
              </div>
              <div className="flex items-start gap-3 mb-5">
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-lg bg-gradient-to-br from-[#1a1410] via-[#3d2f24] to-[#0a0a0b] flex-shrink-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20" />
                  <div className="absolute bottom-1 right-1 text-[7px] text-white/40 mono">METL</div>
                  <img src={'https://cdn-images.dzcdn.net/images/cover/a01befef9c624c94191c9eb3662eab0c/500x500-000000-80-0-0.jpg'} alt="Ms Jackson" />
                </div>
                <div className="pt-1">
                  <div className="font-bold text-[#0a0a0b] text-base md:text-lg leading-tight">Ms Jackson</div>
                  <div className="text-[#0a0a0b]/70 text-xs md:text-sm mt-1">Outkast · Stankonia</div>
                </div>
              </div>
              <div className="h-1 bg-[#0a0a0b]/25 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-[#0a0a0b] rounded-full" style={{ width: "42%" }} />
              </div>
              <div className="flex justify-between text-[10px] text-[#0a0a0b]/70 mono tabular-nums">
                <span>2:08</span>
                <span>4:30</span>
              </div>
            </div>
          </div>

          {/* 4. Currently reading */}
          <div className="col-span-12 md:col-span-4 rounded-2xl border border-[#2a2a2f] bg-[#0f0f12]/85 p-5 md:p-6 hover:border-[#ff5c35]/40 transition-colors">
            <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff5c35] mb-4">Currently reading</div>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-14 h-20 rounded-sm bg-gradient-to-br from-[#c4956a] via-[#8a6f52] to-[#3d2f24] flex-shrink-0 relative overflow-hidden shadow-lg">
                <div className="absolute top-1 left-1 right-1 text-[6px] text-white/60 mono tracking-widest">BASECAMP</div>
                <div className="absolute bottom-1 left-1 right-1">
                  <img src="https://m.media-amazon.com/images/I/51XUQeaj7qL._SY445_SX342_ML2_.jpg" alt="" />
                </div>
              </div>
              <div className="flex-1 pt-1 min-w-0">
                <div className="serif italic text-lg leading-tight truncate">Burma Boy</div>
                <div className="text-[11px] text-[#a0a0a8] mt-0.5">Biyi Bandele-Thomas</div>
                <div className="text-[10px] text-[#71717a] mt-1">Vintage · 2008</div>
              </div>
            </div>
            <div className="mono text-[10px] text-[#71717a] mb-1.5 flex justify-between">
              <span>Page 14 of 232</span>
              <span className="text-[#ff5c35] font-semibold">16%</span>
            </div>
            <div className="h-0.5 bg-[#2a2a2f] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#ff5c35] to-[#ff8855] rounded-full" style={{ width: "16%" }} />
            </div>
          </div>

          {/* 5. Location + live time */}
          <div className=" max-[385px]:col-span-12 col-span-6 md:col-span-4 rounded-2xl border border-[#2a2a2f] bg-[#0f0f12]/85 p-5 md:p-6 relative overflow-hidden hover:border-[#ff5c35]/40 transition-colors">
            <div className="absolute top-4 right-4 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c8ff3d] blink" />
              <span className="mono text-[9px] uppercase tracking-wider text-[#c8ff3d]">Live</span>
            </div>
            <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff5c35] mb-4">Located at</div>
            <div className="display text-2xl md:text-3xl font-bold mb-1 leading-tight">Lagos, NG</div>
            <div className="text-[#a0a0a8] text-xs md:text-sm mb-4">West Africa Time · UTC+1</div>
            <div className="mono text-3xl md:text-4xl font-light text-[#f5f2ea] tabular-nums tracking-tight">{lagosTime}</div>
            <div className="mono text-[10px] text-[#71717a] mt-1 uppercase tracking-wider">My local</div>
          </div>

          {/* 6. Availability — lime accent card */}
          <div className="max-[385px]:col-span-12 col-span-6 md:col-span-4 rounded-2xl border-2 border-[#c8ff3d]/30 bg-[#c8ff3d]/5 p-5 md:p-6 relative overflow-hidden hover:border-[#c8ff3d]/60 transition-colors">
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-[#c8ff3d]/10 blur-2xl pointer-events-none" />
            <div className="relative">
              <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#c8ff3d] mb-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c8ff3d] blink shadow-[0_0_6px_#c8ff3d]" />
                Available
              </div>
              <div className="display text-xl md:text-2xl font-bold mb-1 leading-[1.1]">Booking for<br /><span className="text-[#c8ff3d]">Q2 2026</span></div>
              <div className="text-[#a0a0a8] text-xs mb-5 mt-2">Taking on 1–2 new projects this quarter.</div>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-[#c8ff3d] text-[#0a0a0b] px-4 py-2 text-[12px] md:text-sm font-semibold hover:bg-[#d9ff6e] transition-colors">
                Book a call <span>→</span>
              </a>
            </div>
          </div>

          {/* 7. Philosophy */}
          <div className="col-span-12 md:col-span-7 rounded-2xl border border-[#2a2a2f] bg-gradient-to-br from-[#0f0f12]/85 to-[#0a0a0b] p-6 md:p-8 relative overflow-hidden hover:border-[#ff5c35]/40 transition-colors">
            <div className="absolute -top-6 -left-2 serif italic text-[120px] text-[#ff5c35]/20 leading-none pointer-events-none select-none">&ldquo;</div>
            <div className="relative">
              <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff5c35] mb-5">How I think</div>
              <p className="text-xl md:text-[26px] font-light leading-[1.4] text-[#f5f2ea] mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Good UI is invisible — until you <em className="italic text-[#ff5c35]">stop to look</em>. Then it&apos;s the details
                that keep you there: the easing curve, the micro-copy, the one interaction that feels built for you specifically.
              </p>
              <div className="mono text-[10px] uppercase tracking-wider text-[#71717a]">— A belief, not a quote</div>
            </div>
          </div>

          {/* 8. Process */}
          <div className="col-span-12 md:col-span-5 rounded-2xl border border-[#2a2a2f] bg-[#0f0f12]/85 p-5 md:p-6 hover:border-[#ff5c35]/40 transition-colors">
            <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff5c35] mb-5">How I work</div>
            <div className="space-y-4">
              {[
                { n: "01", step: "Discover", desc: "Who are users, what's the actual problem?" },
                { n: "02", step: "Wireframe", desc: "Paper first. Layout in HTML. Never straight to final code." },
                { n: "03", step: "Build", desc: "Ship small, test early, iterate tight." },
                { n: "04", step: "Polish", desc: "The last 10% that makes it feel considered." },
              ].map((p, i, arr) => (
                <div key={p.n} className="flex items-start gap-4">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <span className="mono text-[11px] text-[#ff5c35] font-semibold">{p.n}</span>
                    {i < arr.length - 1 && <div className="w-px h-8 bg-gradient-to-b from-[#ff5c35]/40 to-transparent mt-1" />}
                  </div>
                  <div className="pb-2">
                    <div className="text-sm font-semibold text-[#f5f2ea] mb-0.5">{p.step}</div>
                    <div className="text-xs text-[#a0a0a8] leading-relaxed">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ STACK ============ */}
      <section id="stack" className="relative z-10 px-5 md:px-10 pt-24 md:pt-32 pb-20 max-w-[1280px] mx-auto">

        {/* Watermark */}
        <div
          className="absolute left-[-3vw] top-[8vw] display font-bold text-[28vw] md:text-[18vw] leading-none pointer-events-none select-none z-0"
          style={{
            color: "rgba(255, 92, 53, 0.04)",
            WebkitTextStroke: "1px rgba(255, 92, 53, 0.15)",
          }}
        >
          03
        </div>

        {/* Section header */}
        <div className="grid grid-cols-12 gap-4 mb-14 md:mb-16 relative z-10">
          <div className="col-span-12 md:col-span-7">
            <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff5c35] mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#ff5c35]" />
              ( 03 ) &nbsp; The stack
            </div>
            <h2 className="display text-5xl md:text-[72px] font-bold leading-[0.95] tracking-[-0.03em]">
              Tools I <span className="serif italic font-normal text-[#ff5c35]">reach</span> for.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 md:pt-4">
            <p className="text-sm md:text-base text-[#a0a0a8] leading-relaxed">
              Not a checklist of everything I&apos;ve touched — a snapshot of what I pick when I actually have a choice, grouped by what I&apos;m trying to do.
            </p>
          </div>
        </div>

        {/* Daily drivers — 4 featured cards */}
        <div className="mb-16 md:mb-20 relative z-10">
          <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#c8ff3d] mb-4 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c8ff3d] blink shadow-[0_0_6px_#c8ff3d]" />
            Daily drivers · the ones I live in
          </div>
          <div className="grid max-[385px]:grid-cols-1 grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { tool: "Next.js", version: "16.1", since: "2023 · 3y", note: "\"My default. App Router is where I live now. I'll fight Remix apologists politely.\"", accent: "bg-white text-[#0a0a0b]", barColor: "bg-[#f5f5f5]" },
              { tool: "TypeScript", version: "5.x", since: "2022 · 3y", note: "\"I don't start a project without it anymore. Even the 15-line scripts.\"", accent: "bg-[#3178c6] text-white", barColor: "bg-[#3178c6]" },
              { tool: "Tailwind", version: "4", since: "2023 · 3y", note: "\"Opinions aside — it's the fastest way to ship with consistent design tokens.\"", accent: "bg-[#38bdf8] text-[#0a0a0b]", barColor: "bg-[#38bdf8]" },
              { tool: "Motion", version: "11", since: "2024 · 2y", note: "\"The one library that makes micro-interactions feel like they cost more than they did.\"", accent: "bg-[#ff5c35] text-[#0a0a0b]", barColor: "bg-[#ff5c35]" },
            ].map((t) => (
              <div key={t.tool} className="rounded-2xl border border-[#2a2a2f] bg-[#0f0f12]/85 overflow-hidden group hover:border-[#ff5c35]/40 transition-colors">
                {/* Color bar at top */}
                <div className={`h-1.5 ${t.barColor}`} />
                <div className="p-4 md:p-5">
                  <div className="flex items-baseline justify-between mb-4">
                    <h3 className="display text-xl md:text-2xl font-bold leading-none">{t.tool}</h3>
                    <span className={`mono text-[10px] px-1.5 py-0.5 rounded ${t.accent} font-semibold`}>v{t.version}</span>
                  </div>
                 
                  <p className="serif italic text-sm md:text-[14px] text-[#d4d0c8] leading-relaxed">
                    {t.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The full kit — categorized */}
        <div className="mb-16 md:mb-20 relative z-10">
          <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff5c35] mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[#ff5c35]" />
            The full kit · grouped by job
          </div>

          <div className="space-y-5 md:space-y-6">
            {([
              {
                label: "Frontend", sub: "UI & rendering", dot: "bg-[#61dafb]",
                tools: [
                  { name: "React", v: "19" },
                  { name: "Next.js", v: "16" },
                  { name: "Tailwind", v: "4" },
                  { name: "Radix UI" },
                  { name: "shadcn/ui" },
                  { name: "CVA" },
                  { name: "React Hook Form" },
                ],
              },
              {
                label: "Motion", sub: "the stuff people notice", dot: "bg-[#ff5c35]",
                tools: [
                  { name: "Motion", v: "11", featured: true },
                  { name: "GSAP" },
                  { name: "Lenis" },
                  { name: "CSS keyframes" },
                  { name: "View Transitions" },
                ],
              },
              {
                label: "APIs & Integration", sub: "wiring things together", dot: "bg-[#a78bfa]",
                tools: [
                  { name: "RESTful APIs" },
                  { name: "Axios" },
                  { name: "Google Maps API" },
                  { name: "Paystack" },
                  { name: "OAuth" },
                  { name: "Gemini AI", featured: true },
                ],
              },
              {
                label: "Tools & DevOps", sub: "shipping & debugging", dot: "bg-[#94a3b8]",
                tools: [
                  { name: "Git" },
                  { name: "Vercel" },
                  { name: "Digital Ocean" },
                  { name: "Chrome DevTools" },
                  { name: "Postman" },
                ],
              },
              {
                label: "Learning", sub: "currently wrestling with", dot: "bg-[#c8ff3d]", learning: true,
                tools: [
                  { name: "React Native", note: "long overdue" },
                  { name: "WebGL" },
                  { name: "Three.js" },
                  { name: "Bun" },
                ],
              },
            ] as {
              label: string;
              sub: string;
              dot: string;
              learning?: boolean;
              tools: { name: string; v?: string; featured?: boolean; note?: string }[];
            }[]).map((cat) => (
              <div key={cat.label} className="grid grid-cols-12 gap-3 md:gap-6 py-4 md:py-5 border-t border-[#1a1a1d] first:border-t-0 items-start">
                <div className="col-span-12 md:col-span-3 flex items-center gap-2.5">
                  <span className={`h-2 w-2 rounded-full ${cat.dot} ${cat.learning ? "blink shadow-[0_0_6px_#c8ff3d]" : ""}`} />
                  <div>
                    <div className="display text-lg md:text-xl font-bold text-[#f5f2ea]">{cat.label}</div>
                    <div className="mono text-[10px] uppercase tracking-wider text-[#71717a] mt-0.5">{cat.sub}</div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-9 flex flex-wrap gap-1.5 md:gap-2">
                  {cat.tools.map((t) => (
                    <span
                      key={t.name}
                      className={`mono text-[11px] md:text-[12px] border ${t.featured ? "border-[#ff5c35] bg-[#ff5c35]/10 text-[#ff5c35]" : "border-[#26262a] bg-[#111113] text-[#d4d0c8]"} px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:border-[#ff5c35]/60 transition-colors`}
                    >
                      {t.name}
                      {t.v && <span className="text-[9px] text-[#71717a]">{t.v}</span>}
                      {t.note && <span className="text-[9px] text-[#c8ff3d] italic">· {t.note}</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Honest takes */}
        <div className="relative z-10">
          <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff5c35] mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[#ff5c35]" />
            Honest takes · fight me gently
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {[
              {
                hot: "Good motion explains. Bad motion decorates.",
                take: "Most sites animate to look cool. Good ones animate to tell you something — a click registered, content loaded, a mistake happened. Everything else is garnish.",
                rotate: "-rotate-1",
              },
              {
                hot: "AI is a great pair, terrible lead",
                take: "Code generation is easy now. Taste isn't. The gap used to be 'can you write this.' Now it's 'do you know if it should exist.'",
                rotate: "rotate-1",
              },
              {
                hot: "Always be the newbie at something",
                take: "I pick one thing a year that stretches me. This year it's React Native — interesting so far. It keeps the rest of the craft from going stale.",
                rotate: "-rotate-1",
              },
            ].map((op, i) => (
              <div
                key={i}
                className={`rounded-2xl border border-[#2a2a2f] bg-gradient-to-br from-[#0f0f12] to-[#0a0a0b] p-5 md:p-6 relative group hover:border-[#ff5c35]/40 transition-all hover:-translate-y-1 ${op.rotate} hover:rotate-0`}
              >
                <div className="absolute -top-3 left-5 mono text-[9px] uppercase tracking-[0.25em] text-[#0a0a0b] bg-[#ff5c35] px-2 py-1 rounded font-bold">
                  Hot take · {String(i + 1).padStart(2, "0")}
                </div>
                <h4 className="display text-xl md:text-2xl font-bold text-[#f5f2ea] mb-3 mt-2 leading-tight">
                  {op.hot}
                </h4>
                <p className="text-sm text-[#a0a0a8] leading-relaxed">
                  {op.take}
                </p>
                <div className="mt-4 pt-3 border-t border-[#1a1a1d] flex items-center justify-between text-[10px] mono text-[#71717a]">
                  <span className="uppercase tracking-wider">Opinion · held firmly</span>
                  <span className="text-[#ff5c35]">·</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-10 text-center">
            <p className="mono text-[11px] text-[#5c5c63] uppercase tracking-[0.2em]">
              — Opinions held loosely in private, firmly in public.
            </p>
          </div>
        </div>
      </section>

      {/* ============ EXPERIENCE ============ */}
      <section id="experience" className="relative z-10 px-5 md:px-10 pt-24 md:pt-32 pb-20 max-w-[1280px] mx-auto">

        {/* Watermark */}
        <div
          className="absolute right-[-3vw] top-[8vw] display font-bold text-[28vw] md:text-[18vw] leading-none pointer-events-none select-none z-0"
          style={{
            color: "rgba(255, 92, 53, 0.04)",
            WebkitTextStroke: "1px rgba(255, 92, 53, 0.15)",
          }}
        >
          04
        </div>

        {/* Section header */}
        <div className="grid grid-cols-12 gap-4 mb-14 md:mb-20 relative z-10">
          <div className="col-span-12 md:col-span-7">
            <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff5c35] mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#ff5c35]" />
              ( 04 ) &nbsp; Experience
            </div>
            <h2 className="display text-5xl md:text-[72px] font-bold leading-[0.95] tracking-[-0.03em]">
              Where I&apos;ve <span className="serif italic font-normal text-[#ff5c35]">shipped</span>.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 md:pt-4">
            <p className="text-sm md:text-base text-[#a0a0a8] leading-relaxed">
              One lead role, one freelance build, one internship. I&apos;d rather show what I actually did than pad the list with noise.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative z-10">

          {/* "Present" marker */}
          <div className="flex items-center gap-4 mb-8 md:pl-6">
            <div className="relative">
              <div className="h-3 w-3 rounded-full bg-[#c8ff3d] blink shadow-[0_0_12px_#c8ff3d]" />
            </div>
            <div>
              <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#c8ff3d]">Present</div>
              <div className="text-sm text-[#a0a0a8]">Between roles · available Q2 2026</div>
            </div>
          </div>

          <div className="relative md:pl-6">
            {/* Vertical line */}
            <div className="absolute left-[5px] md:left-[6px] top-0 bottom-12 w-px bg-gradient-to-b from-[#c8ff3d] via-[#ff5c35] to-[#2a2a2f]" />

            {/* ============ SONICHOICE — FREELANCE CARD ============ */}
            <div className="relative pl-8 md:pl-10 pb-12 md:pb-16">
              <div className="absolute left-0 top-6 h-3 w-3 rounded-full bg-[#ff5c35] shadow-[0_0_12px_#ff5c35]" style={{ boxShadow: "0 0 0 4px rgba(255,92,53,0.15)" }} />

              <div className="rounded-2xl border border-[#2a2a2f] bg-[#0f0f12]/85 p-5 md:p-7 relative overflow-hidden group hover:border-[#ff5c35]/40 transition-colors">
                <div className="relative">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="mono text-[10px] uppercase tracking-[0.25em] border border-[#ff5c35]/40 bg-[#ff5c35]/5 text-[#ff5c35] px-2.5 py-1 rounded font-semibold">
                      Freelance · client engagement
                    </span>
                    <span className="mono text-[11px] text-[#a0a0a8] uppercase tracking-wider">
                      2026 · multi-month build
                    </span>
                  </div>

                  <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                    <div>
                      <h3 className="display text-2xl md:text-3xl font-bold leading-[1.05] tracking-[-0.02em] mb-2">
                        Frontend Developer <span className="text-[#71717a] font-normal">—</span>
                      </h3>
                      <div className="flex items-baseline gap-2.5 flex-wrap">
                        <span className="display text-xl md:text-2xl font-semibold text-[#ff5c35]">Sonichoice Logistics</span>
                        <span className="text-sm text-[#71717a]">·</span>
                        <span className="text-sm text-[#a0a0a8]">Delivery operations platform</span>
                      </div>
                    </div>
                    <a href="https://sonichoice-inventory-management.vercel.app" target="_blank" rel="noreferrer" className="mono text-[10px] uppercase tracking-[0.2em] text-[#a0a0a8] hover:text-[#ff5c35] border-b border-[#2a2a2f] hover:border-[#ff5c35] pb-0.5 transition-colors">
                      sonichoice.vercel.app →
                    </a>
                  </div>

                  <p className="text-[14px] md:text-[15px] text-[#d4d0c8] leading-relaxed mb-5 max-w-3xl">
                    End-to-end delivery ops platform for a Nigerian multi-branch logistics company — parcel tracking, branch management, merchant profiles, role-based access, and full audit trails of every movement. Landing page + full authenticated app shell, shipped from scratch.
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-5 pb-5 border-b border-[#1a1a1d]">
                    {[
                      { v: "Next 16", l: "On bleeding edge" },
                      { v: "React 19", l: "Latest release" },
                      { v: "2 roles", l: "Admin + staff scoping" },
                      { v: "PDF + XLSX", l: "Client-side exports" },
                    ].map((m, i) => (
                      <div key={i} className="border-l-2 border-[#ff5c35] pl-3">
                        <div className="display text-base md:text-lg font-bold text-[#f5f2ea] leading-tight">{m.v}</div>
                        <div className="mono text-[9px] uppercase tracking-wider text-[#71717a] mt-1 leading-tight">{m.l}</div>
                      </div>
                    ))}
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2.5 mb-5">
                    {[
                      "Built JWT auth with access + refresh token flow and concurrent-request refresh protection — no duplicate refresh calls even under parallel fetches.",
                      "Implemented role-aware route middleware; staff-only navigation items hide at render time for non-admins, not just at the API.",
                      "Shipped client-side PDF (jsPDF + autoTable) and Excel (ExcelJS) export across Parcels, Inventory, and Merchants — no backend dependency, fully branded.",
                      "Debounced search (400ms), race-condition protection on detail panels, URL-param deep-linking across every list view.",
                    ].map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#d4d0c8] leading-relaxed">
                        <span className="text-[#ff5c35] mt-1 text-[8px] flex-shrink-0">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {["Next.js 16", "React 19", "TypeScript 5", "Tailwind 4", "jsPDF", "ExcelJS", "lucide-react"].map((t) => (
                      <span key={t} className="mono text-[10px] border border-[#26262a] bg-[#111113] text-[#a0a0a8] px-2 py-0.5 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#1a1a1d] flex items-center justify-between">
                    <span className="mono text-[10px] uppercase tracking-wider text-[#5c5c63]">Full case preview</span>
                    <a href="#work" className="mono text-[11px] text-[#ff5c35] hover:text-[#ff7a5c] uppercase tracking-[0.15em] flex items-center gap-1.5">
                      See in Work →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ============ AFRIKDISH — HERO CARD ============ */}
            <div className="relative pl-8 md:pl-10 pb-12 md:pb-16">
              <div className="absolute left-0 top-6 h-4 w-4 rounded-full bg-[#ff5c35] shadow-[0_0_16px_#ff5c35]" style={{ boxShadow: "0 0 0 5px rgba(255,92,53,0.2)" }} />

              <div className="rounded-2xl border border-[#2a2a2f] bg-gradient-to-br from-[#0f0f12]/90 to-[#0a0a0b] p-6 md:p-8 relative overflow-hidden group hover:border-[#ff5c35]/50 transition-colors">
                <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-[#ff5c35]/8 blur-3xl pointer-events-none" />

                <div className="relative">
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="mono text-[10px] uppercase tracking-[0.25em] bg-[#ff5c35] text-[#0a0a0b] px-2.5 py-1 rounded font-bold">
                      Lead role · current anchor
                    </span>
                    <span className="mono text-[11px] text-[#a0a0a8] uppercase tracking-wider">
                      Oct 2024 — Nov 2025 · 14 months
                    </span>
                  </div>

                  <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
                    <div>
                      <h3 className="display text-3xl md:text-[44px] font-bold leading-[1] tracking-[-0.025em] mb-3">
                        Lead Frontend Developer
                      </h3>
                      <div className="flex items-baseline gap-2.5 flex-wrap">
                        <span className="display text-xl md:text-2xl font-semibold text-[#ff5c35]">AfrikDish</span>
                        <span className="text-sm text-[#71717a]">·</span>
                        <span className="text-sm text-[#a0a0a8]">Canadian food marketplace SaaS</span>
                      </div>
                    </div>
                    <a href="https://afrikdish.com" target="_blank" rel="noreferrer" className="mono text-[10px] uppercase tracking-[0.2em] text-[#a0a0a8] hover:text-[#ff5c35] border-b border-[#2a2a2f] hover:border-[#ff5c35] pb-0.5 transition-colors">
                      afrikdish.com →
                    </a>
                  </div>

                  <p className="text-[15px] md:text-base text-[#e8e4d8] leading-relaxed mb-6 max-w-3xl">
                    Led the full frontend rebuild of a Canadian food-marketplace SaaS — architecture redesign, auth, cart + checkout, multi-tier category system, and (after a team restructure) the UI/UX design work itself. Owned the whole surface end-users saw.
                  </p>

                  {/* Big metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 pb-6 border-b border-[#1a1a1d]">
                    {[
                      { v: "60%", l: "Faster initial loads" },
                      { v: "85%", l: "Fewer runtime errors" },
                      { v: "15k+", l: "Lines of TypeScript" },
                      { v: "7+", l: "Product categories" },
                    ].map((m, i) => (
                      <div key={i} className="border-l-2 border-[#ff5c35] pl-3">
                        <div className="display text-2xl md:text-[32px] font-bold text-[#f5f2ea] leading-none">
                          {m.v}
                        </div>
                        <div className="mono text-[9px] md:text-[10px] uppercase tracking-wider text-[#71717a] mt-2 leading-tight">{m.l}</div>
                      </div>
                    ))}
                  </div>

                  <ul className="space-y-3 mb-6">
                    {[
                      "Spearheaded complete frontend architecture rebuild — cut initial page load by 60% via Next.js SSR and skeleton-loading patterns.",
                      "Designed scalable data structures for 7+ product categories with multi-tiered categorization, ready for catalog growth.",
                      "Shipped Google OAuth + email verification, Maps APIs for location services, and full end-to-end cart + checkout workflows.",
                      "Enforced 100% TypeScript across 15,000+ lines of production code — cut runtime errors by 85%, lifted dev velocity by ~30%.",
                      "Took on UI/UX design responsibilities after team restructuring — shipped production-grade interfaces without a dedicated designer on the team, working from prior design references and product direction.",
                    ].map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-[14px] md:text-[15px] text-[#d4d0c8] leading-relaxed">
                        <span className="text-[#ff5c35] mt-1.5 text-[8px] flex-shrink-0">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {["Next.js", "React", "TypeScript", "Tailwind", "Google OAuth", "Google Maps API", "Axios"].map((t) => (
                      <span key={t} className="mono text-[10px] md:text-[11px] border border-[#26262a] bg-[#111113] text-[#a0a0a8] px-2.5 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ============ GENESYS — COMPACT INTERN CARD ============ */}
            <div className="relative pl-8 md:pl-10 pb-4">
              <div className="absolute left-0 top-6 h-2.5 w-2.5 rounded-full bg-[#71717a]" style={{ boxShadow: "0 0 0 3px rgba(113,113,122,0.15)" }} />

              <div className="rounded-2xl border border-[#1f1f24] bg-[#0a0a0b]/60 p-5 md:p-6 relative group hover:border-[#2a2a2f] transition-colors">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="mono text-[10px] uppercase tracking-[0.25em] border border-[#2a2a2f] bg-[#111113] text-[#a0a0a8] px-2 py-0.5 rounded">
                    Internship · entry point
                  </span>
                  <span className="mono text-[11px] text-[#71717a] uppercase tracking-wider">
                    May — Dec 2022 · 7 months
                  </span>
                </div>

                <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                  <div>
                    <h3 className="display text-xl md:text-2xl font-bold leading-tight mb-1">
                      Frontend Developer Intern
                    </h3>
                    <div className="flex items-baseline gap-2 flex-wrap text-sm text-[#a0a0a8]">
                      <span className="font-semibold text-[#d4d0c8]">Genesys Tech Hub</span>
                      <span className="text-[#71717a]">·</span>
                      <span>Enugu, Nigeria · training & dev center</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4 max-w-md">
                  {[
                    { v: "8+", l: "UI components" },
                    { v: "3", l: "Production apps" },
                    { v: "25%", l: "Smaller bundles" },
                  ].map((m, i) => (
                    <div key={i} className="border-l border-[#2a2a2f] pl-3">
                      <div className="display text-base md:text-lg font-bold text-[#d4d0c8] leading-tight">{m.v}</div>
                      <div className="mono text-[9px] uppercase tracking-wider text-[#5c5c63] mt-1 leading-tight">{m.l}</div>
                    </div>
                  ))}
                </div>

                <p className="text-[13px] md:text-sm text-[#a0a0a8] leading-relaxed mb-3">
                  Built 8+ responsive UI components across client projects, integrated REST APIs (auth, data fetching, real-time updates) for 3 production apps, and brought bundle sizes down 25% through code splitting and lazy loading. First real reps.
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {["React", "REST APIs", "Modern CSS"].map((t) => (
                    <span key={t} className="mono text-[10px] border border-[#1f1f24] bg-[#0f0f12] text-[#71717a] px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* "Career start" marker */}
            <div className="flex items-center gap-4 mt-4">
              <div className="h-2 w-2 rounded-full bg-[#2a2a2f] ml-[2px] md:ml-[3px]" />
              <div>
                <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#5c5c63]">Career start · May 2022</div>
              </div>
            </div>
          </div>
        </div>

        {/* Honest callout about career shape */}
        <div className="mt-16 md:mt-20 text-center border-t border-[#1a1a1d] pt-10 relative z-10">
          <p className="mono text-[11px] text-[#5c5c63] uppercase tracking-[0.2em] max-w-xl mx-auto leading-relaxed">
            Short list, deep work · I&apos;d rather own fewer roles end-to-end than collect many halfway.
          </p>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="relative z-10 px-5 md:px-10 pt-24 md:pt-32 pb-20 max-w-[1280px] mx-auto">

        {/* Watermark */}
        <div
          className="absolute left-[-3vw] top-[8vw] display font-bold text-[28vw] md:text-[18vw] leading-none pointer-events-none select-none z-0"
          style={{
            color: "rgba(255, 92, 53, 0.04)",
            WebkitTextStroke: "1px rgba(255, 92, 53, 0.15)",
          }}
        >
          05
        </div>

        {/* Section header */}
        <div className="grid grid-cols-12 gap-4 mb-10 md:mb-12 relative z-10">
          <div className="col-span-12">
            <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff5c35] mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#ff5c35]" />
              ( 05 ) &nbsp; Contact
            </div>
          </div>
        </div>

        {/* Big closing pitch */}
        <div className="grid grid-cols-12 gap-4 mb-14 md:mb-20 relative z-10">
          <div className="col-span-12 md:col-span-8">
            <h2 className="display text-5xl md:text-[80px] font-bold leading-[0.95] tracking-[-0.035em] mb-6">
              You&apos;ve read this far.<br />
              <span className="serif italic font-normal text-[#ff5c35]">Now take the shot.</span>
            </h2>
            <p className="text-[#a0a0a8] text-lg leading-relaxed max-w-xl">
              Pitch something messy, pitch something polished, pitch something you&apos;re not sure about. Worst case, you get an honest no with a referral.
            </p>
          </div>

          {/* Status pill stack on the right */}
          <div className="col-span-12 md:col-span-3 md:col-start-10 flex flex-col gap-2.5 md:pt-3">
            <div className="flex items-center gap-2 rounded-full border border-[#c8ff3d]/40 bg-[#c8ff3d]/5 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c8ff3d] blink shadow-[0_0_6px_#c8ff3d]" />
              <span className="mono text-[10px] uppercase tracking-wider text-[#c8ff3d]">Available · Q2 2026</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#2a2a2f] bg-[#0f0f12] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5c35]" />
              <span className="mono text-[10px] uppercase tracking-wider text-[#a0a0a8]">Replies within 24h</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#2a2a2f] bg-[#0f0f12] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8a9bb0]" />
              <span className="mono text-[10px] uppercase tracking-wider text-[#a0a0a8]">WAT · UTC+1</span>
            </div>
          </div>
        </div>

        {/* Action cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-14 md:mb-20 relative z-10">

          {/* Email card — click to copy */}
          <div className="md:col-span-2 rounded-2xl bg-gradient-to-br from-[#ff5c35] via-[#ff6844] to-[#c9431c] p-6 md:p-7 relative overflow-hidden group">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
              backgroundImage: "radial-gradient(circle at 85% 15%, rgba(255,255,255,0.4), transparent 50%)",
            }} />
            <div className="relative">
              <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#0a0a0b]/70 mb-4 flex items-center gap-2">
                <span>→</span> The best way · email
              </div>

              <button
                type="button"
                onClick={() => handleCopyEmail("alfred.nwankwo719@gmail.com")}
                className="w-full text-left group/btn"
              >
                <div className="display text-3xl md:text-[44px] font-bold text-[#0a0a0b] mb-3 break-all leading-tight tracking-[-0.02em] group-hover/btn:text-[#1a0f04] transition-colors">
                  alfred.nwankwo719@gmail.com
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#0a0a0b] text-[#ff5c35] px-4 py-2 text-[12px] font-semibold mono uppercase tracking-wider group-hover/btn:bg-[#1a1410] transition-colors">
                  {copied ? (
                    <>
                      <span>✓</span> Copied to clipboard
                    </>
                  ) : (
                    <>
                      <span>⧉</span> Click to copy
                    </>
                  )}
                </div>
              </button>

              <div className="mt-5 pt-4 border-t border-[#0a0a0b]/20 text-[13px] text-[#0a0a0b]/80 leading-relaxed">
                Include a sentence on what you&apos;re building, a link if it exists, and roughly when you want to start. That&apos;s enough — I&apos;ll reply with the right questions.
              </div>
            </div>
          </div>

          {/* Book a call */}
          <div className="rounded-2xl border border-[#2a2a2f] bg-[#0f0f12]/85 p-6 relative overflow-hidden group hover:border-[#c8ff3d]/40 transition-colors flex flex-col">
            <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#c8ff3d] mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c8ff3d] blink shadow-[0_0_6px_#c8ff3d]" />
              Prefer to talk? · 30 min
            </div>
            <h4 className="display text-xl md:text-[22px] font-bold mb-3 leading-tight">
              Book a discovery call.
            </h4>
            <p className="text-xs md:text-[13px] text-[#a0a0a8] leading-relaxed mb-5 flex-1">
              No pitch deck, no pre-qualification form. Tell me what you&apos;re thinking, I&apos;ll tell you if I&apos;m right for it.
            </p>
            <button
              type="button"
              data-cal-namespace="discovery-call"
              data-cal-link="alfred-nwankwo/discovery-call"
              data-cal-config='{"layout":"month_view","theme":"dark"}'
              className="inline-flex items-center gap-2 rounded-full bg-[#c8ff3d] text-[#0a0a0b] px-5 py-2.5 text-sm font-semibold hover:bg-[#d9ff6e] transition-colors w-fit cursor-pointer"
            >
              Open calendar
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Fit check — two honest columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-14 md:mb-20 relative z-10">

          {/* Best at */}
          <div className="rounded-2xl border border-[#2a2a2f] bg-[#0f0f12]/85 p-6 md:p-7 hover:border-[#ff5c35]/40 transition-colors">
            <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff5c35] mb-5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#ff5c35]" /> Best at
            </div>
            <div className="space-y-3">
              {[
                "Motion-forward marketing sites and landing pages",
                // "Full product-app frontends (auth, dashboards, complex state)",
                "Taking rough designs or references and raising the bar on them in code",
                "Owning the UI/UX when the designer isn't around",
                "React / Next.js builds with real CSS + real motion",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-[#d4d0c8] leading-relaxed">
                  <span className="text-[#ff5c35] mt-1 flex-shrink-0">+</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Not my thing */}
          <div className="rounded-2xl border border-[#2a2a2f] bg-[#0a0a0b]/60 p-6 md:p-7">
            <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#71717a] mb-5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#71717a]" /> Honestly not my thing
            </div>
            <div className="space-y-3">
              {[
                "Products I can't see growing (I'd rather pass than fake belief)",
                "Short \"turn this PDF into HTML\" commodity gigs",
                "Projects where motion is the first thing to get cut",
                "Unpaid spec work or \"we'll discuss budget after\"",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-[#a0a0a8] leading-relaxed">
                  <span className="text-[#5c5c63] mt-1 flex-shrink-0">−</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Socials */}
        <div className="border-t border-[#1a1a1d] pt-10 md:pt-12 relative z-10">
          <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#5c5c63] mb-6 text-center">
            or find me scattered across →
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {[
              { name: "GitHub", handle: "@alfrednwankwo", url: "https://github.com/Alfred-6578" },
              { name: "X / Twitter", handle: "@alfrednwankwo", url: "https://x.com/Alfred_719" },
              { name: "LinkedIn", handle: "alfred-nwankwo", url: "https://www.linkedin.com/in/alfred-nwankwo/" },
              { name: "Read.cv", handle: "alfrednwankwo", url: "/resume" },
              { name: "Email", handle: "alfred.nwankwo719@gmail.com", url: "mailto:alfred.nwankwo719@gmail.com" },
            ].map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-[#2a2a2f] bg-[#0f0f12] hover:border-[#ff5c35] hover:bg-[#111113] px-4 py-2 transition-all"
              >
                <span className="mono text-xs text-[#d4d0c8] group-hover:text-[#f5f2ea] transition-colors">{s.name}</span>
                <span className="mono text-[10px] text-[#71717a] group-hover:text-[#ff5c35] transition-colors">{s.handle}</span>
                <span className="text-[#ff5c35] text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BIG FOOTER ============ */}
      <footer className="relative z-10 border-t border-[#1a1a1d] bg-gradient-to-b from-[#0a0a0b] to-[#050506] overflow-hidden">

        {/* Huge wordmark */}
        <div className="px-5 md:px-10 pt-16 md:pt-24 pb-6 max-w-[1280px] mx-auto relative">
          <div className="relative">
            <h2 className="display font-bold text-[26vw] md:text-[22vw] leading-[0.85] tracking-[-0.045em] text-[#f5f2ea] select-none">
              ALFRED<span className="text-[#ff5c35]">.</span>
            </h2>
            {/* Italic annotation absolute */}
            <span className="absolute bottom-[18%] right-[5%] md:right-[8%] serif italic text-sm md:text-lg text-[#71717a] max-w-[200px] text-right hidden md:block">
              (nwankwo, in case you forgot — web dev, lagos, ready when you are)
            </span>
          </div>
        </div>

        {/* Footer meta row */}
        <div className="px-5 md:px-10 py-8 max-w-[1280px] mx-auto border-t border-[#1a1a1d]">
          <div className="grid grid-cols-12 gap-4 items-start">

            {/* Nav back-up */}
            <div className="col-span-6 md:col-span-3">
              <div className="mono text-[10px] uppercase tracking-[0.25em] text-[#5c5c63] mb-4">Navigate</div>
              <div className="space-y-2 mono text-[11px]">
                {[
                  { l: "Home", n: "00" },
                  { l: "Work", n: "01" },
                  { l: "About", n: "02" },
                  { l: "Stack", n: "03" },
                  { l: "Experience", n: "04" },
                  { l: "Contact", n: "05" },
                ].map((item) => (
                  <a key={item.l} href={`#${item.l.toLowerCase()}`} className="flex items-center gap-2 text-[#a0a0a8] hover:text-[#ff5c35] transition-colors">
                    <span className="text-[#5c5c63]">{item.n}</span>
                    <span>{item.l}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Elsewhere */}
            <div className="col-span-6 md:col-span-3">
              <div className="mono text-[10px] uppercase tracking-[0.25em] text-[#5c5c63] mb-4">Elsewhere</div>
              <div className="space-y-2 mono text-[11px]">
                {[
                  { name: "GitHub", handle: "@alfrednwankwo", url: "https://github.com/Alfred-6578" },
                  { name: "X / Twitter", handle: "@alfrednwankwo", url: "https://x.com/Alfred_719" },
                  { name: "LinkedIn", handle: "alfred-nwankwo", url: "https://www.linkedin.com/in/alfred-nwankwo/" },
                  { name: "Read.cv", handle: "alfrednwankwo", url: "/resume" },
                  { name: "Email", handle: "alfred.nwankwo719@gmail.com", url: "mailto:alfred.nwankwo719@gmail.com" },
                ].map((s) => (
                  <a key={s.name} href={s.url} className="flex items-center gap-2 text-[#a0a0a8] hover:text-[#ff5c35] transition-colors">
                    <span className="text-[#ff5c35]">↗</span>
                    <span>{s.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Meta */}
            <div className="col-span-12 md:col-span-6 md:text-right">
              <div className="mono text-[10px] uppercase tracking-[0.25em] text-[#5c5c63] mb-4 md:mb-5">Colophon</div>
              <p className="text-sm text-[#a0a0a8] leading-relaxed mb-3">
                Designed and built by Alfred Nwankwo, in Lagos.
              </p>
              <p className="mono text-[11px] text-[#71717a] leading-relaxed">
                Next.js 16 · Motion · Tailwind 4 · Bricolage Grotesque · Instrument Serif · 3am energy.
              </p>
              <p className="mono text-[11px] text-[#5c5c63] mt-3" suppressHydrationWarning>
                Portfolio v.004 · updated {new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t border-[#1a1a1d] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 mono text-[10px] uppercase tracking-[0.25em] text-[#5c5c63]">
              <span>© 2026 Alfred Nwankwo</span>
              <span className="text-[#2a2a2f]">·</span>
              <span>All work shown is real, except the stuff marked placeholder.</span>
            </div>
            <div className="flex items-center gap-2 mono text-[10px] uppercase tracking-[0.25em] text-[#5c5c63]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c8ff3d] blink shadow-[0_0_6px_#c8ff3d]" />
              <span className="text-[#c8ff3d]">Lagos · {lagosTime}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
