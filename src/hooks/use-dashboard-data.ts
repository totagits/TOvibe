import { create } from 'zustand';
import { api } from '@/lib/api-client';
import type { Activity } from '@shared/types';
import { useAuthStore } from './use-auth';
interface DashboardState {
  activities: Activity[];
  isLoading: boolean;
  error: string | null;
  fetchActivities: () => Promise<void>;
}
export const useDashboardStore = create<DashboardState>((set) => ({
  activities: [],
  isLoading: true,
  error: null,
  fetchActivities: async () => {
    set({ isLoading: true, error: null });
    try {
      const activities = await api<Activity[]>('/api/activities');
      set({ activities, isLoading: false });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to fetch activities';
      set({ isLoading: false, error });
      console.error(error);
    }
  }
}));

useDashboardStore.getState().fetchActivities();
useAuthStore.subscribe(
  (state, prevState) => {
    if (state.currentAccountId && state.currentAccountId !== prevState.currentAccountId) {
      useDashboardStore.getState().fetchActivities();
    }
  }
);