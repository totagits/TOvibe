import { create } from 'zustand';
import { api } from '@/lib/api-client';
import type { Page } from '@shared/types';
interface PagesState {
  pages: Page[];
  isLoading: boolean;
  error: string | null;
  fetchPages: () => Promise<void>;
}
export const usePagesStore = create<PagesState>((set) => ({
  pages: [],
  isLoading: true,
  error: null,
  fetchPages: async () => {
    set({ isLoading: true, error: null });
    try {
      const pages = await api<Page[]>('/api/pages');
      set({ pages, isLoading: false });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to fetch pages data';
      set({ isLoading: false, error });
      console.error(error);
    }
  },
}));
// Initialize data on load
usePagesStore.getState().fetchPages();