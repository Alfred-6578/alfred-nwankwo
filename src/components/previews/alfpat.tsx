"use client";

import { useReveal } from "@/components/browser-frame";

// ---------- Data ----------
const CATEGORIES = [
  { name: "Televisions", bg: "from-[#E8EDF5] to-[#D1DAE8]" },
  { name: "Smartphones", bg: "from-[#FEE9D9] to-[#FCD3B4]" },
  { name: "Laptops", bg: "from-[#E4E9F2] to-[#C7D1E4]" },
  { name: "Refrigerators", bg: "from-[#F2EDE4] to-[#E3D9C5]" },
  { name: "Audio", bg: "from-[#FFF0E4] to-[#FFD9B8]" },
  { name: "Fans", bg: "from-[#EEF2F7] to-[#D4DCE8]" },
];

const HERO_CATS = [
  { name: "Televisions", bg: "from-[#0B1B3A] to-[#1a3060]" },
  { name: "Smartphones", bg: "from-[#F97316] to-[#C9551C]" },
  { name: "Laptops", bg: "from-[#1e3a8a] to-[#0B1B3A]" },
  { name: "Audio", bg: "from-[#EA6A0A] to-[#9a4a08]" },
];

const FEATURED = [
  { name: 'Samsung 55" QLED 4K Smart TV', cat: "Televisions", priceOld: "₦850,000", price: "₦722,500", badge: "-15%", grad: "from-[#0B1B3A] via-[#1a3060] to-[#2a4a80]" },
  { name: "Apple iPhone 15 Pro 256GB", cat: "Smartphones", price: "₦1,450,000", grad: "from-[#1f2937] via-[#4b5563] to-[#9ca3af]" },
  { name: "MacBook Air M3 13-inch 512GB", cat: "Laptops", priceOld: "₦1,800,000", price: "₦1,620,000", badge: "-10%", grad: "from-[#f3f4f6] via-[#d1d5db] to-[#9ca3af]" },
  { name: "LG 350L Double Door Refrigerator", cat: "Refrigerators", price: "₦485,000", grad: "from-[#e5e7eb] via-[#cbd5e1] to-[#94a3b8]" },
];

const LATEST = [
  { name: "JBL Flip 6 Bluetooth Speaker", cat: "Audio", price: "₦85,000", grad: "from-[#F97316] via-[#EA6A0A] to-[#9a4a08]" },
  { name: "LG 8kg Front Load Washer", cat: "Washing Machines", priceOld: "₦420,000", price: "₦336,000", badge: "-20%", grad: "from-[#e5e7eb] via-[#d1d5db] to-[#9ca3af]" },
  { name: "Sony WH-1000XM5 Headphones", cat: "Audio", price: "₦295,000", grad: "from-[#111827] via-[#1f2937] to-[#374151]" },
  { name: "HP Pavilion 15 Core i7 16GB", cat: "Laptops", priceOld: "₦720,000", price: "₦662,400", badge: "-8%", grad: "from-[#c4a57b] via-[#a68456] to-[#5c4733]" },
];

// ---------- Reveal helper ----------
function Reveal({
  children,
  as: Tag = "section",
  scale = false,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  as?: "section" | "div" | "footer";
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
        transform: inView ? "none" : `translateY(24px)${scale ? " scale(0.96)" : ""}`,
        transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {children}
    </Tag>
  );
}

// ---------- Product card ----------
function ProductCard({
  name,
  cat,
  price,
  priceOld,
  badge,
  grad,
}: {
  name: string;
  cat: string;
  price: string;
  priceOld?: string;
  badge?: string;
  grad: string;
}) {
  return (
    <article className="relative flex flex-col bg-white rounded-md overflow-hidden shadow-md hover:shadow-xl transition-shadow">
      <div className="relative p-3 pb-2">
        {badge && (
          <span className="absolute top-5 left-5 bg-[#F97316] text-white text-[10px] font-bold px-2.5 py-1 rounded-full z-10">
            {badge}
          </span>
        )}
        <div
          data-live-href="/wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0B1B3A] text-white flex items-center justify-center hover:bg-[#F97316] transition-colors z-10"
        >
          <span className="text-sm">♡</span>
        </div>
        <div
          className={`h-60 w-full rounded-md bg-gradient-to-br ${grad} relative overflow-hidden`}
        >
          <div className="absolute inset-0 flex items-center justify-center text-white/60 text-xs font-semibold tracking-wider uppercase">
            {cat}
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4 pt-1 flex-1 justify-between">
        <div>
          <h3 className="text-base font-semibold text-[#0B1B3A] leading-tight truncate">{name}</h3>
          <span className="block text-[11px] text-[#9ca3af] mt-0.5">{cat}</span>
        </div>
        <div className="flex items-end justify-between mt-1.5">
          <div>
            {priceOld && (
              <p className="text-[11px] text-[#6b7280] line-through leading-none mb-0.5">{priceOld}</p>
            )}
            <p className="text-lg font-bold text-[#0B1B3A] leading-none">{price}</p>
          </div>
        </div>
        <div
          data-live-href="/products"
          className="w-full py-2 rounded-full text-sm font-semibold bg-[#F97316] text-white flex items-center justify-center gap-2 mt-3 hover:bg-[#EA6A0A] transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Add to Cart
        </div>
      </div>
    </article>
  );
}

