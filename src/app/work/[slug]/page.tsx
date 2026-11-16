import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PreviewLiveNav, ScaledPreview } from "@/components/browser-frame";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { PROJECTS, getProject, getAdjacentProjects } from "@/lib/projects";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found — Alfred Nwankwo" };
  return {
    title: `${project.name} — Alfred Nwankwo`,
    description: project.description,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);
  const liveHref = project.url.startsWith("http") ? project.url : `https://${project.url}`;

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
          href="/work"
          className="group inline-flex items-center gap-2.5 rounded-full border border-[#2a2a2f] bg-[#111113] pl-5 pr-1.5 py-1.5 text-[13px] hover:border-[#ff5c35] transition-all"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ff5c35] text-[#0a0a0b] text-[11px] transition-transform group-hover:-translate-x-0.5">←</span>
          All work
        </Link>
      </nav>

      {/* HEADER */}
      <section className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-10 pt-32 md:pt-40 pb-12">
        <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff5c35] mb-6 flex items-center gap-3 flex-wrap">
          <span className="h-px w-8 bg-[#ff5c35]" />
          <span>{project.year}</span>
          <span className="text-[#8b8b94]">·</span>
          <span className="text-[#a0a0a8]">{project.type}</span>
          {project.role && (
            <>
              <span className="text-[#8b8b94]">·</span>
              <span className="text-[#a0a0a8]">{project.role}</span>
            </>
          )}
        </div>

        <h1 className="display text-6xl md:text-[104px] font-bold leading-[0.92] tracking-[-0.04em] mb-6">
          {project.name}<span className="text-[#ff5c35]">.</span>
        </h1>

        <p className="text-lg md:text-xl text-[#c0c0c6] leading-relaxed max-w-3xl mb-8">
          {project.description}
        </p>

        <div className="flex items-center gap-4 flex-wrap">
          <a
            href={liveHref}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#ff5c35] px-6 py-3 text-[13px] font-semibold text-[#0a0a0b] transition-all hover:brightness-110"
          >
            Visit live site
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#0a0a0b] text-[#ff5c35] text-[10px] transition-transform group-hover:rotate-45">↗</span>
          </a>
          <span className="mono text-[11px] uppercase tracking-[0.2em] text-[#8b8b94]">
            {project.url}
          </span>
        </div>
      </section>

      {/* META GRID */}
      <section className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-10 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { k: "Client", v: project.client },
            { k: "Year", v: project.year },
            { k: "Role", v: project.role ?? "—" },
            { k: "Timeline", v: project.timeline ?? "—" },
          ].map((m) => (
            <div key={m.k} className="border-l border-[#2a2a2f] pl-3 md:pl-4">
              <div className="mono text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[#8b8b94] mb-1.5">{m.k}</div>
              <div className="text-sm text-[#f5f2ea] leading-tight">{m.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* INSIDE THE PRODUCT — screenshots placed above the preview so visitors
          see evidence of role-gated / restricted surfaces before scrolling
          past the long live preview. */}
      {project.screenshots && project.screenshots.length > 0 && (
        <section className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-10 pb-20">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff5c35] mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-[#ff5c35]" />
                Inside the product
              </div>
              <h2 className="display text-3xl md:text-4xl font-bold tracking-[-0.025em] leading-[1]">
                Screens the <em className="serif italic font-normal text-[#ff5c35]">live site</em> can&apos;t show you.
              </h2>
            </div>
            <p className="mono text-[11px] uppercase tracking-[0.2em] text-[#8b8b94] max-w-xs">
              {project.screenshots.length} shot{project.screenshots.length === 1 ? "" : "s"} · role-gated views, admin surfaces, product tour
            </p>
          </div>

          <ScreenshotGallery screenshots={project.screenshots} />
        </section>
      )}

      {/* LIVE PREVIEW — bounded height with inner scroll so it doesn't
          dominate the case study page. */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-10 pb-24">
        <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff5c35] mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-[#ff5c35]" />
          Live preview · scroll inside the frame
        </div>
        <div className="rounded-xl overflow-hidden border border-[#2a2a2f] bg-[#0f0f12] shadow-2xl shadow-black/50">
          <div className="flex items-center gap-3 px-3.5 py-2.5 border-b border-[#2a2a2f] bg-[#18181c]">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#28c940]" />
            </div>
            <div className="flex-1 flex items-center justify-center">
              <a
                href={liveHref}
                target="_blank"
                rel="noreferrer"
                className="mono text-[10px] text-[#a0a0a8] bg-[#0a0a0b] px-3 py-1 rounded-full flex items-center gap-1.5 max-w-[320px]"
              >
                <span className="text-[#8b8b94]">●</span>
                <span className="truncate">{project.url}</span>
              </a>
            </div>
            <div className="w-12" />
          </div>
          <ScaledPreview>
            <PreviewLiveNav liveUrl={project.url}>
              {project.preview}
            </PreviewLiveNav>
          </ScaledPreview>
        </div>
      </section>

      {/* LONG DESCRIPTION + HIGHLIGHTS */}
      {(project.longDescription || project.highlights) && (
        <section className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-10 pb-24 grid grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-12 md:col-span-5">
            <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff5c35] mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#ff5c35]" />
              Overview
            </div>
            <h2 className="display text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-[0.95]">
              The <em className="serif italic font-normal text-[#ff5c35]">full</em> picture.
            </h2>
          </div>

          <div className="col-span-12 md:col-span-7 md:pt-4">
            {project.longDescription && (
              <div className="space-y-5 text-[#c0c0c6] text-[15px] md:text-base leading-relaxed max-w-2xl mb-10">
                {project.longDescription.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}

            {project.highlights && (
              <div className="mt-10">
                <div className="mono text-[10px] uppercase tracking-[0.25em] text-[#a0a0a8] mb-5">What I built</div>
                <ul className="space-y-3">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] md:text-[15px] text-[#d4d0c8] leading-relaxed">
                      <span className="text-[#ff5c35] mt-1.5 text-[8px] flex-shrink-0">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* STATS */}
      {project.stats && project.stats.length > 0 && (
        <section className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-10 pb-24">
          <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff5c35] mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-[#ff5c35]" />
            By the numbers
          </div>
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl">
            {project.stats.map((s, i) => (
              <div key={i} className="border-l-2 border-[#ff5c35] pl-4 md:pl-5">
                <div className="display text-4xl md:text-5xl font-bold text-[#f5f2ea] leading-none tracking-tight">
                  {s.value}
                </div>
                <div className="mono text-[10px] md:text-[11px] uppercase tracking-widest text-[#8b8b94] mt-3 leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* STACK */}
      <section className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-10 pb-24">
        <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff5c35] mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-[#ff5c35]" />
          Stack
        </div>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="mono text-xs md:text-[13px] border border-[#26262a] bg-[#111113] text-[#d4d0c8] px-3 py-1.5 rounded-full"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* PREV / NEXT */}
      <section className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-10 pb-24 pt-8 border-t border-[#1a1a1d]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="group rounded-2xl border border-[#2a2a2f] bg-[#0f0f12]/85 p-6 hover:border-[#ff5c35]/40 transition-colors"
            >
              <div className="mono text-[10px] uppercase tracking-[0.25em] text-[#8b8b94] mb-2 flex items-center gap-2">
                <span>←</span> Previous project
              </div>
              <div className="display text-2xl font-bold">
                {prev.name}<span className="text-[#ff5c35]">.</span>
              </div>
              <div className="mono text-[10px] uppercase tracking-wider text-[#a0a0a8] mt-2">{prev.type}</div>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="group rounded-2xl border border-[#2a2a2f] bg-[#0f0f12]/85 p-6 hover:border-[#ff5c35]/40 transition-colors md:text-right"
            >
              <div className="mono text-[10px] uppercase tracking-[0.25em] text-[#8b8b94] mb-2 flex items-center gap-2 md:justify-end">
                Next project <span>→</span>
              </div>
              <div className="display text-2xl font-bold">
                {next.name}<span className="text-[#ff5c35]">.</span>
              </div>
              <div className="mono text-[10px] uppercase tracking-wider text-[#a0a0a8] mt-2">{next.type}</div>
            </Link>
          ) : (
            <div />
          )}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/work"
            className="mono text-[11px] uppercase tracking-[0.25em] text-[#a0a0a8] hover:text-[#f5f2ea] border-b border-[#2a2a2f] hover:border-[#ff5c35] pb-0.5 transition-colors"
          >
            ← All work
          </Link>
        </div>
      </section>
    </main>
  );
}
