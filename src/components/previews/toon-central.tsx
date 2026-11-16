"use client";
/* eslint-disable @next/next/no-img-element */

import { useReveal } from "@/components/browser-frame";

// Static rebuild of the Toon Central home page, section by section from the real components
// (Header, PanelHero, TrendingChart, ShortsSection, OriginalsSection, CreatorShelves, ReleaseLog,
// GenreWall, SubscribeCoupon, Footer), with the live catalogue's covers, titles and numbers.

type Tone = "mint" | "sun" | "paper";
const SUN_GENRES = ["Action", "Superhero", "Military", "Martial Arts", "Sports", "Action Comedy", "Crime"];
const PAPER_GENRES = ["Romance", "Drama", "Slice of Life", "Coming of Age", "Teen", "School Life", "Heartwarming", "Fantasy Romance", "Comedy"];
const tone = (g: string): Tone => (SUN_GENRES.includes(g) ? "sun" : PAPER_GENRES.includes(g) ? "paper" : "mint");
const TAG_BG: Record<Tone, string> = { mint: "bg-[var(--mint)]", sun: "bg-[var(--sun)]", paper: "bg-[var(--paper)]" };
const TONE_COLOR: Record<Tone, string> = { mint: "var(--mint)", sun: "var(--sun)", paper: "var(--paper)" };
const img = (name: string) => `/tc/${name}.jpg`;

// ---------- icons (react-icons shapes, inlined) ----------
type IconProps = { className?: string };
const Eye = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 576 512" fill="currentColor" className={`h-[1em] w-[1em] ${className}`}><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0 1.3 5.1 2 10.5 2 16 0 35.3-28.7 64-64 64-5.5 0-10.9-.7-16-2 0 .7 0 1.3 0 2 0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" /></svg>
);
const Heart = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" className={`h-[1em] w-[1em] ${className}`}><path d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0 0 18 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z" /></svg>
);
const Notebook = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={`h-[1em] w-[1em] ${className}`}><path d="M3 1h10l.5.5v13l-.5.5H3l-.5-.5v-13L3 1zm.5 13h9V2h-9v12zM5 4h6v1H5V4zm0 2h6v1H5V6zm0 2h4v1H5V8z" /></svg>
);
const Play = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={`h-[1em] w-[1em] ${className}`}><path d="M8 5v14l11-7z" /></svg>
);
const Bookmark = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="32" strokeLinejoin="round" className={`h-[1em] w-[1em] ${className}`}><path d="M352 48H160a48 48 0 0 0-48 48v368l144-128 144 128V96a48 48 0 0 0-48-48z" /></svg>
);
const Plus = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="32" strokeLinecap="round" className={`h-[1em] w-[1em] ${className}`}><path d="M256 112v288M400 256H112" /></svg>
);
const Chevron = ({ dir = "down", className = "" }: IconProps & { dir?: "down" | "left" | "right" }) => (
  <svg viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="48" strokeLinecap="round" strokeLinejoin="round" className={`h-[1em] w-[1em] ${className}`}>
    <path d={dir === "down" ? "M112 184l144 144 144-144" : dir === "left" ? "M328 112L184 256l144 144" : "M184 112l144 144-144 144"} />
  </svg>
);
const Search = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 512 512" fill="currentColor" className={`h-[1em] w-[1em] ${className}`}><path d="M456.69 421.39 362.6 327.3a173.81 173.81 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3zM97.92 222.72a124.8 124.8 0 1 1 124.8 124.8 124.95 124.95 0 0 1-124.8-124.8z" /></svg>
);
const Pause = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 512 512" fill="currentColor" className={`h-[1em] w-[1em] ${className}`}><path d="M208 432h-48a16 16 0 0 1-16-16V96a16 16 0 0 1 16-16h48a16 16 0 0 1 16 16v320a16 16 0 0 1-16 16zM352 432h-48a16 16 0 0 1-16-16V96a16 16 0 0 1 16-16h48a16 16 0 0 1 16 16v320a16 16 0 0 1-16 16z" /></svg>
);
const LockOpen = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" className={`h-[1em] w-[1em] ${className}`}><path d="M336 112a80 80 0 0 0-160 0v96" /><rect x="96" y="208" width="320" height="272" rx="48" ry="48" /></svg>
);
const Library = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="32" strokeLinejoin="round" className={`h-[1em] w-[1em] ${className}`}><rect x="32" y="96" width="64" height="368" rx="16" /><path d="M112 224h128M112 400h128" /><rect x="112" y="160" width="128" height="304" rx="16" /><rect x="256" y="48" width="96" height="416" rx="16" /><path d="M422.46 96.11l-40.4 4.25c-11.12 1.17-19.18 11.57-17.93 23.1l34.92 321.59c1.26 11.53 11.37 20 22.49 18.84l40.4-4.25c11.12-1.17 19.18-11.57 17.93-23.1L445 115c-1.31-11.58-11.42-20.06-22.54-18.89z" /></svg>
);
const Ban = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="32" className={`h-[1em] w-[1em] ${className}`}><circle cx="256" cy="256" r="208" /><path d="M108.92 108.92l294.16 294.16" /></svg>
);
const Cut = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="32" strokeLinecap="round" className={`h-[1em] w-[1em] ${className}`}><circle cx="144" cy="416" r="64" /><circle cx="144" cy="96" r="64" /><path d="M192 136l272 248M192 376l272-248" /></svg>
);
const Social = ({ name }: { name: "x" | "ig" | "fb" | "in" }) => {
  const paths = {
    x: "M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z",
    ig: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8z",
    fb: "M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z",
    in: "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-24.6 44.2-48.3 81.2-48.3 94 0 111.28 61.9 111.28 142.3V448z",
  };
  return <svg viewBox={name === "fb" ? "0 0 320 512" : "0 0 512 512"} fill="currentColor" className="h-[1em] w-[1em]"><path d={paths[name]} /></svg>;
};

