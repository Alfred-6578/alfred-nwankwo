"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ProjectScreenshot } from "@/lib/projects";

/**
 * ScreenshotGallery — renders a project's screenshots as a horizontally-scrollable
 * swipe row on mobile and a dense grid on desktop. Clicking any thumbnail opens
 * a full-viewport lightbox with prev/next navigation (buttons + arrow keys),
 * backdrop-click to close, and Escape to close. Body scroll is locked while
 * the lightbox is open.
 *
 * Groups: if any screenshot has a `group` field, shots are rendered under
 * sub-headings in the order the groups first appear. Screenshots without
 * groups render as a single flat collection.
 */
export function ScreenshotGallery({ screenshots }: { screenshots: ProjectScreenshot[] }) {
  // Build ordered groups (preserve first-seen order)
  const groups = screenshots.reduce<
    { name: string; shots: ProjectScreenshot[] }[]
  >((acc, shot) => {
    const name = shot.group ?? "";
    const existing = acc.find((g) => g.name === name);
    if (existing) existing.shots.push(shot);
    else acc.push({ name, shots: [shot] });
    return acc;
  }, []);

  const hasNamedGroups = groups.some((g) => g.name !== "");

  // Flatten so prev/next can navigate across group boundaries
  const allShots = groups.flatMap((g) => g.shots);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? allShots[activeIndex] : null;
  const canPrev = activeIndex !== null && activeIndex > 0;
  const canNext = activeIndex !== null && activeIndex < allShots.length - 1;

  // Gate portal rendering until after hydration — document isn't available on
  // the server, and we only need the portal once the user can actually click.
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Keyboard handlers + body-scroll lock while lightbox is open
  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      else if (e.key === "ArrowLeft") setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i));
      else if (e.key === "ArrowRight") setActiveIndex((i) => (i !== null && i < allShots.length - 1 ? i + 1 : i));
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeIndex, allShots.length]);

  // Running index across all groups so a click maps to the correct flat index
  let runningIndex = 0;

  return (
    <>
      <div className={hasNamedGroups ? "space-y-10 md:space-y-12" : ""}>
        {groups.map((group) => (
          <div key={group.name || "__flat__"}>
            {group.name && (
              <div className="mono text-[10px] uppercase tracking-[0.25em] text-[#a0a0a8] mb-4 flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff5c35]" />
                {group.name}
                <span className="text-[#8b8b94]">
                  · {group.shots.length} {group.shots.length === 1 ? "shot" : "shots"}
                </span>
              </div>
            )}

            {/* Mobile: horizontal snap-scroll row. md+: grid. lg+: 5-col dense grid. */}
            <div
              className="
                flex snap-x snap-mandatory overflow-x-auto gap-3 -mx-5 px-5 pb-4
                md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:mx-0 md:px-0 md:pb-0
                lg:grid-cols-5
              "
            >
              {group.shots.map((shot) => {
                const idx = runningIndex++;
                return (
                  <button
                    key={shot.src}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Open screenshot: ${shot.caption ?? shot.alt}`}
                    className="
                      group/shot w-[85vw] shrink-0 snap-start md:w-auto md:shrink
                      rounded-xl overflow-hidden border border-[#2a2a2f] bg-[#0f0f12]
                      hover:border-[#ff5c35]/40 transition-colors text-left cursor-pointer
                    "
                  >
                    <div className="relative aspect-[16/10] bg-[#18181c]">
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        sizes="(max-width: 768px) 85vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover transition-transform duration-500 group-hover/shot:scale-[1.02]"
                      />
                      {/* Click-to-zoom hint (desktop only) */}
                      <div className="absolute top-2 right-2 h-7 w-7 rounded-full bg-[#0a0a0b]/70 backdrop-blur flex items-center justify-center text-[#f5f2ea] text-xs opacity-0 group-hover/shot:opacity-100 transition-opacity">
                        ⤢
                      </div>
                    </div>
                    {shot.caption && (
                      <div className="mono text-[10px] uppercase tracking-[0.2em] text-[#a0a0a8] px-4 py-3 border-t border-[#2a2a2f]">
                        {shot.caption}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ========== LIGHTBOX (portaled to <body> so z-index escapes the
          page's stacking contexts — otherwise the parent section's `z-10`
          would cap this overlay below the navbar and later sections). ========== */}
      {isClient && active && activeIndex !== null && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption ?? active.alt}
          onClick={() => setActiveIndex(null)}
          className="fixed inset-0 z-100 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 animate-[lbFadeIn_0.2s_ease-out]"
        >
          {/* Close */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(null);
            }}
            aria-label="Close"
            className="absolute top-4 right-4 md:top-6 md:right-6 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white flex items-center justify-center text-xl transition-colors z-10"
          >
            ×
          </button>

          {/* Prev */}
          {canPrev && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i));
              }}
              aria-label="Previous screenshot"
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 h-11 w-11 md:h-12 md:w-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white flex items-center justify-center text-xl transition-colors z-10"
            >
              ←
            </button>
          )}

          {/* Next */}
          {canNext && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((i) =>
                  i !== null && i < allShots.length - 1 ? i + 1 : i
                );
              }}
              aria-label="Next screenshot"
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 h-11 w-11 md:h-12 md:w-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white flex items-center justify-center text-xl transition-colors z-10"
            >
              →
            </button>
          )}

          {/* Image + caption */}
          <div
            className="relative w-full max-w-[1200px] flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0f0f12] shadow-2xl">
              <Image
                src={active.src}
                alt={active.alt}
                width={1920}
                height={1200}
                sizes="(max-width: 1280px) 95vw, 1200px"
                className="w-full h-auto max-h-[80vh] object-contain"
                priority
              />
            </div>

            <div className="flex items-center justify-between gap-4 text-white/80 flex-wrap">
              <div className="flex items-center gap-3 mono text-[11px] uppercase tracking-[0.2em]">
                <span className="text-white">{activeIndex + 1}</span>
                <span className="text-white/30">/ {allShots.length}</span>
                {active.group && (
                  <>
                    <span className="text-white/30">·</span>
                    <span className="text-[#ff5c35]">{active.group}</span>
                  </>
                )}
              </div>
              {active.caption && (
                <div className="mono text-[11px] uppercase tracking-[0.2em] text-white/70 text-right flex-1 min-w-[200px]">
                  {active.caption}
                </div>
              )}
            </div>
          </div>

          <style>{`
            @keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }
          `}</style>
        </div>,
        document.body,
      )}
    </>
  );
}
