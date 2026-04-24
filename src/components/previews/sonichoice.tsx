"use client";

import { useReveal } from "@/components/browser-frame";

// ---- Data ----
const STATS = [
  { value: "3", suffix: "", label: "Branch locations supported", valueClass: "text-[#f59e0b]" },
  { value: "100", suffix: "%", label: "Parcel visibility, end to end", valueClass: "text-white" },
  { value: "2", suffix: "", label: "Role levels — Staff & Admin", valueClass: "text-[#f59e0b]" },
  { value: "0", suffix: "s", label: "Time to locate any parcel", valueClass: "text-white" },
];

const FEATURES = [
  { title: "Parcel tracking", desc: "Log every parcel with full details — sender, recipient, size, fee, route. Know exactly where it is at any point in its journey.", tag: "CORE FEATURE", icon: "📦" },
  { title: "Branch management", desc: "Manage all your branch locations in one place. See which parcels are sitting where and how long they've been there.", tag: "OPERATIONS", icon: "📍" },
  { title: "Movement history", desc: "Full timeline for every parcel. Every branch it passed through, every status change — all logged and visible to staff and admin.", tag: "TRANSPARENCY", icon: "↔" },
  { title: "Client profiles", desc: "Keep records of every sender. Track how many parcels each client has sent, their total spend, and all active deliveries.", tag: "CRM", icon: "👥" },
  { title: "Role-based access", desc: "Admins see everything. Staff see only what they need. Admin-only pages don't even appear in staff navigation.", tag: "SECURITY", icon: "🔒" },
  { title: "Live dashboard", desc: "At-a-glance metrics for in-transit, received, pending, and revenue. Branch-by-branch breakdown and activity.", tag: "ANALYTICS", icon: "📊" },
];

const WORKFLOW = [
  { title: "Client drops off", desc: "Client brings a parcel to any branch. Staff logs it with recipient details and size.", icon: "✉" },
  { title: "Parcel moves", desc: "Staff dispatch it to the next branch. Each movement updates the parcel's location and timeline.", icon: "⚙" },
  { title: "Arrives at destination", desc: "When it reaches the delivery branch, staff confirm arrival. Parcel shows as ready for final delivery.", icon: "📍" },
  { title: "Received", desc: "Arrived at the destination branch. Marked received. Full history recorded.", icon: "✓" },
];

function Reveal({
  children,
  as: Tag = "section",
  scale = false,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  as?: "section" | "div" | "footer" | "nav";
  scale?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [ref, inView] = useReveal(0.12);
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : `translateY(24px)${scale ? " scale(0.95)" : ""}`,
        transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {children}
    </Tag>
  );
}

