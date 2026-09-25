import type { GreenApiConfig } from "../types/green-api";

const STORAGE_KEY = "green-api-config";

export const greenApiStorage = {
  get(): GreenApiConfig | null {
    const value = localStorage.getItem(STORAGE_KEY);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value) as GreenApiConfig;
    } catch {
      localStorage.removeItem(STORAGE_KEY);

      return null;
    }
  },

  set(config: GreenApiConfig): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  },

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  },
};