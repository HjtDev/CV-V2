import type { Metadata, Viewport } from "next";
import { Inter, Space_Mono, Vazirmatn } from "next/font/google";
import { cookies, headers } from "next/headers";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
import type { Lang } from "./context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Mohammad Hojjat Nikoobakht — Full Stack Developer",
    template: "%s | Mohammad Hojjat Nikoobakht",
  },

  description:
    "Full-stack developer building secure, fast, and beautifully crafted web applications. " +
    "Specialising in Django, Next.js, and TypeScript. Available for remote work worldwide. " +
    "محمد حجت نیکوبخت — توسعه‌دهنده فول‌استک",

  keywords: [
    "full stack developer",
    "web developer",
    "Django developer",
    "Next.js developer",
    "TypeScript",
    "React",
    "Python",
    "PostgreSQL",
    "Redis",
    "Docker",
    "remote developer",
    "freelance developer",
    "Mohammad Hojjat Nikoobakht",
    "محمد حجت نیکوبخت",
    "توسعه‌دهنده فول‌استک",
    "طراح وب",
  ],

  authors: [
    {
      name: "Mohammad Hojjat Nikoobakht",
      url: "https://mhnikoobakht.ir",
    },
  ],
  creator: "Mohammad Hojjat Nikoobakht",
  publisher: "Mohammad Hojjat Nikoobakht",

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fa_IR"],
    url: "/",
    siteName: "Mohammad Hojjat Nikoobakht",
    title: "Mohammad Hojjat Nikoobakht — Full Stack Developer",
    description:
      "Full-stack developer building secure, fast, and beautifully crafted web applications. Django · Next.js · TypeScript.",
    images: [
      {
        url: "/profile.png",
        width: 800,
        height: 800,
        alt: "Mohammad Hojjat Nikoobakht — Full Stack Developer",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────────────
  twitter: {
    card: "summary",
    title: "Mohammad Hojjat Nikoobakht — Full Stack Developer",
    description:
      "Full-stack developer building secure, fast, and beautifully crafted web applications.",
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

  // ── Canonical ─────────────────────────────────────────────────────────────
  alternates: {
    canonical: "/",
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
        <LanguageProvider initialLang={initialLang}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
