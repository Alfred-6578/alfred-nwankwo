"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/components/browser-frame";

const TESTIMONIALS = [
  {
    quote:
      "With our dedication and expertise in hospitality, we strive to provide stays that are not just accommodations, but a comforting journey toward relaxation and memorable experiences.",
    name: "Aitan Mohammed",
    role: "Product Manager at Y5 Studio",
    avatar: "from-[#c4956a] to-[#3d2f24]",
  },
  {
    quote:
      "StayHaven exceeded every expectation. From the seamless check-in to the impeccable room service, every detail was thoughtfully curated. This is hospitality at its finest.",
    name: "Chioma Okafor",
    role: "Travel Blogger & Content Creator",
    avatar: "from-[#8a6f52] to-[#1a1410]",
  },
  {
    quote:
      "I travel frequently for business, and StayHaven has become my go-to. The executive suites are perfect for working remotely, and the concierge team is phenomenal.",
    name: "David Adeyemi",
    role: "CEO at NovaTech Solutions",
    avatar: "from-[#5c4733] to-[#8a6f52]",
  },
  {
    quote:
      "As a designer, I notice every detail — and StayHaven's interiors are stunning. The blend of modern luxury with warm, welcoming spaces is truly world-class.",
    name: "Fatima Bello",
    role: "Interior Designer",
    avatar: "from-[#e8ddc8] to-[#8a6f52]",
  },
  {
    quote:
      "Three years and counting. The loyalty program is genuinely rewarding, and the staff remember your preferences. It feels like coming home every time.",
    name: "James Okonkwo",
    role: "Frequent Guest & Platinum Member",
    avatar: "from-[#3d2f24] to-[#c4956a]",
  },
];

const SERVICES = [
  { name: "Gym", title: "Where Wellness Meets Excellence", grad: "from-[#1a1410] via-[#3d2f24] to-[#5c4733]", desc: "Stay on top of your fitness goals with our fully equipped gym featuring modern cardio and strength training equipment." },
  { name: "Swimming Pool", title: "Jump In & Refresh Your Senses", grad: "from-[#1e3a4a] via-[#2c5668] to-[#4a8a9e]", desc: "Take a dip in our temperature-controlled pool surrounded by lush greenery — perfect for relaxation or a morning swim." },
  { name: "Restaurant", title: "The Restaurant Hub", grad: "from-[#5c4733] via-[#8a6f52] to-[#c4956a]", desc: "Savor culinary excellence at our restaurant, where every dish is crafted with passion and precision. Indulge in a symphony of flavors that will delight your senses." },
  { name: "Pick Up & Transfers", title: "Luxury Transfers, Effortless Travel", grad: "from-[#2a1e14] via-[#5c4733] to-[#8a6f52]", desc: "Arrive in style with our premium airport pickup and transfer service. Professional drivers, luxury vehicles, seamless comfort." },
  { name: "Parking Space", title: "Safe, Spacious & Always Available", grad: "from-[#1a1410] via-[#2a1e14] to-[#3d2f24]", desc: "Secure, well-lit parking with 24/7 surveillance and valet service — one less thing to worry about during your stay." },
];

const ROOMS = [
  { name: "Standard", price: "₦65,000", tag: "Best Value", grad: "from-[#e8ddc8] via-[#c4956a] to-[#8a6f52]" },
  { name: "Deluxe", price: "₦115,000", tag: "Most Popular", grad: "from-[#c4956a] via-[#8a6f52] to-[#3d2f24]" },
  { name: "Junior Suite", price: "₦175,000", tag: "Extended Stay", grad: "from-[#8a6f52] via-[#5c4733] to-[#3d2f24]" },
  { name: "Executive Suite", price: "₦200,000", tag: "Lounge Access", grad: "from-[#5c4733] via-[#3d2f24] to-[#1a1410]" },
  { name: "Penthouse", price: "₦250,000", tag: "Top Floor", grad: "from-[#3d2f24] via-[#1a1410] to-[#0a0504]" },
];

// Section wrapper that fades+slides up when it enters the preview clip
function Reveal({
  children,
  as: Tag = "section",
  scale = false,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  as?: "section" | "div";
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
        transition:
          "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {children}
    </Tag>
  );
}

