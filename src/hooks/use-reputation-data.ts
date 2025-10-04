import { create } from 'zustand';
import { api } from '@/lib/api-client';
import type { Review } from '@shared/types';
import { useAuthStore } from './use-auth';
interface ReputationStats {
  totalReviews: number;
  averageRating: number;
  pending: number;
}
interface ReputationState {
  reviews: Review[];
  stats: ReputationStats;
  isLoading: boolean;
  error: string | null;
  fetchReviews: () => Promise<void>;
}
const calculateStats = (reviews: Review[]): ReputationStats => {
  if (reviews.length === 0) {
    return { totalReviews: 0, averageRating: 0, pending: 0 };
  }
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;
  const pending = reviews.filter(r => r.status === 'pending').length;
  return {
    totalReviews: reviews.length,
    averageRating,
    pending,
  };
};
export const useReputationStore = create<ReputationState>((set) => ({
  reviews: [],
  stats: { totalReviews: 0, averageRating: 0, pending: 0 },
  isLoading: true,
  error: null,
  fetchReviews: async () => {
    set({ isLoading: true, error: null });
    try {
      const reviews = await api<Review[]>('/api/reputation/reviews');
      const stats = calculateStats(reviews);
      set({ reviews, stats, isLoading: false });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to fetch reviews';
      set({ isLoading: false, error });
      console.error(error);
    }
  },
}));
// Initialize data on load and re-fetch when account changes
useReputationStore.getState().fetchReviews();
useAuthStore.subscribe(
  (state, prevState) => {
    if (state.currentAccountId && state.currentAccountId !== prevState.currentAccountId) {
      useReputationStore.getState().fetchReviews();
    }
  }
);