import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="min-h-screen bg-[#0a0a0b] text-[#f5f2ea] overflow-x-hidden relative selection:bg-[#ff5c35] selection:text-[#0a0a0b] flex flex-col"
      style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}
    >
      <style>{`
        .display { font-family: var(--font-bricolage), sans-serif; font-variation-settings: 'wdth' 92; }
        .mono { font-family: var(--font-jetbrains), ui-monospace, monospace; }
        .serif { font-family: var(--font-instrument), serif; }
        @keyframes blink404 { 50% { opacity: 0.25; } }
        .blink404 { animation: blink404 1.2s ease-in-out infinite; }
        @keyframes driftGlyph { 0%, 100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-10px) rotate(2deg); } }
      `}</style>

      {/* Ambient background orbs — same visual vocabulary as the landing */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[15%] -right-[12%] h-[520px] w-[520px] rounded-full bg-[#ff5c35]/10 blur-[130px]" />
        <div className="absolute bottom-[8%] -left-[10%] h-[420px] w-[420px] rounded-full bg-[#c8ff3d]/5 blur-[110px]" />
      </div>

      {/* NAV — mirrors the case-study page so 404 still feels inside the site */}
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 md:px-10 py-5 bg-[#0a0a0b]/70 backdrop-blur-md border-b border-[#1a1a1d]/60">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative h-9 w-9 rounded-full bg-[#ff5c35] flex items-center justify-center">
            <span className="display text-[#0a0a0b] font-bold text-[13px]">AN</span>
          </div>
          <span className="display font-semibold text-[15px]">
            Alfred<span className="text-[#ff5c35]">.</span>
          </span>
        </Link>

        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 rounded-full border border-[#2a2a2f] bg-[#111113] pl-5 pr-1.5 py-1.5 text-[13px] hover:border-[#ff5c35] transition-all"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ff5c35] text-[#0a0a0b] text-[11px] transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          Go home
        </Link>
      </nav>

      {/* CONTENT */}
      <section className="flex-1 flex items-center justify-center relative z-10 max-w-[1280px] mx-auto px-5 md:px-10 pt-32 md:pt-40 pb-20 w-full">
        <div className="w-full max-w-3xl">
          {/* status tag */}
          <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff5c35] mb-8 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#ff5c35] blink404 shadow-[0_0_8px_#ff5c35]" />
            Error · 404 · Lost
          </div>

          {/* giant display */}
          <h1 className="display font-bold leading-[0.85] tracking-[-0.04em] mb-8 flex flex-col md:flex-row md:items-end gap-3 md:gap-6">
            <span className="text-[140px] md:text-[220px]">404</span>
            <span
              className="serif italic font-normal text-[#ff5c35] text-4xl md:text-6xl mb-4 md:mb-8"
              style={{ animation: "driftGlyph 6s ease-in-out infinite" }}
            >
              not in the archive
            </span>
          </h1>

          {/* copy */}
          <p className="text-[#a0a0a8] text-base md:text-lg leading-relaxed max-w-xl mb-10">
            Either the link went stale, or you&apos;re a step ahead — the page
            just isn&apos;t built yet. Here&apos;s the way back.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 mb-14">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-full bg-[#ff5c35] text-[#0a0a0b] px-6 py-3 text-sm font-semibold hover:bg-[#ff7a5c] transition-colors"
            >
              Back to home
              <span>→</span>
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-3 rounded-full border border-[#2a2a2f] bg-[#111113] px-6 py-3 text-sm hover:border-[#ff5c35] transition-all"
            >
              Browse work
              <span>→</span>
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 rounded-full border border-[#2a2a2f] bg-[#111113] px-6 py-3 text-sm hover:border-[#c8ff3d] transition-all"
            >
              Say hello
              <span>→</span>
            </Link>
          </div>

          {/* hint card — for when the bad link came from Alfred himself */}
          <div className="rounded-2xl border border-[#2a2a2f] bg-[#0f0f12]/85 p-5 md:p-6 relative overflow-hidden max-w-xl">
            <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#8b8b94] mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#71717a]" />
              If you got here from a link I shared
            </div>
            <p className="text-sm text-[#d4d0c8] leading-relaxed">
              Something on my end is broken.{" "}
              <Link
                href="/#contact"
                className="text-[#ff5c35] hover:text-[#ff7a5c] border-b border-[#ff5c35]/40 hover:border-[#ff5c35] pb-0.5 transition-colors"
              >
                Tell me where it was
              </Link>{" "}
              and I&apos;ll patch it — or just reply with what you were actually
              trying to see.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
