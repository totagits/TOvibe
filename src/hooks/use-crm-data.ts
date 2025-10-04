import { create } from 'zustand';
import { api } from '@/lib/api-client';
import type { Contact, Pipeline, Stage, Deal } from '@shared/types';
interface CrmState {
  contacts: Contact[];
  pipelines: Pipeline[];
  stages: Stage[];
  deals: Deal[];
  isLoading: boolean;
  error: string | null;
  fetchCrmData: () => Promise<void>;
  moveDeal: (dealId: string, newStageId: string, newOrder: number) => void;
}
export const useCrmStore = create<CrmState>((set, get) => ({
  contacts: [],
  pipelines: [],
  stages: [],
  deals: [],
  isLoading: true,
  error: null,
  fetchCrmData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [contacts, pipelineData] = await Promise.all([
        api<Contact[]>('/api/crm/contacts'),
        api<{ pipelines: Pipeline[]; stages: Stage[]; deals: Deal[] }>('/api/crm/pipelines'),
      ]);
      set({
        contacts,
        pipelines: pipelineData.pipelines,
        stages: pipelineData.stages,
        deals: pipelineData.deals,
        isLoading: false,
      });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to fetch CRM data';
      set({ isLoading: false, error });
      console.error(error);
    }
  },
  moveDeal: (dealId, newStageId, newOrder) => {
    set((state) => {
      const deals = [...state.deals];
      const dealIndex = deals.findIndex((d) => d.id === dealId);
      if (dealIndex === -1) return state;
      const deal = { ...deals[dealIndex], stageId: newStageId };
      deals.splice(dealIndex, 1);
      deals.splice(newOrder, 0, deal);
      return { ...state, deals };
    });
  },
}));
// Initialize data on load
useCrmStore.getState().fetchCrmData();