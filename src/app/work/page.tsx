import type { Metadata } from "next";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work — Alfred Nwankwo",
  description: "Every project in the archive, newest first.",
};

export default function WorkIndexPage() {
  return (
    <main
      className="min-h-screen bg-[#0a0a0b] text-[#f5f2ea] overflow-x-hidden relative selection:bg-[#ff5c35] selection:text-[#0a0a0b]"
      style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}
    >
      <style>{`
        .display { font-family: var(--font-bricolage), sans-serif; font-variation-settings: 'wdth' 92; }
        .mono { font-family: var(--font-jetbrains), ui-monospace, monospace; }
        .serif { font-family: var(--font-instrument), serif; }
      `}</style>

      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 md:px-10 py-5 bg-[#0a0a0b]/70 backdrop-blur-md border-b border-[#1a1a1d]/60">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative h-9 w-9 rounded-full bg-[#ff5c35] flex items-center justify-center">
            <span className="display text-[#0a0a0b] font-bold text-[13px]">AN</span>
          </div>
          <span className="display font-semibold text-[15px]">Alfred<span className="text-[#ff5c35]">.</span></span>
        </Link>

        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 rounded-full border border-[#2a2a2f] bg-[#111113] pl-5 pr-1.5 py-1.5 text-[13px] hover:border-[#ff5c35] transition-all"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ff5c35] text-[#0a0a0b] text-[11px] transition-transform group-hover:-translate-x-0.5">←</span>
          Back home
        </Link>
      </nav>

      {/* HEADER */}
      <section className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-10 pt-32 md:pt-40 pb-16">
        <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff5c35] mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-[#ff5c35]" />
          Work · The archive
        </div>
        <h1 className="display text-5xl md:text-[88px] font-bold leading-[0.95] tracking-[-0.035em] mb-6">
          Every project,<br />
          <span className="serif italic font-normal text-[#ff5c35]">newest first</span>.
        </h1>
        <p className="text-base md:text-lg text-[#a0a0a8] leading-relaxed max-w-2xl">
          Click any entry to open the full case study — role, timeline, highlights, technical decisions, and screenshots. Everything is real; nothing is mocked.
        </p>
      </section>

      {/* GRID */}
      <section className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-10 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {PROJECTS.map((p, i) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="group relative flex flex-col rounded-2xl border border-[#2a2a2f] bg-[#0f0f12]/85 p-6 md:p-7 hover:border-[#ff5c35]/40 transition-colors"
            >
              <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff5c35] mb-5 flex items-center gap-2">
                <span className="text-[#8b8b94]">({String(i + 1).padStart(2, "0")})</span>
                <span>{p.year}</span>
                <span className="text-[#8b8b94]">·</span>
                <span className="text-[#a0a0a8]">{p.type}</span>
              </div>

              <h2 className="display text-3xl md:text-4xl font-bold leading-[1.05] tracking-[-0.025em] mb-3">
                {p.name}<span className="text-[#ff5c35]">.</span>
              </h2>

              {p.role && (
                <div className="mono text-[10px] uppercase tracking-wider text-[#a0a0a8] mb-4">
                  {p.role}
                </div>
              )}

              <p className="text-[14px] md:text-[15px] text-[#a0a0a8] leading-relaxed mb-5 line-clamp-3">
                {p.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {p.stack.slice(0, 5).map((s) => (
                  <span key={s} className="mono text-[10px] border border-[#26262a] bg-[#111113] text-[#a0a0a8] px-2 py-0.5 rounded-full">
                    {s}
                  </span>
                ))}
                {p.stack.length > 5 && (
                  <span className="mono text-[10px] text-[#8b8b94] px-2 py-0.5">+{p.stack.length - 5}</span>
                )}
              </div>

              <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#1a1a1d]">
                <span className="mono text-[11px] uppercase tracking-[0.2em] text-[#a0a0a8] group-hover:text-[#f5f2ea] transition-colors">
                  Open case study
                </span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ff5c35] text-[#0a0a0b] text-[11px] transition-transform group-hover:rotate-45">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Back to home */}
        <div className="mt-20 text-center">
          <Link
            href="/#work"
            className="mono text-[11px] uppercase tracking-[0.25em] text-[#a0a0a8] hover:text-[#f5f2ea] border-b border-[#2a2a2f] hover:border-[#ff5c35] pb-0.5 transition-colors"
          >
            ← Back to featured work
          </Link>
        </div>
      </section>
    </main>
  );
}
