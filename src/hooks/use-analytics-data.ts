import { create } from 'zustand';
import { api } from '@/lib/api-client';
import type { AnalyticsDashboardData } from '@shared/types';
import { useAuthStore } from './use-auth';
interface AnalyticsState {
  dashboardData: AnalyticsDashboardData | null;
  isLoading: boolean;
  error: string | null;
  fetchDashboardData: () => Promise<void>;
}
export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  dashboardData: null,
  isLoading: true,
  error: null,
  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await api<AnalyticsDashboardData>('/api/analytics/dashboard');
      set({ dashboardData: data, isLoading: false });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to fetch analytics data';
      set({ isLoading: false, error });
      console.error(error);
    }
  },
}));
// Initialize data on load and re-fetch when account changes
useAnalyticsStore.getState().fetchDashboardData();
useAuthStore.subscribe(
  (state, prevState) => {
    if (state.currentAccountId && state.currentAccountId !== prevState.currentAccountId) {
      useAnalyticsStore.getState().fetchDashboardData();
    }
  }
);