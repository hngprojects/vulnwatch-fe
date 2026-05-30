import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSafeReturnUrl(url: string | null, fallback = "/dashboard"): string {
  if (!url) return fallback;
  // Reject absolute URLs or protocol-relative URLs
  if (url.startsWith('//') || url.includes('://')) return fallback;
  // Accept relative paths starting with a single slash
  if (url.startsWith('/')) return url;
  return fallback;
}
