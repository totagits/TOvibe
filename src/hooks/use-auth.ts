import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, Organization, Account } from '@shared/types';
import { api } from '@/lib/api-client';
interface AuthState {
  user: User | null;
  organization: Organization | null;
  accounts: Account[];
  currentAccountId: string | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  fetchContext: () => Promise<void>;
  setCurrentAccountId: (accountId: string) => void;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      organization: null,
      accounts: [],
      currentAccountId: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,
      login: async (email, password) => {
        const { token } = await api<{ token: string }>('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });
        set({ token, isAuthenticated: true });
        await get().fetchContext();
      },
      logout: () => {
        set({
          user: null,
          organization: null,
          accounts: [],
          currentAccountId: null,
          token: null,
          isAuthenticated: false,
        });
      },
      fetchContext: async () => {
        const token = get().token;
        if (!token) {
          set({ isLoading: false });
          return;
        }
        try {
          const [user, orgData] = await Promise.all([
            api<User>('/api/auth/me'),
            api<{ organization: Organization; accounts: Account[] }>('/api/organization'),
          ]);
          set({
            user,
            organization: orgData.organization,
            accounts: orgData.accounts,
            currentAccountId: user.accountId || orgData.accounts[0]?.id || null,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Failed to fetch user context', error);
          get().logout();
          set({ isLoading: false });
        }
      },
      setCurrentAccountId: (accountId: string) => {
        set({ currentAccountId: accountId });
      },
    }),
    {
      name: 'totag-nexus-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token }),
    }
  )
);
// Initialize auth state on app load
useAuthStore.getState().fetchContext();