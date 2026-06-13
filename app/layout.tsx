import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { cookies, headers } from "next/headers";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
import type { Lang } from "./context/LanguageContext";
import { Preloader } from "./components/Preloader";

const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = localFont({
  src: [
    { path: "./fonts/space-mono-400-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/space-mono-700-latin.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-space-mono",
  display: "swap",
});

// Vazirmatn is a variable font — single file covers weights 400–800
const vazirmatn = localFont({
  src: "./fonts/vazirmatn-arabic.woff2",
  weight: "400 800",
  style: "normal",
  variable: "--font-vazirmatn",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // Bilingual title — both scripts appear in search results and browser tabs
  title: {
    default: "Mohammad Hojjat Nikoobakht | محمدحجت نیکوبخت — Full Stack Developer",
    template: "%s | Mohammad Hojjat Nikoobakht | محمدحجت نیکوبخت",
  },

  // English first (primary indexing language), Farsi block after the separator
  description:
    "Full-stack developer building secure, fast, and beautifully crafted web applications. " +
    "Specialising in Django, Next.js, and TypeScript. Available for remote work worldwide. " +
    "— " +
    "محمدحجت نیکوبخت — توسعه‌دهنده فول‌استک متخصص در ساخت اپلیکیشن‌های وب امن، سریع و زیبا. " +
    "متخصص در Django، Next.js و TypeScript. آماده همکاری از راه دور در سراسر جهان.",

  keywords: [
    // ── English ──────────────────────────────────────────────────────────────
    "full stack developer",
    "web developer",
    "Django developer",
    "Next.js developer",
    "TypeScript developer",
    "React developer",
    "Python developer",
    "backend developer",
    "frontend developer",
    "PostgreSQL",
    "Redis",
    "Docker",
    "REST API",
    "remote developer",
    "freelance developer",
    "Mohammad Hojjat Nikoobakht",
    // ── Farsi ────────────────────────────────────────────────────────────────
    "محمدحجت نیکوبخت",
    "محمد حجت نیکوبخت",
    "توسعه‌دهنده فول‌استک",
    "توسعه‌دهنده وب",
    "برنامه‌نویس پایتون",
    "برنامه‌نویس جنگو",
    "برنامه‌نویس ری‌اکت",
    "برنامه‌نویس تایپ‌اسکریپت",
    "برنامه‌نویس نکست جی‌اس",
    "طراح وب",
    "توسعه‌دهنده بک‌اند",
    "توسعه‌دهنده فرانت‌اند",
    "توسعه‌دهنده ریموت",
    "فریلنسر",
    "برنامه‌نویس فریلنسر",
    "ساخت اپلیکیشن وب",
  ],

  authors: [
    { name: "Mohammad Hojjat Nikoobakht", url: SITE_URL },
    { name: "محمدحجت نیکوبخت",            url: SITE_URL },
  ],
  creator: "Mohammad Hojjat Nikoobakht | محمدحجت نیکوبخت",
  publisher: "Mohammad Hojjat Nikoobakht | محمدحجت نیکوبخت",

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fa_IR"],
    url: "/",
    siteName: "Mohammad Hojjat Nikoobakht | محمدحجت نیکوبخت",
    title: "Mohammad Hojjat Nikoobakht | محمدحجت نیکوبخت — Full Stack Developer",
    description:
      "Full-stack developer building secure, fast, and beautifully crafted web applications. Django · Next.js · TypeScript. " +
      "— توسعه‌دهنده فول‌استک متخصص در Django، Next.js و TypeScript.",
    images: [
      {
        url: "/profile.png",
        width: 800,
        height: 800,
        alt: "Mohammad Hojjat Nikoobakht | محمدحجت نیکوبخت — Full Stack Developer",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────────────
  twitter: {
    card: "summary",
    title: "Mohammad Hojjat Nikoobakht | محمدحجت نیکوبخت — Full Stack Developer",
    description:
      "Full-stack developer · Django · Next.js · TypeScript — " +
      "توسعه‌دهنده فول‌استک · جنگو · نکست جی‌اس · تایپ‌اسکریپت",
    images: ["/profile.png"],
  },

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // ── Icons (Next.js merges these with app/icon.svg automatically) ──────────
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    shortcut: "/favicon.ico",
  },

  // ── Canonical + hreflang ─────────────────────────────────────────────────
  // Single URL serves both languages (client-side switch), so both locales
  // point to the same canonical. x-default signals the language-agnostic root.
  alternates: {
    canonical: "/",
    languages: {
      "en":        SITE_URL,
      "fa":        SITE_URL,
      "x-default": SITE_URL,
    },
  },

  category: "technology",
};

// ── Viewport (separate export required in Next.js 14+) ──────────────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0f0d",
};

// ── Language detection ───────────────────────────────────────────────────────

function detectLangFromAcceptHeader(acceptLanguage: string): Lang | null {
  const entries = acceptLanguage
    .split(",")
    .map((part) => {
      const [code, qPart] = part.trim().split(";q=");
      return { code: code.trim().toLowerCase(), q: qPart ? parseFloat(qPart) : 1.0 };
    })
    .sort((a, b) => b.q - a.q);

  const faRank = entries.findIndex((e) => e.code.startsWith("fa") || e.code === "ir");
  const enRank = entries.findIndex((e) => e.code.startsWith("en"));

  if (faRank !== -1 && (enRank === -1 || faRank < enRank)) return "fa";
  return null;
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [cookieStore, headersList] = await Promise.all([cookies(), headers()]);

  const saved    = cookieStore.get("lang")?.value as Lang | undefined;
  const acceptLang = headersList.get("accept-language") ?? "";
  const detected = !saved ? detectLangFromAcceptHeader(acceptLang) : null;

  const initialLang: Lang = saved ?? detected ?? "en";
  const dir = initialLang === "fa" ? "rtl" : "ltr";

  return (
    <html
      lang={initialLang}
      dir={dir}
      className={`${inter.variable} ${spaceMono.variable} ${vazirmatn.variable} antialiased`}
    >
      <body>
        <Preloader />
        <LanguageProvider initialLang={initialLang}>{children}</LanguageProvider>
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            async
            src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
