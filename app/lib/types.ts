export type Project = {
  id: number;
  name: string;
  name_fa: string;
  description: string;
  description_fa: string;
  url: string;
  github_url: string;
  tags: string[];
  status: 'active' | 'in_progress' | 'archived';
  order: number;
};

export type SiteStatus = {
  is_available: boolean;
  status_text: string;
  status_text_fa: string;
  updated_at: string;
  restored_from_cache?: boolean;
};