// ---- Dashboard preview (inline markup, no image) ----
function DashboardPreview() {
  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden border border-[#1e293b] bg-[#0b1220] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
      {/* Browser bar */}
      <div className="relative flex items-center justify-center py-4 border-b border-[#1e293b] bg-[#0f172a]">
        <div className="absolute left-4 flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#f87171]" />
          <span className="h-3 w-3 rounded-full bg-[#facc15]" />
          <span className="h-3 w-3 rounded-full bg-[#4ade80]" />
        </div>
        <div className="text-[#94a3b8] text-sm bg-[#1e293b] px-6 py-1 rounded font-mono">app.sonichoice.ng/dashboard</div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-60 border-r border-[#1e293b] bg-[#0f172a] p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-8 rounded-lg bg-[#f59e0b] text-black grid place-items-center font-bold">S</div>
            <span className="text-white font-semibold text-sm tracking-wide">SONICHOICE</span>
          </div>
          <div className="flex flex-col gap-3 text-[#94a3b8]">
            {[
              { name: "Dashboard", active: true, badge: null, icon: "▦" },
              { name: "Parcels", active: false, badge: 9, icon: "📦" },
              { name: "Branches", active: false, badge: null, icon: "📍" },
              { name: "Clients", active: false, badge: null, icon: "👤" },
            ].map((item) => (
              <div
                key={item.name}
                className={`flex items-center justify-between px-3 py-2 rounded-lg ${item.active ? "bg-[#1e293b] text-white" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base w-5">{item.icon}</span>
                  <span className="text-sm">{item.name}</span>
                </div>
                {item.badge !== null && (
                  <span className="text-xs bg-[#f59e0b] text-black px-2 py-0.5 rounded font-semibold">{item.badge}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 p-8 flex flex-col gap-6">
          {/* Metrics */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { bar: "bg-[#f59e0b]", label: "IN TRANSIT", value: "3", delta: "+1 today", valueClass: "text-[#f59e0b]" },
              { bar: "bg-[#16a34a]", label: "DELIVERED", value: "24", delta: "↑ 18%", valueClass: "text-[#16a34a]" },
              { bar: "bg-[#6b7280]", label: "PENDING", value: "5", delta: "—", valueClass: "text-[#6b7280]" },
              { bar: "bg-white", label: "REVENUE", value: "₦187k", delta: "↑ 12%", valueClass: "text-white" },
            ].map((m) => (
              <div key={m.label} className="relative overflow-hidden bg-[#0f172a] border border-[#1e293b] rounded-xl p-5 text-center">
                <div className={`absolute top-0 left-0 right-0 h-1 ${m.bar}`} />
                <div className="text-xs text-[#94a3b8] tracking-wider mb-2">{m.label}</div>
                <div className={`text-3xl font-bold ${m.valueClass}`}>{m.value}</div>
                <div className="text-xs text-[#64748b] mt-1">{m.delta}</div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="flex flex-col gap-4 text-sm">
            <div className="grid grid-cols-3 text-xs text-[#64748b] pb-2 border-b border-[#1e293b] tracking-wider">
              <span>ID</span>
              <span>CLIENT</span>
              <span>STATUS</span>
            </div>
            {[
              { id: "PCL-009", init: "KA", name: "Kemi Adeyemi", avBg: "bg-[#2563eb]", status: "Transit", badgeCls: "bg-[#f59e0b]/20 text-[#fbbf24]" },
              { id: "PCL-008", init: "NE", name: "Ngozi Eze", avBg: "bg-[#7c3aed]", status: "Transit", badgeCls: "bg-[#f59e0b]/20 text-[#fbbf24]" },
              { id: "PCL-007", init: "TB", name: "Tunde Bakare", avBg: "bg-[#059669]", status: "Pending", badgeCls: "bg-[#334155] text-[#94a3b8]" },
              { id: "PCL-005", init: "KA", name: "Kemi Adeyemi", avBg: "bg-[#2563eb]", status: "Received", badgeCls: "bg-[#34d399]/20 text-[#34d399]" },
            ].map((r) => (
              <div key={r.id} className="grid grid-cols-3 items-center gap-1 text-[#cbd5e1] py-2">
                <span className="text-[#94a3b8] font-mono text-xs">{r.id}</span>
                <div className="flex items-center gap-3">
                  <div className={`h-7 w-7 rounded-md ${r.avBg} grid place-items-center text-xs font-semibold text-white`}>{r.init}</div>
                  <span>{r.name}</span>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-md text-xs ${r.badgeCls}`}>
                    <span className="mr-1">●</span>{r.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SonichoicePreview() {
  const sans = { fontFamily: "'Inter', 'Geist', system-ui, sans-serif" } as const;
  const syne = { fontFamily: "'Syne', 'Geist', system-ui, sans-serif" } as const;
  const mono = { fontFamily: "'DM Mono', 'JetBrains Mono', ui-monospace, monospace" } as const;

  return (
    <div className="bg-[#111827] text-white w-full" style={sans}>
      {/* ========== NAV ========== */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-16 py-6 backdrop-blur bg-[#111827]/70">
        <div className="flex items-center gap-2" data-live-href="/">
          <div className="h-8 w-8 rounded-lg bg-[#f59e0b] text-black grid place-items-center font-bold">S</div>
          <span className="font-bold tracking-wider text-lg">SONICHOICE</span>
        </div>
        <div className="flex items-center gap-8 text-sm text-[#6b7280]">
          <span data-live-href="/#features">Features</span>
          <span data-live-href="/#workflow">How it works</span>
          <span data-live-href="/#stats">Why sonichoice</span>
        </div>
        <div data-live-href="/login" className="inline-flex items-center gap-2 bg-[#f59e0b] text-white px-4 py-2 rounded-lg text-sm font-semibold">
          Sign In <span>→</span>
        </div>
      </div>

      {/* ========== HERO ========== */}
      <Reveal className="relative px-16 pt-32 pb-24 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full pointer-events-none"
          style={{ background: "rgba(245, 158, 11, 0.2)", filter: "blur(140px)", animation: "scGlow 4s ease-in-out infinite" }}
        />

        <div className="relative flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#f59e0b] px-3 py-1 text-xs uppercase tracking-wider mb-4">
            <span className="h-2 w-2 rounded-full bg-[#f59e0b]" style={{ animation: "scPulseDot 2s ease-in-out infinite" }} />
            Delivery Operations Platform
          </div>

          <h1 className="text-6xl font-extrabold leading-[1.05] text-white mb-6 tracking-tight" style={syne}>
            Every parcel. <span className="text-[#f59e0b] not-italic">Every branch.</span>
            <br />
            <span className="block text-5xl font-bold text-[#6b7280] mt-2">Always accounted for.</span>
          </h1>

          <p className="text-lg text-[#e4e7ec]/70 max-w-2xl mb-8">
            Sonichoice gives your delivery company a single system to track parcels from <strong className="text-white font-bold">drop-off to doorstep</strong> — across every branch, every route, in real time.
          </p>

          <div className="flex gap-4 mb-8">
            <button data-live-href="/login" type="button" className="inline-flex items-center gap-2 bg-[#f59e0b] text-white px-5 py-2.5 rounded-lg text-base font-bold" style={syne}>
              Start tracking <span>→</span>
            </button>
            <button data-live-href="/#workflow" type="button" className="inline-flex items-center gap-2 bg-[#6b7280]/40 border border-[#e4e7ec]/20 text-[#e4e7ec] px-5 py-2.5 rounded-lg text-base font-bold" style={syne}>
              <span>▶</span> See how it works
            </button>
          </div>

          <div className="flex items-center gap-6 text-sm text-[#e4e7ec]/70 mb-12">
            <div className="flex items-center gap-2"><span className="text-[#f59e0b]">🛡</span> Role-based access</div>
            <span className="h-4 w-px bg-[#e4e7ec]/30" />
            <div className="flex items-center gap-2"><span className="text-[#f59e0b]">📍</span> Multi-branch support</div>
            <span className="h-4 w-px bg-[#e4e7ec]/30" />
            <div className="flex items-center gap-2"><span className="text-[#f59e0b]">✓</span> Real-time tracking</div>
          </div>

          <DashboardPreview />
        </div>
      </Reveal>

      {/* ========== STATS ========== */}
      <Reveal className="px-16 flex justify-center py-10">
        <div className="w-full max-w-6xl rounded-2xl border border-[#1e293b] bg-[#0f172a] py-8 px-10">
          <div className="grid grid-cols-4">
            {STATS.map((s, i) => (
              <div key={s.label} className={`text-center px-6 flex flex-col items-center ${i < 3 ? "border-r border-[#334155]" : ""}`}>
                <div className="text-5xl font-extrabold mb-3 tracking-tight" style={syne}>
                  <span className={s.valueClass}>{s.value}</span>
                  {s.suffix && <span className="text-[#f59e0b]">{s.suffix}</span>}
                </div>
                <p className="text-[#94a3b8] max-w-[180px] leading-tight text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ========== FEATURES ========== */}
      <Reveal className="px-16 py-24">
        <div className="max-w-6xl mx-auto mb-16">
          <p className="text-[#f59e0b] text-sm tracking-[0.15em] mb-3" style={mono}>WHAT SONICHOICE DOES</p>
          <h2 className="text-5xl font-extrabold text-white leading-[1.1]" style={syne}>
            Built for how delivery companies <br />actually operate
          </h2>
          <p className="text-[#94a3b8] text-lg mt-6 max-w-2xl">
            Not a generic logistics tool. Sonichoice is designed specifically for multi-branch delivery companies that move parcels between locations.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-3 border border-[#1e293b] rounded-2xl overflow-hidden">
          {FEATURES.map((f, i) => {
            const rightBorder = (i + 1) % 3 !== 0;
            const bottomBorder = i < 3;
            return (
              <div
                key={f.title}
                className={`p-10 hover:bg-[#6b7280]/10 transition-colors ${rightBorder ? "border-r border-[#1e293b]" : ""} ${bottomBorder ? "border-b border-[#1e293b]" : ""}`}
              >
                <div className="h-12 w-12 rounded-xl bg-[#1e293b] grid place-items-center text-xl text-[#f59e0b] mb-6">{f.icon}</div>
                <h3 className="text-white text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed mb-6">{f.desc}</p>
                <span className="inline-block text-xs text-[#f59e0b] border border-[#f59e0b]/30 px-3 py-1 rounded-md">{f.tag}</span>
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* ========== WORKFLOW ========== */}
      <Reveal className="px-16 py-14 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#f59e0b] text-sm tracking-[0.15em] mb-3" style={mono}>THE WORKFLOW</p>
          <h2 className="text-5xl font-extrabold text-white mb-20" style={syne}>From drop-off to received</h2>

          <div className="relative grid grid-cols-4 gap-12">
            {/* Horizontal line */}
            <div className="absolute top-10 left-0 right-0 h-px bg-white/10 overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full w-1/3"
                style={{
                  background: "linear-gradient(90deg, transparent, #f59e0b, transparent)",
                  animation: "scLineFill 3s ease-in-out infinite",
                }}
              />
            </div>

            {WORKFLOW.map((s) => (
              <div key={s.title} className="relative flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-2xl bg-[#1a1f2e] border border-white/10 grid place-items-center text-2xl text-[#f59e0b] mb-6 z-10">
                  {s.icon}
                </div>
                <h3 className="text-white text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-[#9ca3af] text-sm leading-relaxed max-w-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ========== FOOTER ========== */}
      <footer className="mt-20 w-full flex justify-between items-center bg-[#111827]/80 px-16 py-8 border-t border-[#e4e7ec]/30">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-[#f59e0b] text-black grid place-items-center font-bold">S</div>
          <span className="font-bold tracking-wider text-lg">SONICHOICE</span>
        </div>
        <div className="text-[#6b7280] text-sm">© 2026 Sonichoice. All rights reserved.</div>
        <div className="flex gap-4 text-[#6b7280] text-sm">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Sign in</span>
        </div>
      </footer>

      <style>{`
        @keyframes scGlow { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.35; } }
        @keyframes scPulseDot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.3); } }
        @keyframes scLineFill {
          0% { left: 0; width: 0; }
          50% { left: 0; width: 100%; }
          100% { left: 100%; width: 0; }
        }
      `}</style>
    </div>
  );
}