// ---------- the wordmark (same vector as the site's Logo component) ----------
function Logo({ className = "", maskId }: { className?: string; maskId: string }) {
  return (
    <svg viewBox="0 0 394 178" fill="currentColor" className={className} aria-label="Toon Central">
      <defs>
        <mask id={maskId}>
          <rect x="8" y="132" width="366" height="43" fill="#fff" />
          <path d="M41 148.6A7.6 8.6 0 1 0 41 158.4 M92 147H83V160H92M83 153.5H90.5 M135 162V145L145 162V145 M184 147H200M192 147V162 M239 162V147H245.5A3.25 3.25 0 0 1 245.5 153.5H239M244.5 153.5L249.5 162 M290 162L297.5 146.5L305 162M293 157H302 M346 145V160H355" fill="none" stroke="#000" strokeWidth="4" strokeMiterlimit="1" />
        </mask>
      </defs>
      <path d="M1 10H75V26H1Z" />
      <path d="M26 25H44L32 112H17Z" />
      <path fillRule="evenodd" transform="rotate(6 123.5 46.5)" d="M75.5 46.5a48 45.5 0 1 0 96 0a48 45.5 0 1 0 -96 0ZM95.0 45.0a31 28.5 0 1 0 62 0a31 28.5 0 1 0 -62 0Z" />
      <path fillRule="evenodd" transform="rotate(6 230.5 46.5)" d="M182.5 46.5a48 45.5 0 1 0 96 0a48 45.5 0 1 0 -96 0ZM202.0 45.0a31 28.5 0 1 0 62 0a31 28.5 0 1 0 -62 0Z" />
      <path d="M90 99H157V113H90ZM194 99H261V113H194Z" />
      <path d="M306 27H324L304 113H286Z" />
      <path d="M306 27L322 27L392 88L377 98Z" />
      <path d="M374 18H389L392 98H376Z" />
      <rect x="8" y="132" width="366" height="43" mask={`url(#${maskId})`} />
    </svg>
  );
}

// ---------- data: the live home page (Nov 2026) ----------
type Card = { key: string; title: string; creator: string; genres: string[]; views: string; likes: string; ch?: number; completed?: boolean };

const TRENDING: Card[] = [
  { key: "hunter", title: "Hunter", creator: "silversnow_nikkitapimwrld", genres: ["Action"], views: "10.4K", likes: "108", ch: 1, completed: true },
  { key: "cityhero", title: "CITY HERO", creator: "Tooncentralofficial", genres: ["Action"], views: "7K", likes: "85" },
  { key: "konkoh", title: "Konkoh", creator: "silversnow_nikkitapimwrld", genres: ["Action"], views: "6.9K", likes: "70", ch: 1 },
  { key: "odogwu", title: "ODOGWU", creator: "47STUDIOS", genres: ["Action"], views: "6.2K", likes: "51", ch: 7 },
  { key: "omimi", title: "OMIMI", creator: "Tooncentralofficial", genres: ["Action"], views: "3.2K", likes: "34" },
  { key: "djinn", title: "Djinn of pride", creator: "silversnow_nikkitapimwrld", genres: ["Action"], views: "1.7K", likes: "16", ch: 1 },
  { key: "afridivaz", title: "AFRI DIVAZ", creator: "Tooncentralofficial", genres: ["Slice of Life"], views: "1.5K", likes: "13" },
  { key: "crossfreq", title: "Cross Frequency", creator: "user1775230750797257", genres: ["Action"], views: "1.4K", likes: "18" },
  { key: "blackstar", title: "BLACK STAR", creator: "Tooncentralofficial", genres: ["Action"], views: "1.3K", likes: "18" },
  { key: "headoverheels", title: "Head over heels", creator: "Tooncentralofficial", genres: ["Adventure"], views: "1.1K", likes: "27" },
];

const SHORTS = [
  { key: "short0", title: "AFRIDIVAS", creator: "Tooncentralofficial", genres: ["Slice of Life", "Teen"], views: "36", likes: "1" },
  { key: "short1", title: "AfriDivaz: 4 Girls, 1 Golden Ticket, Zero Chill", creator: "Tooncentralofficial", genres: ["Drama", "Romance"], views: "1.3K", likes: "6" },
  { key: "short2", title: "KEBLE INVESTMENT", creator: "", genres: [], views: "1.4K", likes: "2", sponsored: true },
  { key: "short3", title: "Belle Full", creator: "ononuro kevwe", genres: ["Slice of Life"], views: "1.9K", likes: "11" },
  { key: "short4", title: "NANCY (2-3)", creator: "ononuro kevwe", genres: ["Drama", "Slice of Life"], views: "1.8K", likes: "6" },
  { key: "short5", title: "ESE'S CHILD", creator: "ononuro kevwe", genres: ["Drama", "Mystery"], views: "1.7K", likes: "5" },
  { key: "short6", title: "Engagement Issues", creator: "ononuro kevwe", genres: ["Drama", "Romance"], views: "1.3K", likes: "2" },
  { key: "short7", title: "Take care of our women", creator: "ononuro kevwe", genres: ["Drama", "Horror"], views: "1.3K", likes: "1" },
];

const ORIGINALS: Card[] = [
  { key: "nolifers", title: "No Lifers Game", creator: "Tooncentralofficial", genres: ["Action", "Fantasy"], views: "554", likes: "7" },
  { key: "primordials", title: "Primordials", creator: "Tooncentralofficial", genres: ["Action"], views: "989", likes: "20" },
  { key: "chicken", title: "Crazy Chicken", creator: "Tooncentralofficial", genres: ["Adventure"], views: "578", likes: "9" },
  { key: "widow", title: "WIDOW'S GUILT", creator: "Tooncentralofficial", genres: ["Mystery", "Romance"], views: "592", likes: "9" },
  { key: "tribe", title: "4 The Tribe", creator: "Tooncentralofficial", genres: ["Fantasy", "Action"], views: "728", likes: "13" },
  { key: "caped", title: "caped calvary", creator: "Tooncentralofficial", genres: ["Adventure", "Superhero"], views: "504", likes: "8" },
  { key: "soulair", title: "Soul Air", creator: "Tooncentralofficial", genres: ["Action"], views: "544", likes: "8" },
  { key: "afridivaz", title: "AFRI DIVAZ", creator: "Tooncentralofficial", genres: ["Slice of Life", "Romance"], views: "1.5K", likes: "13" },
  { key: "blackstar", title: "BLACK STAR", creator: "Tooncentralofficial", genres: ["Action", "Adventure"], views: "1.3K", likes: "18", completed: true },
  { key: "cityhero", title: "CITY HERO", creator: "Tooncentralofficial", genres: ["Action", "Sci-Fi"], views: "7K", likes: "85" },
];

