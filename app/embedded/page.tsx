import type { Metadata } from 'next';
import SystemsNav from './components/SystemsNav';
import SystemsHero from './components/SystemsHero';
import SystemsCore from './components/SystemsCore';
import SystemsStack from './components/SystemsStack';
import SidebarNav from '../components/SidebarNav';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import type { SidebarSection } from '../components/SidebarNav';
import { getSiteStatus } from '../lib/server-api';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mhnikoobakht.ir';

export const metadata: Metadata = {
  title: 'Systems — Mohammad Hojjat Nikoobakht | محمدحجت نیکوبخت',
  description:
    'Full-stack systems engineering by Mohammad Hojjat Nikoobakht — Django · Next.js · Docker · TypeScript. ' +
    'مهندسی سیستم‌های دیجیتال توسط محمدحجت نیکوبخت.',

  alternates: {
    canonical: '/embedded',
    languages: {
      'en':        `${SITE_URL}/embedded`,
      'fa':        `${SITE_URL}/embedded`,
      'x-default': `${SITE_URL}/embedded`,
    },
  },

  openGraph: {
    type: 'profile',
    url: '/embedded',
    title: 'Systems — Mohammad Hojjat Nikoobakht | محمدحجت نیکوبخت',
    description:
      'Full-stack systems: Django backend, Next.js frontend, Docker deployment. ' +
      '— توسعه‌دهنده فول‌استک · سیستم‌های دیجیتال.',
    images: [
      {
        url: '/profile.png',
        width: 800,
        height: 800,
        alt: 'Mohammad Hojjat Nikoobakht — Systems Engineer',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Systems — Mohammad Hojjat Nikoobakht',
    description: 'Full-stack systems: Django · Next.js · Docker · TypeScript.',
    images: ['/profile.png'],
  },
};

const SYSTEMS_SECTIONS: SidebarSection[] = [
  { id: 'hero',        labelEn: 'Intro',       labelFa: 'معرفی'        },
  { id: 'iot',         labelEn: 'IoT',          labelFa: 'اینترنت اشیا' },
  { id: 'plc',         labelEn: 'PLC',          labelFa: 'PLC'          },
  { id: 'contact',     labelEn: 'Contact',      labelFa: 'تماس'        },
];

export default async function SystemsPage() {
  const siteStatus = await getSiteStatus();

  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <SystemsNav />
      <SidebarNav sections={SYSTEMS_SECTIONS} />
      <SystemsHero />
      <SystemsCore />
      <SystemsStack />
      <Contact siteStatus={siteStatus} />
      <Footer />
    </main>
  );
}
