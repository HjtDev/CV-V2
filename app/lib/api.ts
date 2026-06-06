'use client';

import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const instance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
});

// Cache GET responses for 5 minutes client-side
export const api = setupCache(instance, { ttl: 1000 * 60 * 5 });