type Shelf = { name: string; avatar?: string; initials?: string; initialsTone?: Tone; summary: string; comics: { key: string; title: string; meta: string }[]; blurb?: string };
const INDIES: Shelf[] = [
  { name: "ettastudios", initials: "ET", initialsTone: "paper", summary: "1 Mafiki · 857 reads", comics: [{ key: "techbro", title: "Tech Bro", meta: "1 ch" }], blurb: "Wale, a determined young man, finally breaks into the dynamic and competitive tech industry after enduring years of relentless job searching. As Wale embarks on his new journey, he discovers that the tech world holds both exhilarating opportunities and unexpected challenges." },
  { name: "ARTBYNONSO", initials: "AR", initialsTone: "sun", summary: "1 Mafiki · 822 reads", comics: [{ key: "supaeaglez", title: "SUPA EAGLEZ", meta: "1 ch" }], blurb: "Supa Eaglez is a popular Nigerian comic book series created by digital artist and illustrator Chinonso Wilfred (known as @artsbynonso). Inspired by the nostalgic feeling of classic comics like Supa Strikas, it features a thrilling football storyline." },
  { name: "Sanmi crown", initials: "SC", initialsTone: "sun", summary: "2 Mafiki · 1.8K reads", comics: [{ key: "azania", title: "AZANIA", meta: "5 ch" }, { key: "eya", title: "EYA THE TRIBE: ORIGINS", meta: "3 ch" }] },
  { name: "G.millenniumcomics", initials: "GM", initialsTone: "mint", summary: "1 Mafiki · 811 reads", comics: [{ key: "teamstorm", title: "TEAM STORM", meta: "3 ch" }], blurb: "Hundreds of years ago, there was a war that raged between humanity, and demons; strange creatures from another world. At the crux of the conflict, the Shibatsu clan was tasked with guarding a very destructive power." },
  { name: "47STUDIOS", avatar: "av-47", summary: "1 Mafiki · 6.2K reads", comics: [{ key: "odogwu", title: "ODOGWU", meta: "7 ch" }], blurb: "“The jolly giant” is faced by unprecedented power for which he is praised, feared and sought for. He now deals with all these reactions with the acceptance of his new-found “power”." },
  { name: "silversnow_nikkitapimwrld", avatar: "av-silver", summary: "4 Mafiki · 19.9K reads", comics: [{ key: "orisha", title: "Orisha imbues", meta: "1 ch" }, { key: "hunter", title: "Hunter", meta: "1 ch · Done" }, { key: "konkoh", title: "Konkoh", meta: "1 ch" }, { key: "djinn", title: "Djinn of pride", meta: "1 ch" }] },
];

type LogRow = { key: string; title: string; creator: string; day: number; month: string; short?: boolean };
const LOG: { month: string; year: number; rows: LogRow[] }[] = [
  { month: "Nov", year: 2026, rows: [{ key: "short0", title: "AFRIDIVAS", creator: "Tooncentralofficial", day: 11, month: "Nov", short: true }] },
  { month: "Oct", year: 2026, rows: [
    { key: "afridivaz", title: "AFRI DIVAZ", creator: "Tooncentralofficial", day: 10, month: "Oct" },
    { key: "techbro", title: "Tech Bro", creator: "ettastudios · 1 ch", day: 8, month: "Oct" },
  ] },
  { month: "Jul", year: 2026, rows: [{ key: "short1", title: "AfriDivaz: 4 Girls, 1 Golden Ticket, Zero Chill", creator: "Tooncentralofficial", day: 2, month: "Jul", short: true }] },
  { month: "Jun", year: 2026, rows: [
    { key: "blackstar", title: "BLACK STAR", creator: "Tooncentralofficial", day: 27, month: "Jun" },
    { key: "supaeaglez", title: "SUPA EAGLEZ", creator: "ARTBYNONSO · 1 ch", day: 24, month: "Jun" },
  ] },
  { month: "May", year: 2026, rows: [{ key: "cityhero", title: "CITY HERO", creator: "Tooncentralofficial", day: 4, month: "May" }] },
  { month: "Apr", year: 2026, rows: [{ key: "short3", title: "Belle Full", creator: "ononuro kevwe", day: 3, month: "Apr", short: true }] },
];

const FEATURED_GENRES = [
  { name: "Action", count: 31, covers: ["hunter", "cityhero", "konkoh"], titles: "Hunter · CITY HERO · Konkoh", more: 28 },
  { name: "Fantasy", count: 12, covers: ["omimi", "eya", "teamstorm"], titles: "OMIMI · EYA THE TRIBE: ORIGINS · TEAM STORM", more: 9 },
  { name: "Adventure", count: 9, covers: ["blackstar", "headoverheels", "tribe"], titles: "BLACK STAR · Head over heels · 4 The Tribe", more: 6 },
  { name: "Superhero", count: 7, covers: ["cityhero", "azania", "caped"], titles: "CITY HERO · AZANIA · caped calvary", more: 4 },
];

const GENRE_WALL: [string, number][] = [
  ["Action", 31], ["Action Comedy", 0], ["Adventure", 9], ["Anthology", 2], ["Comedy", 4], ["Coming of Age", 1], ["Crime", 4], ["Drama", 6], ["Educational", 1],
  ["Epic Fantasy", 1], ["Fantasy", 12], ["Fantasy Romance", 0], ["Gaming", 0], ["Heartwarming", 0], ["Historical", 2], ["Horror", 0], ["Isekai/Ojemba", 0],
  ["Martial Arts", 1], ["Military", 3], ["Mystery", 5], ["Otaku Connect", 0], ["Psychological", 0], ["Romance", 4], ["School Life", 0], ["Sci-Fi", 5],
  ["Slice of Life", 1], ["Sports", 1], ["Superhero", 7], ["Supernatural", 4], ["Teen", 2], ["Thriller", 5], ["Tragedy", 1], ["Urban Fantasy", 0],
];

const FILM_PRINT = Array.from({ length: 24 }, (_, i) => `TOON CENTRAL ▸ ${String(i * 2 + 12).padStart(2, "0")}A`).join("     ");

// ---------- building blocks ----------
function Reveal({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const [ref, inView] = useReveal(0.08);
  return (
    <section
      ref={ref}
      id={id}
      className={className}
      style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)" }}
    >
      {children}
    </section>
  );
}

const Tag = ({ genre, className = "" }: { genre: string; className?: string }) => <span className={`tc-tag ${TAG_BG[tone(genre)]} ${className}`}>{genre}</span>;

