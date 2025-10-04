import { create } from 'zustand';
import { api } from '@/lib/api-client';
import type { AffiliateProgram, AffiliatePartner } from '@shared/types';
import { useAuthStore } from './use-auth';
interface AffiliatesState {
  programs: AffiliateProgram[];
  partners: AffiliatePartner[];
  isLoading: boolean;
  error: string | null;
  fetchAffiliatesData: () => Promise<void>;
}
export const useAffiliatesStore = create<AffiliatesState>((set) => ({
  programs: [],
  partners: [],
  isLoading: true,
  error: null,
  fetchAffiliatesData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [programs, partners] = await Promise.all([
        api<AffiliateProgram[]>('/api/affiliates/programs'),
        api<AffiliatePartner[]>('/api/affiliates/partners'),
      ]);
      set({ programs, partners, isLoading: false });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to fetch affiliates data';
      set({ isLoading: false, error });
      console.error(error);
    }
  },
}));
// Initialize data on load and re-fetch when account changes
useAffiliatesStore.getState().fetchAffiliatesData();
useAuthStore.subscribe(
  (state, prevState) => {
    if (state.currentAccountId && state.currentAccountId !== prevState.currentAccountId) {
      useAffiliatesStore.getState().fetchAffiliatesData();
    }
  }
);