import { create } from 'zustand';
import { api } from '@/lib/api-client';
import type { Booking } from '@shared/types';
interface SchedulerState {
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
  selectedDate: Date;
  fetchBookings: () => Promise<void>;
  setSelectedDate: (date: Date) => void;
}
export const useSchedulerStore = create<SchedulerState>((set) => ({
  bookings: [],
  isLoading: true,
  error: null,
  selectedDate: new Date(),
  fetchBookings: async () => {
    set({ isLoading: true, error: null });
    try {
      const bookings = await api<Booking[]>('/api/scheduler/bookings');
      set({ bookings, isLoading: false });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to fetch bookings data';
      set({ isLoading: false, error });
      console.error(error);
    }
  },
  setSelectedDate: (date: Date) => {
    set({ selectedDate: date });
  },
}));
// Initialize data on load
useSchedulerStore.getState().fetchBookings();