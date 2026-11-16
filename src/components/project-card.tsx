"use client";

import { useState } from "react";
import Link from "next/link";
import { BrowserFrame, PreviewLiveNav, ScrollingPreview } from "@/components/browser-frame";
import { useInView, useNearView } from "@/components/use-in-view";
import type { Project } from "@/lib/projects";

export function ProjectCard({
  project,
  index,
  flipped,
}: {
  project: Project;
  index: number;
  flipped: boolean;
}) {
  const [cardRef, inView] = useInView(0.35);
  const [frameRef, near] = useNearView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={cardRef}
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`absolute ${flipped ? "right-[-2vw] md:right-[-1vw]" : "left-[-2vw] md:left-[-1vw]"} top-[-4vw] md:top-[-3vw] display font-bold text-[24vw] md:text-[16vw] leading-none pointer-events-none select-none z-0 transition-colors`}
        style={{
          color: inView ? "rgba(255, 92, 53, 0.06)" : "rgba(255, 92, 53, 0.03)",
          WebkitTextStroke: inView ? "1px rgba(255, 92, 53, 0.25)" : "1px rgba(255, 92, 53, 0.1)",
        }}
      >
        {String(index).padStart(2, "0")}
      </div>

      <div className={`relative z-10 grid grid-cols-12 gap-6 md:gap-10 items-center ${flipped ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div className={`col-span-12 md:col-span-5 ${flipped ? "md:col-start-8" : ""}`}>
          <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff5c35] mb-4 flex items-center gap-3">
            <span className="text-[#8b8b94]">({String(index).padStart(2, "0")})</span>
            <span className="h-px flex-1 max-w-[40px] bg-[#2a2a2f]" />
            <span>{project.year}</span>
            <span className="text-[#8b8b94]">·</span>
            <span className="text-[#a0a0a8]">{project.type}</span>
          </div>

          <h3 className="display text-4xl md:text-5xl font-bold leading-[1] tracking-[-0.025em] mb-4">
            {project.name}<span className="text-[#ff5c35]">.</span>
          </h3>

          <p className="text-[15px] md:text-base text-[#a0a0a8] leading-relaxed mb-5 max-w-md">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.stack.map((t) => (
              <span key={t} className="mono text-[10px] md:text-[11px] border border-[#26262a] bg-[#111113] text-[#a0a0a8] px-2.5 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <a href={`https://${project.url}`} target="_blank" rel="noreferrer" className="cta-primary group/btn inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-[13px] font-semibold text-[#0a0a0b] transition-all">
              View live
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#0a0a0b] text-[#ff5c35] text-[10px] transition-transform group-hover/btn:rotate-45">↗</span>
            </a>
            <Link href={`/work/${project.slug}`} className="mono text-[11px] uppercase tracking-[0.2em] text-[#a0a0a8] hover:text-[#f5f2ea] border-b border-[#2a2a2f] hover:border-[#ff5c35] pb-0.5 transition-colors">
              Case study
            </Link>
          </div>

          {project.stats && (
            <div className="mt-7 grid grid-cols-3 gap-4 max-w-sm">
              {project.stats.map((s, i) => (
                <div key={i} className="border-l border-[#2a2a2f] pl-3">
                  <div className="display text-xl md:text-2xl font-bold text-[#f5f2ea] leading-none">
                    {s.value}
                  </div>
                  <div className="mono text-[9px] uppercase tracking-widest text-[#8b8b94] mt-1.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={`col-span-12 md:col-span-7 ${flipped ? "md:col-start-1 md:row-start-1" : ""} relative`}>
          <div className="absolute top-3 right-3 z-30 mono text-[9px] uppercase tracking-widest text-[#c8ff3d] bg-[#0a0a0b]/80 backdrop-blur px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity border border-[#c8ff3d]/30">
            {hovered ? "⏸ paused" : "live"}
          </div>

          <div
            className="transform transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.01]"
            style={{ filter: inView ? "none" : "grayscale(0.4) brightness(0.85)" }}
          >
            <div ref={frameRef}>
              <BrowserFrame url={project.url}>
                {near && (
                  <ScrollingPreview inView={inView} paused={hovered}>
                    <PreviewLiveNav liveUrl={project.url}>
                      {project.preview}
                    </PreviewLiveNav>
                  </ScrollingPreview>
                )}
              </BrowserFrame>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="mono text-[10px] text-[#8b8b94] uppercase tracking-[0.2em]">
              {project.client}
            </div>
            <div className="mono text-[10px] text-[#8b8b94] uppercase tracking-[0.2em] flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${inView ? "bg-[#c8ff3d]" : "bg-[#5c5c63]"} transition-colors`} />
              {inView ? (hovered ? "paused" : "playing") : "idle"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
