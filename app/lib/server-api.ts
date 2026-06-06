import type { Project, SiteStatus } from './types';

const API_BASE = process.env.API_URL ?? 'http://localhost:8000';

export async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/projects/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getSiteStatus(): Promise<SiteStatus | null> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/status/`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
