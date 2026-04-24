import { StayHavenPreview } from "@/components/previews/stay-haven";
import { SiteGeniePreview } from "@/components/previews/site-genie";
import { SonichoicePreview } from "@/components/previews/sonichoice";
import { AlfpatPreview } from "@/components/previews/alfpat";

export type ProjectStat = { value: string; label: string };

export type ProjectScreenshot = {
  src: string;
  alt: string;
  caption?: string;
  /**
   * Optional label used on the case study page to group screenshots under a
   * sub-heading (e.g. "Guest", "Staff", "Admin"). Projects that leave this
   * unset render as a single flat grid.
   */
  group?: string;
};

export type Project = {
  slug: string;
  name: string;
  type: string;
  year: string;
  role?: string;
  timeline?: string;
  client: string;
  description: string;
  longDescription?: string[];
  stack: string[];
  url: string;
  stats?: ProjectStat[];
  highlights?: string[];
  screenshots?: ProjectScreenshot[];
  preview: React.ReactNode;
};

export const PROJECTS: Project[] = [
  {
    slug: "stayhaven",
    name: "StayHaven",
    type: "Hospitality · Full-stack side project",
    year: "2025",
    timeline: "Ongoing · Started Q2 2025",
    role: "Full-stack design + engineering",
    client: "Side project · Iseyin, Oyo State",
    description:
      "Full-stack hotel platform covering the entire guest journey — browsing, booking, Paystack payments, room-service ordering, tiered loyalty — with dedicated workflows for front-desk staff (check-in/out, walk-ins, room board) and admins (analytics, upgrade/extension approvals, overstay, staff invites). Four role tiers, live notifications over Supabase Realtime, 20+ Prisma models.",
    longDescription: [
      "StayHaven is a side project I built to see how far a single person could push a hospitality platform end-to-end. The surface is deceptively simple — book a room — but the system underneath covers four role tiers (Guest, Staff, Manager, Admin), nine transactional email templates, a loyalty program with live tier recalculation, and a real-time notification bus that streams over Supabase to every authenticated client.",
      "The most interesting engineering sits at the seams. Room upgrades and stay extensions share a gated payment flow — guest requests, admin approves, system re-checks availability, creates a PendingPayment, then the guest pays on their own time via a stored Paystack reference. Room service orders accrue as an unsettled balance that staff can force-settle at checkout or guests can pay online. Every movement — arrival, no-show, override — writes to a Notification table that fans out to all admins and staff via notifyRoles.",
      "Nothing in the product is mocked. There's a real Prisma seed for 12 room types and 22 rooms, real rate-limiting on auth endpoints, real role-gated layouts that hard-guard against wrong-role access, and real skeleton loaders matched to every fetching page's layout.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind 4", "Prisma", "Postgres", "Paystack", "Supabase", "Cloudinary", "Nodemailer"],
    url: "stay-haven-chi.vercel.app",
    stats: [
      { value: "4", label: "Role tiers" },
      { value: "12", label: "Room types" },
      { value: "20+", label: "Data models" },
    ],
    highlights: [
      "Role-gated auth with 15-min access + 7-day refresh tokens, Google OAuth, staff-invite flow, and rate-limited login/register/forgot-password endpoints.",
      "Paystack payment integration with single-room + multi-room group bookings, Room Service settlement at checkout, and pay-link generation for async upgrade/extension flows.",
      "Loyalty program with four tiers (Bronze → Platinum), per-tier earn rates, live tier-threshold upgrades, and admin manual award/deduct via modal.",
      "Live notification bus over Supabase Realtime — notifyRoles helper fans out to every admin + staff in one bulk insert, streamed to every open client.",
      "Full admin analytics dashboard — revenue line chart across 7d / 30d / 90d / 12m, stacked occupancy by room type, exportable snapshots to PDF/XLSX.",
      "Staff operational layer — arrivals today, departures today, overdue checkouts with severity flags, no-show mark-off, room-status board, and walk-in booking with cash/card/transfer settlement.",
    ],
    screenshots: [
      // ---------- Guest ----------
      { src: "/sh-screenshot-1.png", alt: "StayHaven landing page", caption: "Landing · hero + featured rooms", group: "Guest" },
      { src: "/sh-screenshot-2.png", alt: "Room browsing with filters", caption: "Rooms browse · search + date filters", group: "Guest" },
      { src: "/sh-screenshot-3.png", alt: "Room detail and booking flow", caption: "Room detail · booking wizard", group: "Guest" },
      { src: "/sh-screenshot-4.png", alt: "Paystack payment + confirmation", caption: "Checkout · Paystack + confirmation", group: "Guest" },
      { src: "/sh-screenshot-5.png", alt: "Guest dashboard with loyalty tier", caption: "Guest dashboard · loyalty + upcoming stay", group: "Guest" },
      // ---------- Staff ----------
      { src: "/sh-screenshot-6.png", alt: "Staff operational dashboard", caption: "Staff dashboard · arrivals, departures, overdue", group: "Staff" },
      { src: "/sh-screenshot-7.png", alt: "Live room-status board", caption: "Room board · floor-by-floor live status", group: "Staff" },
      { src: "/sh-screenshot-8.png", alt: "Walk-in booking + check-in flow", caption: "Walk-in booking · cash/card/transfer settlement", group: "Staff" },
      { src: "/sh-screenshot-9.png", alt: "Room service order queue", caption: "Room service queue · PENDING → PREPARING → DELIVERED", group: "Staff" },
      // ---------- Admin ----------
      { src: "/sh-screenshot-10.png", alt: "Admin dashboard with KPIs", caption: "Admin dashboard · KPIs + recent bookings", group: "Admin" },
      { src: "/sh-screenshot-11.png", alt: "Revenue analytics line chart", caption: "Revenue analytics · 7d / 30d / 90d / 12m", group: "Admin" },
      { src: "/sh-screenshot-12.png", alt: "Occupancy chart by room type", caption: "Occupancy · stacked by room type", group: "Admin" },
      { src: "/sh-screenshot-13.png", alt: "Bookings management table", caption: "Bookings · search, status tabs, date range", group: "Admin" },
      { src: "/sh-screenshot-14.png", alt: "Room-type + individual rooms admin", caption: "Rooms admin · type cards + individual board", group: "Admin" },
      { src: "/sh-screenshot-15.png", alt: "Staff management with invite", caption: "Staff · invite flow + role/department", group: "Admin" },
      { src: "/sh-screenshot-16.png", alt: "Loyalty program admin", caption: "Loyalty · program stats + top guests", group: "Admin" },
      { src: "/sh-screenshot-17.png", alt: "Room upgrade approvals", caption: "Upgrades · admin approval + pay-link flow", group: "Admin" },
      { src: "/sh-screenshot-18.png", alt: "Stay extension approvals", caption: "Extensions · availability re-check + approval", group: "Admin" },
      { src: "/sh-screenshot-19.png", alt: "Overstay management console", caption: "Overstay · 12hr threshold + bulk notify", group: "Admin" },
    ],
    preview: <StayHavenPreview />,
  },
  {
    slug: "sitegenie",
    name: "SiteGenie",
    type: "AI product · Personal",
    year: "2025",
    timeline: "Q4 2025 · Personal product",
    role: "Product design + frontend engineering",
    client: "Personal product",
    description:
      "An AI landing-page generator that ships production-ready pages in under 10 seconds. Industry-aware templates (SaaS, portfolio, restaurant, e-commerce), inline editing, and clean HTML/Tailwind export.",
    longDescription: [
      "SiteGenie takes a short description of your business and returns a complete, editable landing page — copy, layouts, color palette, and all — in under 10 seconds. It runs on Gemini 2.5 Flash with a deliberately long, structured prompt that tells the model exactly which layouts to pick for which businesses, how many features to extract (auto-expanding 1-2 features to 3, capping the grid at 6), and what tone to adopt per industry.",
      "The harder engineering is the editor. Every generated page is rendered as a React tree where every text node becomes editable on click (single-line and multi-line variants, with path-aware state updates that handle nested keys like stories.0.content). Nine color palettes switch live via CSS custom properties with zero re-render of section content. Individual sections can be regenerated in place — the old section becomes a layout-matched skeleton while the AI rebuilds just that piece.",
      "Export is client-side only. A full set of per-section HTML generators mirrors the React components' layouts, so exported pages ship with Tailwind CDN, inline palette variables, and zero runtime dependencies.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind 4", "Gemini 2.5 Flash", "framer-motion", "embla-carousel", "tsparticles"],
    url: "site-geniee.vercel.app",
    stats: [
      { value: "<10s", label: "Generation" },
      { value: "9", label: "Palettes" },
      { value: "4", label: "Industries" },
    ],
    highlights: [
      "Structured-JSON prompt engineering with industry-specific tone guidance (SaaS / E-commerce / Healthcare / Education / Finance) and per-style voice rules (Professional / Friendly / Bold / Minimalist).",
      "Three content layout variants generated per section — single, two-col, image — so users can switch layout in the editor without re-calling the AI.",
      "Inline editing with path-aware state updates: click any text to edit, auto-resizing textarea for multi-line, Enter-to-save / Escape-to-cancel.",
      "Nine built-in color palettes injected as CSS variables on a container — instant re-theme of the entire page with zero component re-render.",
      "Per-section regeneration with layout-matched skeletons — the old section stays in the layout flow as a shimmer while the AI rebuilds.",
      "Export engine — copy-HTML-to-clipboard, download single file, or download HTML + CSS pair. Clean output, Tailwind CDN, inline palette variables.",
    ],
    // screenshots: [
    //   { src: "/sg-screenshot-1.png", alt: "NuroAI — SaaS template", caption: "SaaS: NuroAI" },
    //   { src: "/sg-screenshot-2.png", alt: "Jon Dawson — portfolio template", caption: "Portfolio: Jon Dawson" },
    //   { src: "/sg-screenshot-3.png", alt: "Foodied — restaurant template", caption: "Restaurant: Foodied" },
    //   { src: "/sg-ecommerce.webp", alt: "Nextgen — e-commerce template", caption: "E-commerce: Nextgen" },
    // ],
    preview: <SiteGeniePreview />,
  },
  {
    slug: "sonichoice",
    name: "Sonichoice",
    type: "Logistics · Full-stack SaaS",
    year: "2026",
    timeline: "Q1 2026 · Multi-month build",
    role: "Lead frontend developer",
    client: "Sonichoice Logistics",
    description:
      "Full-stack delivery ops platform for multi-branch logistics. Parcel tracking, per-branch inventory, merchants directory, staff admin, and a full activity audit trail. JWT refresh with pre-flight exp check + concurrent-request protection, branch-scoped action gating, URL-deep-linked detail panels, race-condition protection on fetches, and client-side PDF + Excel exports. The deep technical build of the three.",
    longDescription: [
      "Sonichoice is a delivery operations platform for a Nigerian multi-branch logistics company. It replaces the spreadsheet-and-WhatsApp workflow most branch operators live in — parcels, per-branch stock, merchants, staff, and a full audit trail all in one system with branch-aware actions and role-gated pages.",
      "Most of the engineering work was invisible from the screenshot. The axios-based API wrapper runs a pre-flight JWT exp check on every request and auto-refreshes on 401, with a concurrent-refresh protection so 20 parallel requests don't spawn 20 refresh calls. Detail panels use a latestSelectId ref to prevent race conditions — click product A then product B and only B's response paints. URL query params deep-link every detail view (?parcelId=X, ?productId=Y) so dashboard click-throughs and shared links both land on the open panel.",
      "Client-side PDF and Excel exports across Parcels, Inventory, and Merchants — jsPDF with autotable for the PDFs, ExcelJS for workbooks with styled titles and alternating row colors. No backend export pipeline needed.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript 5", "Tailwind 4", "jsPDF", "ExcelJS", "lucide-react"],
    url: "sonichoice-inventory-management.vercel.app",
    stats: [
      { value: "5", label: "Resource types" },
      { value: "2", label: "Role tiers" },
      { value: "PDF+XLSX", label: "Exports" },
    ],
    highlights: [
      "JWT auth with access + refresh token flow — pre-flight exp check before every request, auto-refresh on 401, and concurrent-request protection (single in-flight refresh promise shared across parallel fetches).",
      "Role-based access with branch-scoped action gating — parcel status transitions check user.branchId against parcel.fromBranchId and toBranchId; staff-only actions hide at render, not just at the API.",
      "Race-condition protection on detail panels — latestSelectId ref ensures stale responses never overwrite the latest click.",
      "URL-deep-linked detail panels across Parcels, Inventory, and Branches — clicking a dashboard entry opens the right detail view on navigation.",
      "Client-side PDF and Excel export across 5 resource types with styled headers, alternating row colors, and branded layouts.",
      "Activity audit feed with keyword-filtered counts, scope toggle (All / My Activity) for admins, and 3s-debounced search to avoid spamming the backend.",
    ],
    screenshots: [
      // ---------- Operations (daily-use resource surfaces) ----------
      { src: "/soni-screenshot-1.png", alt: "Sonichoice dashboard", caption: "Dashboard · KPIs + recent parcels + activity feed", group: "Operations" },
      { src: "/soni-screenshot-2.png", alt: "Parcels list", caption: "Parcels · list, status pills, branch + merchant filters", group: "Operations" },
      { src: "/soni-screenshot-3.png", alt: "Inventory management", caption: "Inventory · per-branch stock + SKU tracking", group: "Operations" },
      { src: "/soni-screenshot-4.png", alt: "Merchants directory", caption: "Merchants · directory with status + colored avatars", group: "Operations" },
      // ---------- Admin (management + audit) ----------
      { src: "/soni-screenshot-5.png", alt: "Branches overview", caption: "Branches · holdings + transit + received metrics", group: "Admin" },
      { src: "/soni-screenshot-6.png", alt: "Staff management console", caption: "Staff management · role + branch editor (admin-only)", group: "Admin" },
      { src: "/soni-screenshot-7.png", alt: "Activity audit feed", caption: "Activity logs · keyword-filtered audit feed", group: "Admin" },
    ],
    preview: <SonichoicePreview />,
  },
  {
    slug: "alfpat-electronics",
    name: "Alfpat Electronics",
    type: "Ecommerce · Full-stack build",
    year: "2024",
    timeline: "Q4 2024 · Multi-month build",
    role: "Full-stack engineering",
    client: "Alfpat Electronics · Enugu, Nigeria",
    description:
      "Full-stack Nigerian home-electronics platform. Three-layer payment verification (Paystack redirect + signed webhook + polling with direct-API fallback), dual-persistence cart with merge-on-login and logout-cancels-pending-save, WhatsApp Cloud API order notifications, 36-state × cascading-cities checkout, hidden admin panel with self-protection rules. The production-reality build — payment reliability and Nigerian commerce specificity.",
    longDescription: [
      "Alfpat Electronics is a full-stack ecommerce platform for a Nigerian home-electronics retailer. On the surface it's a normal store — browse, search, filter, cart, checkout, pay, track orders. Underneath, it's a lot of specific engineering for the reality of commerce in Nigeria, where payment webhooks arrive late, phones drop connection mid-checkout, and customers expect to hear from you on WhatsApp, not email.",
      "The payment flow is where the real work lives. Paystack redirects back to a verify page that polls the backend every 2 seconds for up to 20 attempts, handling six distinct UI states (loading / success / failed / timeout / error / no-reference) with clear copy for each. Behind that, a signed webhook (HMAC-SHA512 on raw body) creates orders idempotently, and if the webhook is delayed or lost, the polling endpoint falls back to direct Paystack API verification. A `PendingPayment` model with a MongoDB TTL index auto-cleans stalled payments after 24h. Stock is reserved on payment start, reduced on paid, restored on failed/cancelled — never on cart-add.",
      "The cart is dual-persistence: localStorage for instant access (guest + logged-in) and MongoDB with 2s-debounced writes for logged-in users. On login, the local cart merges into the DB with local-qty-priority. On logout, any pending DB save is cancelled so an empty localStorage doesn't overwrite the user's saved cart. These are the kinds of details you only add after a specific bug bit you in production.",
    ],
    stack: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Express 5", "MongoDB", "Paystack", "WhatsApp Cloud API", "Cloudinary", "Brevo SMTP"],
    url: "alfpat-electronics.vercel.app",
    screenshots: [
      { src: "/ap-screenshot-1.png", alt: "Admin dashboard overview", caption: "Dashboard · orders / revenue / products / pending + low-stock alerts", group: "Admin" },
      { src: "/ap-screenshot-2.png", alt: "Orders list with status filters", caption: "Orders · status + payment filters, inline status editor", group: "Admin" },
      { src: "/ap-screenshot-3.png", alt: "Products table", caption: "Products · stock, featured flag, active/inactive toggle", group: "Admin" },
      { src: "/ap-screenshot-4.png", alt: "Add new product form", caption: "Add product · pricing, organisation, active + featured flags", group: "Admin" },
      { src: "/ap-screenshot-5.png", alt: "Order detail modal", caption: "Order detail · items, delivery, payment, timeline + status update", group: "Admin" },
      { src: "/ap-screenshot-6.png", alt: "Categories grid with add-category modal", caption: "Categories · URL-or-upload image, inline add/edit", group: "Admin" },
      { src: "/ap-screenshot-7.png", alt: "Customers management", caption: "Customers · role / status, suspend + delete (self-protection rules)", group: "Admin" },
    ],
    stats: [
      { value: "3-layer", label: "Payment verification" },
      { value: "24h", label: "TTL cleanup" },
      { value: "36", label: "Nigerian states" },
    ],
    highlights: [
      "Three-layer payment confirmation — Paystack redirect + polling, HMAC-SHA512 signed webhook with raw-body verification, and direct Paystack API verification as polling fallback. Idempotent order creation, six distinct verify-page states, `PendingPayment` model with 24h TTL index for auto-cleanup.",
      "Dual-persistence cart — localStorage for instant access, MongoDB with 2s-debounced writes for logged-in users, merge-on-login with local-qty-priority, logout-cancels-pending-save to prevent the empty-cart overwrite bug, popstate re-sync across back/forward nav.",
      "Forgot-password flow with anti-enumeration (same success message regardless), 5-minute rate limit between requests, Google-only account detection, single-use `crypto.randomBytes(32)` tokens with 1h expiry, branded Brevo SMTP email with reset link.",
      "WhatsApp Cloud API order notifications via Meta Graph v22.0 — template `new_order_notification` with 8 parameters, fire-and-forget so it never blocks order creation, comprehensive error logging.",
      "Nigerian checkout — all 36 states + FCT, 10+ major cities per state with a cascading dropdown that updates on state selection. Paystack amounts computed server-side in kobo, never trusting the client.",
      "Hidden admin panel at `/mngmt-x7k9q2` (not `/admin`) with role-gated layout, optimistic toggle updates with rollback, Cloudinary image upload or URL fallback, self-protection rules (admins can't demote/suspend/delete themselves, can't delete other admins), suspended-account blocking at both login and API layers.",
    ],
    preview: <AlfpatPreview />,
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): { prev?: Project; next?: Project } {
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? PROJECTS[idx - 1] : undefined,
    next: idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : undefined,
  };
}
