import { create } from 'zustand';
import { api } from '@/lib/api-client';
import type { Product, Order } from '@shared/types';
import { useAuthStore } from './use-auth';
interface EcommerceState {
  products: Product[];
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  fetchEcommerceData: () => Promise<void>;
}
export const useEcommerceStore = create<EcommerceState>((set) => ({
  products: [],
  orders: [],
  isLoading: true,
  error: null,
  fetchEcommerceData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [products, orders] = await Promise.all([
        api<Product[]>('/api/ecommerce/products'),
        api<Order[]>('/api/ecommerce/orders'),
      ]);
      set({ products, orders, isLoading: false });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to fetch e-commerce data';
      set({ isLoading: false, error });
      console.error(error);
    }
  },
}));
// Initialize data on load and re-fetch when account changes
useEcommerceStore.getState().fetchEcommerceData();
useAuthStore.subscribe(
  (state, prevState) => {
    if (state.currentAccountId && state.currentAccountId !== prevState.currentAccountId) {
      useEcommerceStore.getState().fetchEcommerceData();
    }
  }
);