function SectionHeader({ title, action, href, paper = false, children }: { title: string; action: string; href: string; paper?: boolean; children?: React.ReactNode }) {
  return (
    <div className={`mb-5 flex items-end justify-between gap-4 border-b-2 pb-3 ${paper ? "border-[var(--ink)]" : "border-[var(--line)]"}`}>
      <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
        <h2 className={`tc-display text-4xl uppercase leading-none ${paper ? "text-[var(--ink)]" : "text-white"}`}>{title}</h2>
        {children}
      </div>
      <span data-live-href={href} className={`shrink-0 text-sm font-semibold ${paper ? "text-[var(--ink)]" : "text-slate-300"}`}>{action} →</span>
    </div>
  );
}

function Stats({ views, likes, ch, className = "" }: { views: string; likes: string; ch?: number; className?: string }) {
  return (
    <span className={`flex items-center gap-3 text-xs ${className}`}>
      {ch != null && <span className="flex items-center gap-1"><Notebook /> {ch} ch</span>}
      <span className="flex items-center gap-1"><Eye /> {views}</span>
      <span className="flex items-center gap-1"><Heart /> {likes}</span>
    </span>
  );
}

function ComicCard({ c, paper = false }: { c: Card; paper?: boolean }) {
  return (
    <article data-live-href="/discover" className="group relative">
      <div className={`tc-sweep relative aspect-[3/4] overflow-hidden border-2 ${paper ? "border-[var(--ink)] shadow-[5px_5px_0_var(--ink)]" : "border-[var(--line)]"}`}>
        <img loading="lazy" decoding="async" src={img(c.key)} alt={c.title} className="h-full w-full object-cover" />
        {c.completed && <div className="absolute bottom-2 left-2"><span className="tc-tag bg-[var(--paper)]">Completed</span></div>}
        <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center border-2 border-[var(--line)] bg-[var(--ink)]/85 text-base text-white"><Bookmark /></span>
      </div>
      <div className="pt-3">
        <h3 className={`line-clamp-1 text-[15px] font-bold leading-snug ${paper ? "text-[var(--ink)]" : "text-white"}`}>{c.title}</h3>
        <p className={`mt-0.5 truncate text-xs ${paper ? "text-[var(--ink)]/60" : "text-slate-400"}`}>{c.creator}</p>
        <div className="mt-2 flex flex-wrap gap-1">{c.genres.slice(0, 2).map((g) => <Tag key={g} genre={g} />)}</div>
        <Stats views={c.views} likes={c.likes} ch={c.ch} className={`mt-2 ${paper ? "text-[var(--ink)]/75" : "text-slate-300"}`} />
      </div>
    </article>
  );
}

