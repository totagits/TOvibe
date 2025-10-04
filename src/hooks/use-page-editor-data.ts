import { create } from 'zustand';
import { api } from '@/lib/api-client';
import type { Page, PageBlock } from '@shared/types';
import { arrayMove } from '@dnd-kit/sortable';
interface PageEditorState {
  page: Page | null;
  blocks: PageBlock[];
  isLoading: boolean;
  error: string | null;
  fetchPage: (pageId: string) => Promise<void>;
  addBlock: (block: PageBlock) => void;
  moveBlock: (oldIndex: number, newIndex: number) => void;
  updateBlock: (blockId: string, content: Record<string, any>) => void;
  deleteBlock: (blockId: string) => void;
}
export const usePageEditorStore = create<PageEditorState>((set, get) => ({
  page: null,
  blocks: [],
  isLoading: true,
  error: null,
  fetchPage: async (pageId: string) => {
    set({ isLoading: true, error: null });
    try {
      const page = await api<Page>(`/api/pages/${pageId}`);
      set({ page, blocks: page.blocks || [], isLoading: false });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to fetch page data';
      set({ isLoading: false, error });
      console.error(error);
    }
  },
  addBlock: (block) => {
    set((state) => ({ blocks: [...state.blocks, block] }));
  },
  moveBlock: (oldIndex, newIndex) => {
    set((state) => ({
      blocks: arrayMove(state.blocks, oldIndex, newIndex),
    }));
  },
  updateBlock: (blockId, content) => {
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === blockId ? { ...block, content: { ...block.content, ...content } } : block
      ),
    }));
  },
  deleteBlock: (blockId) => {
    set((state) => ({
      blocks: state.blocks.filter((block) => block.id !== blockId),
    }));
  },
}));