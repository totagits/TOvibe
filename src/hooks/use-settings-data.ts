import { create } from 'zustand';
import { api } from '@/lib/api-client';
import type { User, Subscription } from '@shared/types';
import { useAuthStore } from './use-auth';
interface SettingsState {
  users: User[];
  subscription: Subscription | null;
  isLoading: boolean;
  error: string | null;
  fetchSettingsData: () => Promise<void>;
}
export const useSettingsStore = create<SettingsState>((set) => ({
  users: [],
  subscription: null,
  isLoading: true,
  error: null,
  fetchSettingsData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [users, subscription] = await Promise.all([
        api<User[]>('/api/settings/users'),
        api<Subscription>('/api/settings/subscription'),
      ]);
      set({ users, subscription, isLoading: false });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to fetch settings data';
      set({ isLoading: false, error });
      console.error(error);
    }
  },
}));
// Initialize data on load and re-fetch when account changes
useSettingsStore.getState().fetchSettingsData();
useAuthStore.subscribe(
  (state, prevState) => {
    if (state.currentAccountId && state.currentAccountId !== prevState.currentAccountId) {
      useSettingsStore.getState().fetchSettingsData();
    }
  }
);