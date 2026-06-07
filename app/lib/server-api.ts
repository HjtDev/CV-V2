import type { Project, SiteStatus } from './types';

const API_BASE = process.env.API_URL ?? 'http://localhost:8000';

// 5 s timeout — prevents a slow/unreachable backend from hanging SSR
const signal = () => AbortSignal.timeout(5000);

export async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/projects/`, {
      next: { revalidate: 60 },
      signal: signal(),
    });
    if (!res.ok) {
      console.error(`[server-api] getProjects: ${res.status} ${res.statusText}`);
      return [];
    }
    return res.json();
  } catch (err) {
    console.error('[server-api] getProjects failed:', err);
    return [];
  }
}

export async function getSiteStatus(): Promise<SiteStatus | null> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/status/`, {
      next: { revalidate: 30 },
      signal: signal(),
    });
    if (!res.ok) {
      console.error(`[server-api] getSiteStatus: ${res.status} ${res.statusText}`);
      return null;
    }
    return res.json();
  } catch (err) {
    console.error('[server-api] getSiteStatus failed:', err);
    return null;
  }
}