// ---------- page ----------
export function ToonCentralPreview() {
  const [first, ...rest] = TRENDING;

  return (
    <div className="tcp relative w-full overflow-hidden text-[#f5f7ff]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700&display=swap');
        .tcp { --ink:#070b14; --panel:#0f1622; --line:#223047; --mint:#3effa2; --mint-deep:#05834b; --sun:#f2bb30; --paper:#f4efe2;
          background-color: var(--ink); font-family: 'Archivo', system-ui, sans-serif;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E"); }
        .tcp img { display:block; max-width:100%; }
        .tc-display { font-family: 'Anton', Impact, 'Arial Narrow', sans-serif; }
        .tc-btn { display:inline-flex; align-items:center; justify-content:center; gap:.5rem; padding:.5rem 1rem; border:2px solid transparent; border-radius:3px;
          font-family:'Anton', Impact, sans-serif; font-size:.95rem; letter-spacing:.03em; text-transform:uppercase; line-height:1; }
        .tc-btn-primary { background:var(--mint); color:var(--ink); border-color:#000; box-shadow:4px 4px 0 var(--mint-deep); }
        .tc-btn-ghost { background:transparent; color:#fff; border-color:rgba(255,255,255,.7); }
        .tc-tag { display:inline-flex; width:fit-content; align-items:center; padding:.2rem .45rem .15rem; border-radius:2px; font-family:'Anton', Impact, sans-serif;
          font-size:.7rem; letter-spacing:.04em; text-transform:uppercase; line-height:1.1; color:var(--ink); }
        .tc-halftone-fade { background-image: radial-gradient(circle, var(--dot, rgba(255,255,255,.09)) 1.2px, transparent 1.6px); background-size:9px 9px;
          mask-image: linear-gradient(to bottom, #000 0%, rgba(0,0,0,.5) 45%, transparent 100%); }
        .tc-halftone-overlay { background-image: radial-gradient(circle, rgba(7,11,20,.6) 1.1px, transparent 1.5px); background-size:5px 5px; }
        .tc-sweep { background-color:var(--panel); background-image: radial-gradient(circle, rgba(255,255,255,.07) 1.2px, transparent 1.6px); background-size:9px 9px; }
        .tc-rank-outline { color:transparent; -webkit-text-stroke: var(--rank-width, 2px) var(--rank-color, #3b4a63); }
        .tc-rank-top { --rank-color: var(--sun); }
        .tc-rank-solid { color:var(--sun); -webkit-text-stroke:3px #000; text-shadow:6px 6px 0 #000; }
        .tc-paper { --dot: rgba(7,11,20,.07); background-color:var(--paper); color:var(--ink); }
        .tc-film { position:relative; background-color:#0a0a0a; }
        .tc-film::before, .tc-film::after { content:""; position:absolute; inset-inline:0; height:36px; background-color:#121212;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='14'%3E%3Crect x='5' y='2' width='12' height='10' rx='2.5' fill='%23ece6d6'/%3E%3C/svg%3E");
          background-size:22px 14px; background-repeat:repeat-x; pointer-events:none; }
        .tc-film::before { top:0; background-position:0 18px; border-bottom:1px solid #2a2a2a; }
        .tc-film::after { bottom:0; background-position:0 4px; border-top:1px solid #2a2a2a; }
        .tc-film-edge { z-index:1; overflow:hidden; white-space:pre; font-family:ui-monospace, Menlo, monospace; font-size:9px; line-height:12px; letter-spacing:.2em; color:rgba(242,187,48,.55); }
        .tc-dot-field { background-image: radial-gradient(circle, var(--dot-color, var(--mint)) 1.4px, transparent 1.8px); background-size:8px 8px;
          mask-image: linear-gradient(to top, #000 0%, rgba(0,0,0,.55) 55%, transparent 100%); }
        @keyframes tcProgress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .tc-progress { transform-origin:left; animation: tcProgress 7s linear infinite; }
      `}</style>
      <div className="tc-halftone-fade pointer-events-none absolute inset-x-0 top-0 h-[1100px]" />

      {/* ========== HEADER ========== */}
      <header className="sticky top-0 z-40 border-b-2 border-[var(--line)] bg-[var(--ink)]">
        <div className="flex items-center justify-between gap-4 px-10 py-3">
          <span data-live-href="/"><Logo maskId="tcp-logo-h" className="h-10 w-auto text-[var(--mint)]" /></span>
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-300">
            <span data-live-href="/" className="border-b-2 border-[var(--mint)] pb-0.5 text-white">Home</span>
            <span data-live-href="/discover" className="border-b-2 border-transparent pb-0.5">Discover</span>
            <span data-live-href="/shorts" className="border-b-2 border-transparent pb-0.5">Shorts</span>
            <span data-live-href="/originals" className="border-b-2 border-transparent pb-0.5">Originals</span>
            <span data-live-href="/genres" className="border-b-2 border-transparent pb-0.5">Genres</span>
            <span data-live-href="/subscription" className="flex items-center gap-1.5 border-b-2 border-transparent pb-0.5 text-[var(--sun)]">
              Subscribe <span className="tc-tag whitespace-nowrap bg-[var(--sun)]">From&nbsp;₦100</span>
            </span>
          </nav>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center border-2 border-[var(--line)] text-xl text-slate-200"><Search /></span>
            <span className="tc-btn tc-btn-ghost h-10"><Plus className="text-lg" /> Publish <Chevron className="text-sm" /></span>
            <span data-live-href="/auth" className="tc-btn tc-btn-ghost h-10">Sign in</span>
            <span data-live-href="/auth" className="tc-btn tc-btn-primary h-10">Join now</span>
          </div>
        </div>
      </header>

      <main className="relative px-10">
        {/* ========== HERO (PanelHero) ========== */}
        <div className="pt-3.5">
          <section className="relative flex min-h-[680px] flex-col overflow-hidden border-2 border-[var(--line)] bg-[var(--panel)]">
            <div className="absolute inset-0">
              <img src={img("afridivaz-bg")} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
              <div className="tc-halftone-overlay absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)] via-[var(--ink)]/75 to-[var(--ink)]/10" />
            </div>
            <div className="relative grid flex-1 grid-cols-[minmax(0,1fr)_auto] content-center items-center gap-x-12 gap-y-6 p-12 [grid-template-areas:'head_cover'_'body_cover']">
              <div className="max-w-2xl self-end [grid-area:head]">
                <span className="tc-tag -rotate-2 bg-[var(--sun)] text-sm">Toon Central Original</span>
                <h2 className="tc-display mt-4 line-clamp-2 text-7xl uppercase leading-[0.95] text-white">AFRI DIVAZ</h2>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {["Slice of Life", "Romance", "Teen"].map((g) => <Tag key={g} genre={g} />)}
                </div>
              </div>
              <div className="max-w-2xl self-start [grid-area:body]">
                <p className="line-clamp-3 max-w-xl text-base leading-7 text-slate-200">
                  Four teenage girls with big fashion dreams land the opportunity of a lifetime: a 7-day elite fashion showcase hosted by legendary mogul Tara Obeng. But behind the glamour, runway lights, and designer dreams lies fierce rivalry, sabotage, secrets, and the harsh truth about the fashion industry.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span data-live-href="/discover" className="tc-btn tc-btn-primary px-6 py-3 text-base">Read now</span>
                  <span className="tc-btn tc-btn-ghost px-5 py-3 text-base"><Plus className="text-lg" /> Library</span>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-300">
                  <span className="flex items-center gap-2">
                    <img loading="lazy" decoding="async" src={img("av-tc")} alt="" className="h-7 w-7 border-2 border-[var(--line)] object-cover" />
                    by <span className="font-semibold text-white">Tooncentralofficial</span>
                  </span>
                  <span className="flex items-center gap-1.5"><Eye /> 1.5K views</span>
                  <span className="flex items-center gap-1.5"><Heart /> 13</span>
                </div>
              </div>
              <span data-live-href="/discover" className="relative block w-[320px] -rotate-2 self-center border-[3px] border-black shadow-[8px_8px_0_var(--mint-deep)] [grid-area:cover]">
                <span className="relative block aspect-[3/4] overflow-hidden bg-[var(--ink)]">
                  <img src={img("afridivaz")} alt="" className="absolute inset-0 h-full w-full object-cover" />
                </span>
              </span>
            </div>
            <div className="relative flex items-center gap-6 border-t-2 border-[var(--line)] bg-[var(--ink)]/85 px-12 py-3">
              <div className="flex min-w-0 flex-1 items-center gap-1.5">
                {Array.from({ length: 10 }, (_, i) => (
                  <span key={i} className="flex h-8 min-w-0 max-w-16 flex-1 items-center">
                    <span className="relative block h-1 w-full overflow-hidden bg-white/20">
                      {i === 0 && <span className="tc-progress absolute inset-0 bg-[var(--mint)]" />}
                    </span>
                  </span>
                ))}
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center border-2 border-[var(--line)] bg-[var(--ink)] text-lg text-slate-200"><Chevron dir="left" /></span>
                <span className="tc-display min-w-[4.5rem] text-center text-lg leading-none text-slate-300">01 <span className="text-slate-500">/ 10</span></span>
                <span className="flex h-10 w-10 items-center justify-center border-2 border-[var(--line)] bg-[var(--ink)] text-lg text-slate-200"><Chevron dir="right" /></span>
              </div>
              <span className="flex h-10 w-10 items-center justify-center border-2 border-[var(--line)] bg-[var(--ink)] text-lg text-slate-200"><Pause /></span>
            </div>
          </section>
        </div>

        {/* ========== TRENDING ========== */}
        <Reveal className="mt-14">
          <SectionHeader title="Trending" action="Full chart" href="/new">
            <span className="pb-0.5 text-sm text-slate-400">Top 10 Mafiki · ranked by total reads</span>
          </SectionHeader>
          <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-6">
            <div data-live-href="/discover" className="relative flex h-full flex-row gap-6 overflow-hidden border-2 border-[var(--line)] bg-[var(--panel)] p-8">
              <div className="absolute inset-0">
                <img loading="lazy" decoding="async" src={img("hunter-bg")} alt="" className="h-full w-full object-cover opacity-30" />
                <div className="tc-halftone-overlay absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)]/40 via-[var(--ink)]/80 to-[var(--ink)]" />
              </div>
              <div className="relative w-[45%] shrink-0 self-center">
                <span className="tc-rank-solid tc-display pointer-events-none absolute -bottom-6 -left-3 z-10 text-[9rem] leading-none">1</span>
                <div className="aspect-[3/4] -rotate-1 overflow-hidden border-[3px] border-black shadow-[8px_8px_0_var(--sun)]">
                  <img loading="lazy" decoding="async" src={img(first.key)} alt="" className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="relative flex min-w-0 flex-col justify-center">
                <span className="tc-tag w-fit bg-[var(--sun)]">#1 most read</span>
                <h3 className="tc-display mt-3 text-5xl uppercase leading-[0.95] text-white">{first.title}</h3>
                <p className="mt-2 text-sm text-slate-300">by <span className="font-semibold text-white">{first.creator}</span></p>
                <div className="mt-3 flex flex-wrap gap-1.5"><Tag genre="Action" /></div>
                <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-300">
                  When the sun sets and all that is light and good fade into darkness, evil arises, the evil forest field with demons is before none other than the hunter, who fears nothing as he is equipped with the power of the gods themselves.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <Stats views={first.views} likes={first.likes} ch={first.ch} className="text-sm text-slate-300" />
                  <span className="text-xs font-semibold text-[var(--mint)]">Completed</span>
                </div>
                <span className="tc-btn tc-btn-primary mt-6 w-fit px-6 py-3 text-base">Read now</span>
              </div>
            </div>
            <ol className="divide-y-2 divide-[var(--line)] border-2 border-[var(--line)]">
              {rest.map((c, i) => (
                <li key={c.key} data-live-href="/discover" className="flex items-center gap-4 px-2 py-2.5">
                  <span className={`tc-rank-outline tc-display w-12 shrink-0 text-center text-5xl leading-none ${i + 2 <= 3 ? "tc-rank-top" : ""}`}>{i + 2}</span>
                  <img loading="lazy" decoding="async" src={img(c.key)} alt="" className="h-16 w-12 shrink-0 border-2 border-[var(--line)] object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-white">{c.title}</p>
                    <p className="mt-0.5 truncate text-xs text-slate-400">{c.creator} · {c.genres[0]}</p>
                  </div>
                  <Stats views={c.views} likes={c.likes} ch={c.ch} className="text-slate-300" />
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* ========== SHORTS (film strip) ========== */}
        <Reveal className="tc-film -mx-10 mt-16 px-10 py-16">
          <span className="tc-film-edge pointer-events-none absolute inset-x-0 top-[3px]">{FILM_PRINT}</span>
          <span className="tc-film-edge pointer-events-none absolute inset-x-0 bottom-[3px]">{FILM_PRINT}</span>
          <SectionHeader title="Shorts" action="Watch all" href="/shorts">
            <span className="pb-0.5 text-sm text-slate-400">Animated stories from African creators</span>
          </SectionHeader>
          <div className="flex gap-5 overflow-hidden pb-3 pt-1">
            {SHORTS.map((s) => (
              <article key={s.key} data-live-href="/shorts" className="w-60 shrink-0">
                <div className={`tc-sweep relative aspect-[4/5] overflow-hidden border-2 ${s.sponsored ? "border-dashed border-[var(--sun)]" : "border-[var(--line)]"}`}>
                  <img loading="lazy" decoding="async" src={img(s.key)} alt="" className="h-full w-full object-cover" />
                  {s.sponsored && <span className="tc-tag absolute left-2 top-2 bg-[var(--paper)]">Sponsored</span>}
                  <span className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center border-2 border-black bg-[var(--mint)] text-2xl text-[var(--ink)]"><Play /></span>
                </div>
                <div className="px-0.5 pt-3">
                  <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white">{s.title}</h3>
                  <p className="mt-0.5 truncate text-xs text-slate-400">{s.sponsored ? "Sponsored" : s.creator}</p>
                  {!s.sponsored && <div className="mt-2 flex flex-wrap gap-1">{s.genres.map((g) => <Tag key={g} genre={g} />)}</div>}
                  <div className="mt-2 flex gap-3 text-xs text-slate-300">
                    <span className="flex items-center gap-1"><Eye /> {s.views}</span>
                    <span className="flex items-center gap-1"><Heart /> {s.likes}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        {/* ========== ORIGINALS (paper band) ========== */}
        <Reveal className="tc-paper relative -mx-10 mt-16 px-10 py-12">
          <div className="tc-halftone-fade pointer-events-none absolute inset-x-0 top-0 h-64" />
          <div className="relative">
            <SectionHeader title="Toon Central Originals" action="Explore originals" href="/originals" paper>
              <span className="pb-0.5 text-sm text-[var(--ink)]/60">14 Mafiki made with African creators</span>
            </SectionHeader>
            <article className="mb-14 grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-center gap-12">
              <div data-live-href="/originals" className="relative block">
                <div className="aspect-[16/9] overflow-hidden border-[3px] border-[var(--ink)] bg-[var(--ink)] shadow-[8px_8px_0_var(--ink)]">
                  <img loading="lazy" decoding="async" src={img("senator-bg")} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="absolute -bottom-8 left-6 w-[26%] max-w-[170px] -rotate-3 border-[3px] border-[var(--ink)] bg-[var(--ink)] shadow-[6px_6px_0_var(--ink)]">
                  <img loading="lazy" decoding="async" src={img("senator")} alt="" className="aspect-[3/4] w-full object-cover" />
                </div>
              </div>
              <div>
                <span className="tc-tag -rotate-2 bg-[var(--sun)] text-sm">Spotlight</span>
                <h3 className="tc-display mt-3 text-6xl uppercase leading-[0.95] text-[var(--ink)]">SENATOR</h3>
                <p className="mt-2 text-sm text-[var(--ink)]/70">by <span className="font-semibold text-[var(--ink)]">Tooncentralofficial</span></p>
                <div className="mt-3 flex flex-wrap gap-1.5">{["Action", "Comedy", "Romance"].map((g) => <Tag key={g} genre={g} className="border border-[var(--ink)]" />)}</div>
                <p className="mt-4 line-clamp-4 text-[15px] leading-7 text-[var(--ink)]/80">
                  In an elite Nigerian school, Kosachi Dinta, a top secret agent known as “Senator,” loses his memories during a covert mission and becomes a weak, bullied student unaware of his true identity. Taken in by his manager Temi and befriended by Nemdi and her martial-artist friends, he slowly regains fragments of his deadly past while growing stronger.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--ink)]/70">
                  <span className="flex items-center gap-1.5"><Eye /> 889 reads</span>
                  <span className="flex items-center gap-1.5"><Heart /> 12</span>
                  <span className="font-semibold text-[var(--ink)]">Last episode 9 months ago</span>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <span className="tc-btn tc-btn-primary px-6 py-3 text-base">Read now</span>
                  <span className="flex h-11 w-11 items-center justify-center border-2 border-[var(--line)] bg-[var(--ink)]/85 text-lg text-white"><Bookmark /></span>
                </div>
              </div>
            </article>
            <div className="grid grid-cols-5 gap-x-5 gap-y-8 pt-1">
              {ORIGINALS.map((c) => <ComicCard key={c.key} c={c} paper />)}
            </div>
          </div>
        </Reveal>

        {/* ========== POPULAR BY INDIES ========== */}
        <Reveal className="mt-14">
          <SectionHeader title="Popular by Indies" action="Browse creators" href="/creators">
            <span className="pb-0.5 text-sm text-slate-400">6 independent creators</span>
          </SectionHeader>
          <div className="grid grid-cols-3 gap-5">
            {INDIES.map((shelf) => (
              <article key={shelf.name} data-live-href="/creators" className="flex h-full flex-col border-2 border-[var(--line)] bg-[var(--panel)] p-4">
                <div className="flex items-center gap-3">
                  {shelf.avatar ? (
                    <img loading="lazy" decoding="async" src={img(shelf.avatar)} alt="" className="h-12 w-12 shrink-0 border-2 border-black object-cover" />
                  ) : (
                    <span className={`tc-display flex h-12 w-12 shrink-0 items-center justify-center border-2 border-black text-lg text-[var(--ink)] ${TAG_BG[shelf.initialsTone ?? "sun"]}`}>{shelf.initials}</span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-bold text-white">{shelf.name}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{shelf.summary}</p>
                  </div>
                </div>
                {shelf.comics.length === 1 ? (
                  <div className="mt-4 flex gap-4">
                    <div className="w-24 shrink-0">
                      <div className="aspect-[3/4] overflow-hidden border-2 border-[var(--line)] bg-[var(--ink)]"><img loading="lazy" decoding="async" src={img(shelf.comics[0].key)} alt="" className="h-full w-full object-cover" /></div>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">{shelf.comics[0].title}</p>
                      <p className="text-[11px] text-slate-400">{shelf.comics[0].meta}</p>
                      <p className="mt-2 line-clamp-4 text-xs leading-5 text-slate-300">{shelf.blurb}</p>
                    </div>
                  </div>
                ) : (
                  <ul className="mt-4 grid grid-cols-4 gap-2.5">
                    {shelf.comics.map((c) => (
                      <li key={c.key} className="min-w-0">
                        <div className="aspect-[3/4] overflow-hidden border-2 border-[var(--line)] bg-[var(--ink)]"><img loading="lazy" decoding="async" src={img(c.key)} alt="" className="h-full w-full object-cover" /></div>
                        <p className="mt-1.5 truncate text-xs font-semibold text-white">{c.title}</p>
                        <p className="text-[11px] text-slate-400">{c.meta}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
            <div className="relative col-span-3 flex flex-row items-center justify-between gap-5 overflow-hidden border-2 border-dashed border-[var(--mint)] bg-[var(--ink)] p-6">
              <div className="tc-halftone-fade pointer-events-none absolute inset-0" />
              <div className="relative">
                <p className="tc-display text-4xl uppercase leading-none text-white">Yours could be here too</p>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">Publish your Mafiki or animated short on Toon Central and reach readers across Africa.</p>
              </div>
              <div className="relative flex flex-wrap gap-3">
                <span className="tc-btn tc-btn-primary px-5 py-3">Start publishing</span>
                <span data-live-href="/creator101" className="tc-btn tc-btn-ghost px-5 py-3">Creator101 guide</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ========== LATEST UPDATES ========== */}
        <Reveal className="mt-14">
          <SectionHeader title="Latest Updates" action="View all" href="/new/latest">
            <span className="pb-0.5 text-sm text-slate-400">New episodes and shorts, newest first</span>
          </SectionHeader>
          <ol>
            {LOG.map((group, i) => (
              <li key={group.month} className="grid grid-cols-[9rem_minmax(0,1fr)] gap-x-8">
                <div className="relative pb-8">
                  <div className="text-right">
                    <p className="tc-display text-4xl uppercase leading-none text-white">{group.month}</p>
                    <p className="tc-display mt-1 text-lg leading-none text-slate-500">{group.year}</p>
                  </div>
                  <span className="absolute -right-10 top-2 h-3.5 w-3.5 border-2 border-black bg-[var(--mint)]" />
                </div>
                <div className={`grid grid-cols-2 gap-1 border-l-2 pb-8 pl-6 ${i === LOG.length - 1 ? "border-transparent" : "border-[var(--line)]"}`}>
                  {group.rows.map((r) => (
                    <div key={r.key + r.day} data-live-href={r.short ? "/shorts" : "/discover"} className="flex w-full items-center gap-3 border-2 border-transparent p-2">
                      <div className="relative aspect-[3/4] w-14 shrink-0 overflow-hidden border-2 border-[var(--line)] bg-[var(--ink)]">
                        <img loading="lazy" decoding="async" src={img(r.key)} alt="" className="h-full w-full object-cover" />
                        {r.short && <span className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center border border-black bg-[var(--mint)] text-sm text-[var(--ink)]"><Play /></span>}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`tc-tag ${r.short ? "bg-[var(--mint)]" : "bg-[var(--sun)]"}`}>{r.short ? "Short" : "New episode"}</span>
                          <span className="text-xs font-semibold text-slate-400">{r.day} {r.month}</span>
                        </div>
                        <p className="mt-1.5 truncate font-semibold text-white">{r.title}</p>
                        <p className="truncate text-xs text-slate-400">{r.creator}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* ========== GENRES ========== */}
        <Reveal className="mt-14">
          <SectionHeader title="Browse by genre" action="All 33 genres" href="/genres" />
          <div className="grid grid-cols-4 gap-4">
            {FEATURED_GENRES.map((g) => (
              <div key={g.name} data-live-href="/genres" className="block border-2 border-[var(--line)] bg-[var(--panel)]" style={{ "--dot-color": TONE_COLOR[tone(g.name)] } as React.CSSProperties}>
                <div className="relative h-60 overflow-hidden border-b-2 border-[var(--line)] bg-[var(--ink)]">
                  <div className="tc-dot-field absolute inset-0 opacity-60" />
                  {g.covers.map((key, i) => (
                    <div
                      key={key}
                      className={`absolute top-8 w-[34%] min-w-[92px] border-2 border-black bg-[var(--ink)] shadow-[5px_5px_0_#000] ${
                        ["z-20 left-1/2 -translate-x-1/2", "z-10 left-[6%] -rotate-[10deg]", "z-10 right-[6%] rotate-[10deg]"][i]
                      }`}
                    >
                      <img loading="lazy" decoding="async" src={img(key)} alt="" className="aspect-[3/4] w-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="p-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="tc-display text-2xl uppercase leading-none text-white">{g.name}</p>
                    <p className="shrink-0 text-xs font-semibold text-slate-400">{g.count} Mafiki</p>
                  </div>
                  <p className="mt-2 truncate text-xs text-slate-400">{g.titles}<span className="text-slate-500"> +{g.more} more</span></p>
                </div>
              </div>
            ))}
          </div>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {GENRE_WALL.map(([name, count]) => (
              <li key={name}>
                <span
                  data-live-href="/genres"
                  className={`tc-display inline-flex items-center gap-2 whitespace-nowrap border-2 px-3 py-2 text-lg uppercase leading-none ${
                    count > 0 ? `border-black text-[var(--ink)] shadow-[3px_3px_0_#000] ${TAG_BG[tone(name)]}` : "border-[var(--line)] text-slate-300"
                  }`}
                >
                  {name}
                  {count > 0 && <span className="text-xs font-bold opacity-70" style={{ fontFamily: "'Archivo', sans-serif" }}>{count}</span>}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ========== SUBSCRIBE COUPON ========== */}
        <Reveal className="mb-12 mt-[4.5rem]">
          <div className="relative">
            <span className="absolute -top-3 left-6 z-10 flex items-center gap-1.5 bg-[var(--ink)] px-2 text-xs font-semibold uppercase tracking-wide text-slate-400"><Cut className="text-base" /> Cut here</span>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] border-2 border-dashed border-[var(--paper)]/50">
              <div className="p-8">
                <span className="tc-tag -rotate-2 bg-[var(--sun)] text-sm">Toon Central plans</span>
                <h2 className="tc-display mt-4 text-6xl uppercase leading-none text-white">Unlock the full library</h2>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                  {[{ I: LockOpen, l: "Every locked chapter" }, { I: Library, l: "Every Mafiki" }, { I: Ban, l: "Ad-free reading" }].map(({ I, l }) => (
                    <li key={l} className="flex items-center gap-2.5 font-semibold text-slate-200">
                      <span className="flex h-9 w-9 items-center justify-center border-2 border-black bg-[var(--mint)] text-lg text-[var(--ink)]"><I /></span>
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative flex w-72 flex-col items-center justify-center gap-1 border-l-2 border-dashed border-[var(--paper)]/50 bg-[var(--paper)] p-6 text-center text-[var(--ink)]">
                <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full border-2 border-dashed border-[var(--paper)]/50 bg-[var(--ink)]" />
                <span className="absolute -bottom-3 -left-3 h-6 w-6 rounded-full border-2 border-dashed border-[var(--paper)]/50 bg-[var(--ink)]" />
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--ink)]/60">From</p>
                <p className="tc-display text-7xl leading-none">₦100</p>
                <p className="tc-display text-xl uppercase leading-none">per day</p>
                <span data-live-href="/subscription" className="tc-btn tc-btn-primary mt-5 w-full px-6 py-3 text-base">Subscribe</span>
              </div>
            </div>
          </div>
        </Reveal>
      </main>

      {/* ========== FOOTER ========== */}
      <footer className="mt-10 border-t-2 border-[var(--line)] bg-[var(--panel)] px-10 py-10">
        <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)] gap-10">
          <div className="border-2 border-[var(--line)] bg-[var(--ink)] p-6">
            <Logo maskId="tcp-logo-f" className="h-14 w-auto text-[var(--mint)]" />
            <p className="tc-display mt-3 text-2xl uppercase leading-none text-white">Giving Africa a voice</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">Mafiki and animated shorts from African creators, from Toon Central originals to the indies.</p>
            <dl className="mt-6 grid grid-cols-4 gap-2 border-t-2 border-[var(--line)] pt-4">
              {[["14", "Originals"], ["6", "Indie creators"], ["9", "Shorts"], ["33", "Genres"]].map(([v, l]) => (
                <div key={l}>
                  <dd className="tc-display text-3xl leading-none text-[var(--mint)]">{v}</dd>
                  <dd className="mt-1 text-[11px] font-semibold uppercase leading-tight tracking-wide text-slate-400">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {[
              { t: "Read", l: ["All Mafiki", "Discover", "New & Popular", "Shorts", "Originals", "Genres", "Subscription"] },
              { t: "Create", l: ["Upload a Mafiki", "Upload a short", "Creator dashboard", "Creator 101"] },
              { t: "Toon Central", l: ["About us", "Feedback", "Contact", "Terms", "Privacy"] },
            ].map((col) => (
              <div key={col.t}>
                <p className="tc-display text-base uppercase tracking-wide text-white">{col.t}</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-300">{col.l.map((l) => <li key={l}>{l}</li>)}</ul>
              </div>
            ))}
            <div className="col-span-3 flex flex-wrap items-end justify-between gap-6 border-t-2 border-[var(--line)] pt-6">
              <div>
                <p className="tc-display text-base uppercase tracking-wide text-white">Follow</p>
                <div className="mt-3 flex gap-2">
                  {(["x", "ig", "fb", "in"] as const).map((s) => (
                    <span key={s} className="flex h-10 w-10 items-center justify-center border-2 border-[var(--line)] text-lg text-slate-200"><Social name={s} /></span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">In partnership with</span>
                {["itel", "mtn", "keble"].map((p) => <img loading="lazy" decoding="async" key={p} src={`/tc/${p}.png`} alt={p} className="h-10 w-auto" />)}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-between gap-3 border-t-2 border-[var(--line)] pt-5 text-sm text-slate-400">
          <p>© 2026 Toon Central. All rights reserved.</p>
          <span className="font-semibold text-slate-300">Back to top ↑</span>
        </div>
      </footer>
    </div>
  );
}
