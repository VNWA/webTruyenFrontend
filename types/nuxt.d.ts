// types/nuxt.d.ts
import { NuxtApp } from '@nuxt/types';

declare module '@nuxt/types' {
  interface NuxtApp {
    $apiFetch: <T = any>(url: string, options?: RequestInit) => Promise<T>;
  }
}
