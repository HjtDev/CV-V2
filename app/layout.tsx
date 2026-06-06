import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Mohammad Hojjat Nikoobakht — Full Stack Developer",
  description:
    "Full-stack developer building secure, performant, and beautifully crafted digital products. Available for remote work worldwide.",
};

function detectLangFromAcceptHeader(acceptLanguage: string): Lang | null {
  // Parse "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7" into sorted entries
  const entries = acceptLanguage
    .split(",")
    .map((part) => {
      const [code, qPart] = part.trim().split(";q=");
      return { code: code.trim().toLowerCase(), q: qPart ? parseFloat(qPart) : 1.0 };
    })
    .sort((a, b) => b.q - a.q);

  // If the highest-priority language is Farsi, or Farsi ranks above English, use FA
  const faRank = entries.findIndex((e) => e.code.startsWith("fa") || e.code === "ir");
  const enRank = entries.findIndex((e) => e.code.startsWith("en"));

  if (faRank !== -1 && (enRank === -1 || faRank < enRank)) return "fa";
  return null;
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [cookieStore, headersList] = await Promise.all([cookies(), headers()]);

  // Priority 1: explicit cookie from previous visit
  const saved = cookieStore.get("lang")?.value as Lang | undefined;

  // Priority 2: browser Accept-Language header (no cookie yet)
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