export function StayHavenPreview() {
  const serif = { fontFamily: "'Playfair Display', 'Instrument Serif', serif" } as const;
  const sans = { fontFamily: "'Outfit', 'Geist', sans-serif" } as const;

  // About Us — swap which card is large vs small
  const [aboutSwapped, setAboutSwapped] = useState(false);

  // Services — which card is expanded
  const [activeService, setActiveService] = useState(2); // Restaurant default

  // Testimonials — autoplay + manual
  const [tIndex, setTIndex] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => {
      setTIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(iv);
  }, []);
  const t = TESTIMONIALS[tIndex];

  // Facilities — horizontal slider
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const scrollSlider = (dir: -1 | 1) => {
    const el = sliderRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const w = first?.clientWidth ?? 280;
    el.scrollBy({ left: dir * (w + 24) * 2, behavior: "smooth" });
  };

  return (
    <div className="bg-white text-[#111111] w-full" style={sans}>
      {/* ========== NAV ========== */}
      <div className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between bg-white border-b border-gray-100">
        <div className="flex items-center gap-2" data-live-href="/">
          <Image src={"/stayhaven-logo.png"} alt="Logo" className='w-8 h-8 rounded-sm' width={32} height={32} />
          <span className="font-bold text-xl tracking-tight">StayHaven</span>
        </div>
        <div className="flex items-center gap-5 text-sm text-[#555555]">
          <span data-live-href="/">Home</span>
          <span data-live-href="/rooms">Rooms</span>
          <span data-live-href="/about">About Us</span>
          <span data-live-href="/services">Services</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div data-live-href="/login" className="px-4 py-1.5 border border-[#111111] rounded-full text-sm">Login</div>
          <div data-live-href="/rooms" className="px-4 py-1.5 bg-[#111111] text-white rounded-full text-sm flex items-center gap-1.5">
            Book Now
            <span className="h-5 w-5 rounded-full bg-white/15 inline-flex items-center justify-center text-[10px]">→</span>
          </div>
        </div>
      </div>

      {/* ========== HERO ========== */}
      <Reveal className="px-6 pt-2 pb-10">
        <div className="relative rounded-2xl overflow-hidden min-h-[480px] bg-[#2a1e14]">
          <Image
            src="/hero-image.jpg"
            alt="StayHaven luxury hotel"
            fill
            sizes="(max-width: 768px) 50vw, 40vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/70" />

          <div className="relative p-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="h-2 w-2 rounded-full bg-[#2A7A45]" />
              <span className="text-white/90 text-[11px] font-medium">12,000+ guests served across Nigeria</span>
            </div>

            <h1 className="italic text-white font-bold text-[56px] leading-[1.08] mb-5 tracking-tight" style={serif}>
              Your perfect stay<br />is one click away.
            </h1>

            <p className="text-white/75 text-base leading-relaxed max-w-md mb-8">
              Premium rooms, exceptional service, and unforgettable experiences — all in one place. Discover why StayHaven is Nigeria&apos;s most trusted hotel.
            </p>

            <div className="flex items-center gap-6 mb-8">
              <div>
                <div className="text-white text-3xl font-bold leading-none">4.9</div>
                <div className="text-white/60 text-[11px] mt-1">Guest Rating</div>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div>
                <div className="text-white text-3xl font-bold leading-none">3</div>
                <div className="text-white/60 text-[11px] mt-1">Room Types</div>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div>
                <div className="text-white text-3xl font-bold leading-none">24/7</div>
                <div className="text-white/60 text-[11px] mt-1">Concierge</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl shadow-black/30 p-6 grid grid-cols-5 gap-4 max-w-3xl">
              {[
                { l: "CHECK IN", v: "Mar 15, 2026" },
                { l: "CHECK OUT", v: "Mar 18, 2026" },
                { l: "ROOM TYPE", v: "All Types" },
                { l: "GUESTS", v: "2 Guests" },
              ].map((f) => (
                <div key={f.l} className="flex flex-col gap-1.5">
                  <div className="text-[9px] text-[#999999] font-semibold tracking-wider">{f.l}</div>
                  <div className="flex items-center gap-2 border border-[#e8e8e8] rounded-lg px-3 py-2">
                    <span className="h-3.5 w-3.5 rounded border border-[#cccccc] flex-shrink-0" />
                    <span className="text-xs text-[#111111] truncate">{f.v}</span>
                  </div>
                </div>
              ))}
              <div className="flex flex-col justify-end">
                <div className="bg-[#111111] text-white rounded-lg h-[38px] flex items-center justify-center text-sm font-medium">
                  Search →
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ========== ABOUT ========== */}
      <Reveal className="px-6 py-10">
        <div className="flex flex-col items-center mb-10">
          <div className="inline-flex items-center gap-2 border border-[#cccccc] rounded-full px-4 py-1.5 text-xs">
            Let&apos;s Know Us <span>→</span>
          </div>
          <h2 className="text-center font-bold text-5xl leading-[1.15] mt-5 max-w-3xl" style={{ ...serif, color: "#cccccc" }}>
            Explore Premium Comfort, <span className="text-[#111111]">Your Stay — Our Priority</span>
          </h2>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 max-w-sm">
            <div className="inline-flex items-center justify-center w-20 border border-[#cccccc] rounded-full py-1.5 text-sm">About Us</div>
            <h3 className="text-2xl leading-snug mt-4 mb-7">
              StayHaven offers diverse accommodations with user-friendly booking and personalized recommendations.
            </h3>
            <div className="inline-flex items-center gap-2 bg-[#111111] text-white rounded-full px-5 py-2 text-sm">
              Explore More
              <span className="h-5 w-5 rounded-full bg-white/15 inline-flex items-center justify-center text-[10px]">→</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1">
            <div className="flex gap-4">
              {[
                { key: "a", tag: "Premium Rooms", loc: "Lagos, Nigeria", title: "Experience luxury with StayHaven's premium rooms designed for unforgettable stays.", desc: "Spacious interiors, plush bedding, and curated amenities — everything you need for a perfect getaway.", grad: "from-[#c4956a] via-[#8a6f52] to-[#3d2f24]" },
                { key: "b", tag: "Deluxe", loc: "Abuja, Nigeria", title: "Elegant spaces that blend modern comfort with timeless sophistication.", desc: "Experience the epitome of comfort and style with StayHaven's deluxe accommodations, where every detail is designed to elevate your stay.", grad: "from-[#8a6f52] via-[#5c4733] to-[#1a1410]" },
              ].map((card, idx) => {
                // "A" starts as normal; swapped → "A" becomes small, "B" becomes normal
                const isNormal = idx === 0 ? !aboutSwapped : aboutSwapped;
                return (
                  <div
                    key={card.key}
                    className="transition-all duration-500 ease-in-out"
                    style={{ width: isNormal ? "55%" : "45%", paddingTop: isNormal ? 0 : 32 }}
                  >
                    <div
                      className={`relative rounded-lg overflow-hidden bg-gradient-to-br ${card.grad} transition-all duration-500`}
                      style={{ height: isNormal ? 288 : 208 }}
                    >
                      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,220,180,0.35), transparent 55%)" }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="relative h-full p-3 flex flex-col justify-between">
                        <div className="inline-flex items-center border border-white/60 text-white/80 text-[13px] px-3 py-0.5 rounded-full w-fit">
                          {card.tag}
                        </div>
                        <div
                          className="flex justify-end overflow-hidden transition-all duration-500"
                          style={{ opacity: isNormal ? 1 : 0, maxHeight: isNormal ? 120 : 0, paddingTop: isNormal ? 48 : 0 }}
                        >
                          <h3 className="text-white text-lg leading-snug max-w-[260px]">{card.title}</h3>
                        </div>
                        <div className="flex justify-between items-end">
                          <div className="inline-flex items-center gap-1 bg-[#cccccc] h-9 px-1.5 rounded-full">
                            <span className="h-6 w-6 rounded-full bg-white/60 inline-flex items-center justify-center text-xs">⌖</span>
                            <span className="text-xs pr-2">{card.loc}</span>
                          </div>
                          <span className="bg-white rounded-full h-9 w-9 inline-flex items-center justify-center text-sm">↗</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="overflow-hidden transition-all duration-500"
                      style={{ maxHeight: isNormal ? 0 : 160, opacity: isNormal ? 0 : 1, marginTop: isNormal ? 0 : 16 }}
                    >
                      <p className="text-[13px] text-[#111111]/70 max-w-[260px]">{card.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setAboutSwapped((s) => !s)}
                className={`rounded-full p-3 inline-flex items-center justify-center text-xs transition-colors ${
                  aboutSwapped ? "bg-[#111111] text-white" : "border border-[#111111] text-[#111111]"
                }`}
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => setAboutSwapped((s) => !s)}
                className={`rounded-full p-3 inline-flex items-center justify-center text-xs transition-colors ${
                  aboutSwapped ? "border border-[#111111] text-[#111111]" : "bg-[#111111] text-white"
                }`}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ========== FACILITIES ========== */}
      <Reveal className="px-6 mt-4">
        <div className="bg-[#cccccc]/30 rounded-2xl p-8">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 border border-[#cccccc] rounded-full px-4 py-1.5 text-xs w-fit">Facilities</div>
              <h3 className="text-2xl">Checkout Premium Stays</h3>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#111111] text-white rounded-full px-5 py-2 text-sm">
              View More
              <span className="h-5 w-5 rounded-full bg-white/15 inline-flex items-center justify-center text-[10px]">→</span>
            </div>
          </div>

          <div
            ref={sliderRef}
            className="flex gap-6 mt-8 overflow-x-auto scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {ROOMS.map((r) => (
              <div key={r.name} className="min-w-[280px] flex-shrink-0">
                <div className={`relative h-[340px] rounded-2xl overflow-hidden bg-gradient-to-br ${r.grad}`}>
                  <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 30% 25%, rgba(255,220,180,0.3), transparent 55%)" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <div className="relative h-full p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white text-sm">♥</div>
                      <div className="border border-white/60 text-white text-[11px] px-3 py-1.5 rounded-full">{r.price} / night</div>
                    </div>
                    <div className="flex justify-between items-start bg-white/30 backdrop-blur rounded-2xl p-3">
                      <div className="flex flex-col gap-2">
                        <div className="border border-white/60 text-white text-[11px] px-3 py-0.5 rounded-full w-fit">{r.tag}</div>
                        <h3 className="text-white text-lg font-semibold leading-tight">{r.name}</h3>
                      </div>
                      <div className="bg-white text-[#111111] rounded-full h-9 w-9 inline-flex items-center justify-center text-sm">↗</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-end mt-8">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => scrollSlider(-1)}
                className="border border-[#111111] rounded-full p-3 text-xs hover:bg-[#111111] hover:text-white transition-colors"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollSlider(1)}
                className="bg-[#111111] text-white rounded-full p-3 text-xs"
              >
                →
              </button>
            </div>
            <p className="text-xs text-right text-[#111111]/80 max-w-[280px]">
              Book your stay for a personalized experience. Explore our premium accommodations and enjoy a memorable stay with us.
            </p>
          </div>
        </div>
      </Reveal>

      {/* ========== SERVICES ========== */}
      <Reveal className="px-6 mt-24">
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 border border-[#cccccc] rounded-full px-4 py-1.5 text-xs">Our Services →</div>
          <h2 className="text-center font-bold text-5xl leading-[1.15] max-w-3xl" style={{ ...serif, color: "#cccccc" }}>
            <span className="text-[#111111]">Quality Service,</span> Unforgettable Stays
          </h2>
          <p className="text-[#999999] text-center max-w-xl text-sm">
            We provide exceptional service to ensure your stay is memorable and enjoyable.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#111111] text-white rounded-full px-5 py-2 text-sm mt-2">
            Explore More
            <span className="h-5 w-5 rounded-full bg-white/15 inline-flex items-center justify-center text-[10px]">→</span>
          </div>
        </div>

        <div className="flex gap-3 mt-10 h-[500px]">
          {SERVICES.map((s, i) => {
            const active = i === activeService;
            return (
              <div
                key={s.name}
                onMouseEnter={() => setActiveService(i)}
                className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${s.grad} cursor-pointer transition-[flex] duration-500 ease-in-out`}
                style={{ flex: active ? 2.5 : 1 }}
              >
                <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 35% 30%, rgba(255,220,180,0.25), transparent 55%)" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Collapsed label (vertical text) */}
                <div
                  className="absolute inset-0 flex items-end px-4 pb-4 transition-opacity duration-400"
                  style={{ opacity: active ? 0 : 1, pointerEvents: active ? "none" : "auto" }}
                >
                  <div className="[writing-mode:vertical-rl] rotate-180">
                    <p className="text-white/70 text-[11px] mb-1">{s.name}</p>
                    <h3 className="text-white text-base font-semibold leading-tight">{s.title}</h3>
                  </div>
                </div>

                {/* Expanded content */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-400"
                  style={{ opacity: active ? 1 : 0, pointerEvents: active ? "auto" : "none" }}
                >
                  <p className="text-white/70 text-[11px] font-medium uppercase tracking-widest mb-1">{s.name}</p>
                  <h3 className="text-white text-2xl font-bold mb-2">{s.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed max-w-md">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* ========== TESTIMONIALS ========== */}
      <Reveal className="px-6 mt-28 relative">
        <div className="grid grid-cols-4 gap-3">
          {[
            { h: "h-32", grad: "from-[#e8ddc8] to-[#c4956a]" },
            { h: "h-40", grad: "from-[#c4956a] to-[#8a6f52]" },
            { h: "h-36", grad: "from-[#8a6f52] to-[#5c4733]" },
            { h: "h-32", grad: "from-[#5c4733] to-[#1a1410]" },
            { h: "h-40 -mt-5", grad: "from-[#8a6f52] to-[#3d2f24]" },
            { h: "h-36 -mt-5", grad: "from-[#c4956a] to-[#5c4733]" },
            { h: "h-32 -mt-5", grad: "from-[#3d2f24] to-[#8a6f52]" },
            { h: "h-40 -mt-5", grad: "from-[#5c4733] to-[#c4956a]" },
          ].map((c, i) => (
            <div key={i} className={`rounded-xl overflow-hidden bg-gradient-to-br ${c.grad} ${c.h}`}>
              <div className="w-full h-full" style={{ backgroundImage: "radial-gradient(circle at 40% 40%, rgba(255,220,180,0.25), transparent 60%)" }} />
            </div>
          ))}
        </div>

        {/* Circular testimonial card overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white rounded-full aspect-square w-[380px] flex flex-col items-center justify-center p-10 text-center shadow-2xl border border-[#e8e8e8] pointer-events-auto">
            <div className="inline-flex items-center gap-2 border border-[#cccccc] rounded-full px-3 py-1 text-[11px] mb-4">Testimonial</div>
            <div className="text-[#cccccc] text-2xl mb-2">&ldquo;</div>
            <p
              key={tIndex}
              className="text-[#111111] text-xs leading-relaxed max-w-[260px] transition-opacity duration-500"
              style={{ animation: "stayhavenFadeIn 0.5s ease-out" }}
            >
              {t.quote}
            </p>
            <div className="flex flex-col items-center gap-1.5 mt-5">
              <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${t.avatar}`} />
              <p className="text-[#111111] text-xs font-semibold">{t.name}</p>
              <p className="text-[#999999] text-[10px]">{t.role}</p>
            </div>
            <div className="flex gap-1.5 mt-3">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setTIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${i === tIndex ? "w-5 bg-[#111111]" : "w-1.5 bg-[#cccccc]"}`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={() => setTIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            className="border border-[#111111] rounded-full p-3 text-xs hover:bg-[#111111] hover:text-white transition-colors"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setTIndex((i) => (i + 1) % TESTIMONIALS.length)}
            className="bg-[#111111] text-white rounded-full p-3 text-xs"
          >
            →
          </button>
        </div>

        <style>{`
          @keyframes stayhavenFadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        `}</style>
      </Reveal>

      {/* ========== PROMOS ========== */}
      <Reveal className="px-6 mt-24" scale>
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 border border-[#cccccc] rounded-full px-4 py-1.5 text-xs">Promotions →</div>
          <h2 className="text-center font-bold text-5xl leading-[1.15] max-w-3xl" style={{ ...serif, color: "#cccccc" }}>
            <span className="text-[#111111]">Get promo</span> for a cheaper price
          </h2>
          <p className="text-[#999999] text-center max-w-md text-sm">
            Discover exclusive deals and limited-time offers designed to help you save on your next getaway.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {[
            { bg: "from-[#0B1B3A] to-[#1a3060]", badge: "Limited Time", badgeColor: "bg-[#fbbf24]", discount: "25%", title: "First Stay Discount", desc: "New to StayHaven? Enjoy 25% off your first booking on any room type.", terms: "*Valid for new accounts only." },
            { bg: "from-[#1a1a2e] to-[#16213e]", badge: "Weekend Special", badgeColor: "bg-[#34d399]", discount: "30%", title: "Weekend Getaway Deal", desc: "Book a Friday–Sunday stay and save 30% on Deluxe rooms and above.", terms: "*Valid on weekends through Dec 2026." },
            { bg: "from-[#2d1b00] to-[#4a2c00]", badge: "Loyalty Exclusive", badgeColor: "bg-[#facc15]", discount: "40%", title: "Gold & Platinum Perk", desc: "Unlock 40% off suite upgrades with your Gold or Platinum membership.", terms: "*Gold & Platinum members only." },
          ].map((p) => (
            <div key={p.title} className={`relative overflow-hidden rounded-2xl p-7 min-h-[260px] bg-gradient-to-br ${p.bg} flex flex-col justify-between`}>
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5" />
              <div className="absolute -right-4 -bottom-10 h-24 w-24 rounded-full bg-white/5" />
              <div className="relative flex justify-between items-start">
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full text-[#111111] ${p.badgeColor}`}>{p.badge}</span>
                <div className="flex flex-col items-end">
                  <span className="text-white/50 text-[11px]">Save up to</span>
                  <span className="text-white text-5xl font-bold leading-none">{p.discount}</span>
                  <span className="text-white/60 text-[11px]">OFF</span>
                </div>
              </div>
              <div className="relative mt-4">
                <h3 className="text-white text-lg font-bold mb-1.5">{p.title}</h3>
                <p className="text-white/70 text-xs leading-relaxed mb-3">{p.desc}</p>
                <p className="text-white/40 text-[10px]">{p.terms}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ========== FOOTER ========== */}
      <Reveal as="div" className="mt-20 bg-[#111111] text-white rounded-t-3xl overflow-hidden">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-between px-8 opacity-20">
            {["from-[#c4956a] to-[#8a6f52]", "from-[#8a6f52] to-[#3d2f24]", "from-[#5c4733] to-[#1a1410]", "from-[#8a6f52] to-[#c4956a]"].map((g, i) => (
              <div key={i} className={`w-32 rounded-xl bg-gradient-to-br ${g} ${i % 2 === 0 ? "h-36 -rotate-6" : "h-32 rotate-6 mt-8"}`} />
            ))}
          </div>
          <div className="relative py-16 text-center">
            <h2
              className="font-bold uppercase tracking-tighter leading-none text-[96px]"
              style={{ ...serif, color: "rgba(255,255,255,0.1)" }}
            >
              Stay<span style={{ color: "rgba(255,255,255,0.3)" }}>Haven</span>
            </h2>
          </div>
        </div>

        <div className="border-t border-white/10 px-12 py-12">
          <div className="flex justify-center gap-24">
            {[
              { h: "About us", items: ["Our Story", "Careers", "Press"] },
              { h: "FAQ", items: ["Booking", "Cancellation", "Payments"] },
              { h: "Contact us", items: ["Support", "Partnerships", "Feedback"] },
            ].map((g) => (
              <div key={g.h}>
                <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-1">{g.h} →</h4>
                <ul className="flex flex-col gap-2.5">
                  {g.items.map((l) => (
                    <li key={l} className="text-white/50 text-sm">{l}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="max-w-lg mx-auto text-center mt-12">
            <p className="text-white/50 text-xs italic leading-relaxed">
              &ldquo;With our dedication and expertise in hospitality, we strive to offer stays that go beyond just a room, providing a comforting journey toward relaxation and unforgettable experiences.&rdquo;
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 px-12 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-gradient-to-br from-[#c4956a] to-[#3d2f24]" />
              <span className="text-white text-sm font-semibold">StayHaven</span>
            </div>
            <span className="text-white/40 text-xs">|</span>
            <span className="text-white/40 text-xs">Helpline: +234 800 STAYHAVEN</span>
          </div>
          <div className="flex items-center gap-3">
            {["f", "𝕏", "◎"].map((s, i) => (
              <div key={i} className="h-8 w-8 rounded-full border border-white/20 text-white/50 flex items-center justify-center text-xs">
                {s}
              </div>
            ))}
          </div>
          <p className="text-white/30 text-xs">© 2026 StayHaven. All Rights Reserved.</p>
        </div>
      </Reveal>
    </div>
  );
}
