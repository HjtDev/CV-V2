import type { Metadata } from 'next';
import CVNav from './components/CVNav';
import CVHero from './components/CVHero';
import CVEducation from './components/CVEducation';
import CVExperience from './components/CVExperience';
import CVSkills from './components/CVSkills';
import CVContact from './components/CVContact';
import SidebarNav from '../components/SidebarNav';
import Footer from '../components/Footer';
import type { SidebarSection } from '../components/SidebarNav';
import { getSiteStatus } from '../lib/server-api';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mhnikoobakht.ir';

export const metadata: Metadata = {
  title: 'CV — Mohammad Hojjat Nikoobakht | محمدحجت نیکوبخت',
  description:
    'Curriculum Vitae of Mohammad Hojjat Nikoobakht — 5 years of freelance full-stack development. Django · Next.js · TypeScript · AI Integration. ' +
    'رزومه محمدحجت نیکوبخت — توسعه‌دهنده فول‌استک فریلنسر.',

  alternates: {
    canonical: '/cv',
    // Single URL serves both languages (client-side switch), same pattern as root
    languages: {
      'en':        `${SITE_URL}/cv`,
      'fa':        `${SITE_URL}/cv`,
      'x-default': `${SITE_URL}/cv`,
    },
  },

  openGraph: {
    type: 'profile',
    url: '/cv',
    title: 'CV — Mohammad Hojjat Nikoobakht | محمدحجت نیکوبخت',
    description:
      '5 years of freelance full-stack development. Django · Next.js · TypeScript · AI Integration. ' +
      '— توسعه‌دهنده فول‌استک فریلنسر · ۵ سال تجربه.',
    images: [
      {
        url: '/profile.png',
        width: 800,
        height: 800,
        alt: 'Mohammad Hojjat Nikoobakht — Full Stack Developer CV',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'CV — Mohammad Hojjat Nikoobakht | محمدحجت نیکوبخت',
    description:
      '5 years of freelance full-stack development. Django · Next.js · TypeScript.',
    images: ['/profile.png'],
  },
};

const CV_SECTIONS: SidebarSection[] = [
  { id: 'hero',       labelEn: 'Intro',       labelFa: 'معرفی' },
  { id: 'education',  labelEn: 'Education',   labelFa: 'تحصیل' },
  { id: 'experience', labelEn: 'Experience',  labelFa: 'تجربه' },
  { id: 'skills',     labelEn: 'Skills',      labelFa: 'مهارت‌ها' },
  { id: 'contact',    labelEn: 'Contact',     labelFa: 'تماس' },
];

export default async function CVPage() {
  const siteStatus = await getSiteStatus();

  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <CVNav />
      <SidebarNav sections={CV_SECTIONS} />
      <CVHero siteStatus={siteStatus} />
      <CVEducation />
      <CVExperience />
      <CVSkills />
      <CVContact />
      <Footer />
    </main>
  );
}
