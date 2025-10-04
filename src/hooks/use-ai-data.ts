import { create } from 'zustand';
import { api } from '@/lib/api-client';
import type { AIPredictedLeadScore } from '@shared/types';
interface AiState {
  generatedContent: string | null;
  isGenerating: boolean;
  leadScore: AIPredictedLeadScore | null;
  isPredicting: boolean;
  error: string | null;
  generateContent: (contentType: string, prompt: string) => Promise<void>;
  predictLeadScore: (contactId: string) => Promise<void>;
}
export const useAiStore = create<AiState>((set) => ({
  generatedContent: null,
  isGenerating: false,
  leadScore: null,
  isPredicting: false,
  error: null,
  generateContent: async (contentType, prompt) => {
    set({ isGenerating: true, error: null, generatedContent: null });
    try {
      // Simulate API delay
      await new Promise(res => setTimeout(res, 1000));
      const { content } = await api<{ content: string }>('/api/ai/generate-content', {
        method: 'POST',
        body: JSON.stringify({ contentType, prompt }),
      });
      set({ generatedContent: content, isGenerating: false });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to generate content';
      set({ isGenerating: false, error });
    }
  },
  predictLeadScore: async (contactId) => {
    set({ isPredicting: true, error: null, leadScore: null });
    try {
      // Simulate API delay
      await new Promise(res => setTimeout(res, 1500));
      const score = await api<AIPredictedLeadScore>('/api/ai/predict/lead-score', {
        method: 'POST',
        body: JSON.stringify({ contactId }),
      });
      set({ leadScore: score, isPredicting: false });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to predict score';
      set({ isPredicting: false, error });
    }
  },
}));