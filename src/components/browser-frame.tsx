"use client";

import React, { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

// ---------- Preview clip context ----------
// Exposed so children rendered inside <ScrollingPreview> can observe when
// their sections become visible within the clipped preview viewport
// (instead of the real page viewport).
const PreviewClipContext = createContext<HTMLDivElement | null>(null);

// ---------- Live-site deep-link bubbling ----------
/**
 * Wrap a preview with <PreviewLiveNav liveUrl={...}> to make any child element
 * carrying a `data-live-href="/path"` attribute navigate to the project's live
 * site (`https://{liveUrl}{path}`) in a new tab when clicked. Children without
 * the attribute bubble up normally — so preview-internal controls (carousels,
 * tabs, hover accordions) keep working.
 */
export function PreviewLiveNav({
  liveUrl,
  children,
  className,
}: {
  liveUrl: string;
  children: React.ReactNode;
  className?: string;
}) {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;
    const actionEl = target.closest<HTMLElement>("[data-live-href]");
    if (!actionEl) return;
    e.preventDefault();
    e.stopPropagation();
    const path = actionEl.dataset.liveHref ?? "/";
    const base = liveUrl.startsWith("http") ? liveUrl : `https://${liveUrl}`;
    try {
      const url = new URL(path, base).toString();
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      // Invalid URL — bail silently
    }
  };

  return (
    <div onClick={handleClick} className={className}>
      {/* Scoped cursor hint for any deep-linked element */}
      <style>{`[data-live-href]{cursor:pointer;}`}</style>
      {children}
    </div>
  );
}

/**
 * useReveal — attach to any element inside a ScrollingPreview. Returns
 * [ref, inView]. `inView` flips true the first time the element enters
 * the preview's clipping container, and stays true.
 */
export function useReveal(threshold = 0.1) {
  const clipEl = useContext(PreviewClipContext);
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Inside a ScrollingPreview: observe against the clip so sections reveal
    // as the CSS animation translates them in.
    // Outside (e.g. case study page): observe against the document viewport
    // so sections reveal as the user scrolls the page.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.unobserve(el);
        }
      },
      { root: clipEl, threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [clipEl, threshold]);

  return [ref, inView] as const;
}

// ---------- Browser Frame ----------
export function BrowserFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="relative rounded-xl overflow-hidden border border-[#2a2a2f] bg-[#0f0f12] shadow-2xl shadow-black/50">
      <div className="flex items-center gap-3 px-3.5 py-2.5 border-b border-[#2a2a2f] bg-[#18181c]">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#28c940]" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="mono text-[10px] text-[#a0a0a8] bg-[#0a0a0b] px-3 py-1 rounded-full flex items-center gap-1.5 max-w-[320px]">
            <span className="text-[#71717a]">●</span>
            <a
              href={url.startsWith("http") ? url : `https://${url}`}
              target="_blank"
              rel="noreferrer"
              className="truncate"
            >
              {url}
            </a>
          </div>
        </div>
        <div className="w-12" />
      </div>
      <div className="relative aspect-[16/11] overflow-hidden bg-white">{children}</div>
    </div>
  );
}

// ---------- Scrolling Preview ----------
export function ScrollingPreview({
  inView,
  scale = 0.45,
  children,
  paused,
}: {
  inView: boolean;
  scale?: number;
  children: React.ReactNode;
  paused: boolean;
}) {
  // Callback ref pattern: fire a re-render once the clip element mounts,
  // so the context value propagates to any useReveal consumers below.
  const [clipEl, setClipEl] = useState<HTMLDivElement | null>(null);

  return (
    <div ref={setClipEl} className="absolute inset-0 overflow-hidden">
      <PreviewClipContext.Provider value={clipEl}>
        <div
          className="absolute top-0 left-0"
          style={{ width: `${100 / scale}%`, transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          <div
            style={{
              animationName: inView ? "scrollPreview" : "none",
              animationDuration: "25s",
              animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
              animationIterationCount: "infinite",
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {children}
          </div>
        </div>
      </PreviewClipContext.Provider>
      <style>{`
        @keyframes scrollPreview {
          0%, 7% { transform: translateY(0); }
          50% { transform: translateY(-48%); }
          93%, 100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ---------- Scaled Preview ----------
/**
 * Case-study wrapper: renders the preview at its fixed desktop design width
 * and uses CSS `zoom` to fit the container. Unlike `transform: scale`, zoom
 * scales layout alongside paint, so child `position: sticky` behaves normally
 * and native scroll sees the correct scaled height — no spacer hack needed.
 */
export function ScaledPreview({
  children,
  designWidth = 1280,
  maxHeight = "min(620px, 75vh)",
}: {
  children: React.ReactNode;
  designWidth?: number;
  maxHeight?: string;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const update = () => {
      setScale(wrap.clientWidth / designWidth);
    };

    const raf = requestAnimationFrame(update);
    const ro = new ResizeObserver(update);
    ro.observe(wrap);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [designWidth]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-y-auto bg-white"
      style={{ height: maxHeight }}
    >
      <div style={{ zoom: scale, width: `${designWidth}px` }}>
        {children}
      </div>
    </div>
  );
}