export function AlfpatPreview() {
  const outfit = { fontFamily: "'Outfit', 'Geist', system-ui, sans-serif" } as const;
  const playfair = { fontFamily: "'Playfair Display', 'Instrument Serif', Georgia, serif" } as const;

  return (
    <div className="bg-white text-[#0B1B3A] w-full flex flex-col" style={outfit}>
      {/* ========== TOP BAR ========== */}
      <div className="bg-[#F8F9FA] border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 py-1.5 flex justify-between text-xs text-[#6b7280]">
          <span>📍 Enugu, Nigeria</span>
          <span>Free delivery on orders above ₦50,000</span>
        </div>
      </div>

      {/* ========== NAV ========== */}
      <div className="sticky top-0 z-40 border-b border-gray-100 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 py-3 flex items-center gap-6">
          {/* Logo */}
          <div data-live-href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl font-bold text-[#0B1B3A]" style={playfair}>ALFPAT</span>
            <span className="w-px h-6 bg-[#F97316]" />
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-[#0B1B3A]">Electronics</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search TVs, Washing Machines, Speakers..."
              className="w-full py-2.5 px-5 pr-12 bg-[#F3F4F6] rounded-full text-sm text-[#0B1B3A] outline-none focus:ring-2 focus:ring-[#F97316]"
            />
            <div
              data-live-href="/products"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#F97316] text-white flex items-center justify-center"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-5 shrink-0">
            <span data-live-href="/login" className="text-sm font-medium text-[#0B1B3A] hover:text-[#F97316] transition-colors">
              Login
            </span>
            <div data-live-href="/register" className="text-sm font-medium bg-[#F97316] text-white px-5 py-2 rounded-full hover:bg-[#EA6A0A] transition-colors">
              Register
            </div>
            <div data-live-href="/cart" className="relative p-1 text-[#0B1B3A] hover:text-[#F97316] transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F97316] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                2
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========== HERO ========== */}
      <Reveal className="relative bg-white overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#0B1B3A 1px, transparent 1px), linear-gradient(90deg, #0B1B3A 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-[1280px] mx-auto px-6 py-20">
          <div className="grid grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-[#fff7ed] text-[#F97316] text-xs font-medium px-4 py-1.5 rounded-full mb-6">
                🇳🇬 Nigeria&apos;s Trusted Electronics Store
              </span>
              <h1 className="text-5xl leading-[1.15] text-[#0B1B3A] mb-5" style={playfair}>
                Quality Electronics
                <br />
                for Every Home
              </h1>
              <p className="text-lg text-[#6b7280] leading-relaxed max-w-lg mb-8">
                From TVs to Washing Machines — we bring the best brands to your doorstep across Nigeria.
              </p>
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <div data-live-href="/products" className="bg-[#F97316] text-white text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-[#EA6A0A] transition-colors">
                  Shop Now
                </div>
                <div data-live-href="/#categories" className="border-2 border-[#0B1B3A] text-[#0B1B3A] text-sm font-semibold px-[calc(2rem-2px)] py-[calc(0.875rem-2px)] rounded-full hover:bg-[#0B1B3A] hover:text-white transition-colors">
                  View Categories
                </div>
              </div>
              <div className="flex flex-wrap gap-5 text-sm text-[#9ca3af]">
                {["Genuine Products", "Fast Delivery", "Easy Returns"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* 2×2 hero categories */}
            <div className="grid grid-cols-2 gap-4">
              {HERO_CATS.map((c) => (
                <div
                  key={c.name}
                  data-live-href={`/products?category=${c.name.toLowerCase()}`}
                  className="bg-[#F8F9FA] rounded-2xl p-5 flex flex-col items-center justify-center aspect-square hover:bg-white hover:shadow-md transition-all group"
                >
                  <div className={`w-full h-full rounded-lg bg-gradient-to-br ${c.bg} mb-3 group-hover:scale-[1.02] transition-transform flex items-center justify-center`}>
                    <span className="text-white/90 text-sm font-semibold tracking-wider">{c.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ========== CATEGORIES ========== */}
      <Reveal className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl text-[#0B1B3A] mb-3" style={playfair}>Shop by Category</h2>
            <div className="w-12 h-1 bg-[#F97316] rounded-full mx-auto" />
          </div>
          <div className="grid grid-cols-6 gap-4">
            {CATEGORIES.map((c) => (
              <div
                key={c.name}
                data-live-href={`/products?category=${c.name.toLowerCase()}`}
                className="bg-white rounded-2xl shadow-sm outline-1 outline-gray-100 p-4 flex flex-col items-center hover:shadow-md hover:outline-[#F97316]/30 hover:scale-[1.02] transition-all"
              >
                <div className={`w-full aspect-square bg-gradient-to-br ${c.bg} rounded-xl mb-3 flex items-center justify-center`}>
                  <span className="text-[#0B1B3A]/60 text-xs font-bold tracking-wider uppercase">{c.name.slice(0, 3)}</span>
                </div>
                <span className="text-sm font-bold text-[#0B1B3A] text-center">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ========== FEATURED PRODUCTS ========== */}
      <Reveal className="py-20 bg-[#FAFAFA]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl text-[#0B1B3A]" style={playfair}>Featured Products</h2>
            <div data-live-href="/products" className="flex items-center gap-1 text-sm font-semibold text-[#F97316] hover:text-[#EA6A0A]">
              View All
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {FEATURED.map((p) => (
              <ProductCard key={p.name} {...p} />
            ))}
          </div>
        </div>
      </Reveal>

      {/* ========== PROMO BANNER ========== */}
      <Reveal className="bg-gradient-to-r from-[#F97316] to-[#EA6A0A]">
        <div className="max-w-[1280px] mx-auto px-6 py-16 flex items-center justify-between gap-6 text-white">
          <div>
            <h3 className="text-3xl font-bold mb-2">Free Delivery</h3>
            <p className="text-white/90">On all orders above ₦50,000 within Enugu</p>
          </div>
          <div
            data-live-href="/products"
            className="border-2 border-white text-white text-sm font-semibold px-[calc(2rem-2px)] py-[calc(0.75rem-2px)] rounded-full hover:bg-white hover:text-[#F97316] transition-colors shrink-0"
          >
            Shop Now
          </div>
        </div>
      </Reveal>

      {/* ========== LATEST ARRIVALS ========== */}
      <Reveal className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl text-[#0B1B3A]" style={playfair}>Latest Arrivals</h2>
            <div data-live-href="/products" className="flex items-center gap-1 text-sm font-semibold text-[#F97316] hover:text-[#EA6A0A]">
              View All
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {LATEST.map((p) => (
              <ProductCard key={p.name} {...p} />
            ))}
          </div>
        </div>
      </Reveal>

      {/* ========== FOOTER ========== */}
      <Reveal as="footer" className="bg-white border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 py-12 grid grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div data-live-href="/" className="flex items-center gap-2 mb-3">
              <span className="text-xl font-bold text-[#0B1B3A]" style={playfair}>ALFPAT</span>
              <span className="w-px h-5 bg-[#F97316]" />
              <span className="text-[9px] font-medium tracking-[0.25em] uppercase text-[#0B1B3A]">Electronics</span>
            </div>
            <p className="text-sm text-[#9ca3af] leading-relaxed mb-5 max-w-xs">
              Quality Electronics for Every Nigerian Home
            </p>
            <div className="flex gap-2">
              {["f", "📷", "𝕏"].map((s, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border border-gray-200 text-[#9ca3af] flex items-center justify-center text-xs hover:text-[#F97316] hover:border-[#F97316] transition-colors"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-bold text-[#0B1B3A] uppercase tracking-wider mb-4">Shop</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#9ca3af]">
              <li data-live-href="/products">All Products</li>
              <li data-live-href="/products?category=televisions">Televisions</li>
              <li data-live-href="/products?category=refrigerators">Refrigerators</li>
              <li data-live-href="/products?category=washing-machines">Washing Machines</li>
              <li data-live-href="/products?category=audio">Fans & Speakers</li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-xs font-bold text-[#0B1B3A] uppercase tracking-wider mb-4">Account</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#9ca3af]">
              <li data-live-href="/orders">My Orders</li>
              <li data-live-href="/login">Login</li>
              <li data-live-href="/register">Register</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-[#0B1B3A] uppercase tracking-wider mb-4">Contact</h4>
            <ul className="flex flex-col gap-3 text-sm text-[#9ca3af]">
              <li>📍 Enugu, Enugu State</li>
              <li>📞 +234 800 000 0000</li>
              <li>📧 info@alfpat.com</li>
              <li>🕐 Mon–Sat: 8am – 6pm</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 bg-[#F8F9FA]">
          <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between text-xs text-[#9ca3af]">
            <p>© 2025 ALFPAT ELECTRONICS. All rights reserved.</p>
            <p>Made with ❤️ in Nigeria 🇳🇬</p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
