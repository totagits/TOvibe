import { create } from 'zustand';
import { api } from '@/lib/api-client';
import type { ConversationThread, Message, Contact } from '@shared/types';
import { useAuthStore } from './use-auth';
export type ThreadWithContact = ConversationThread & { contact?: Contact };
interface InboxState {
  threads: ThreadWithContact[];
  messages: Record<string, Message[]>;
  selectedThreadId: string | null;
  isLoadingThreads: boolean;
  isLoadingMessages: boolean;
  error: string | null;
  fetchThreads: () => Promise<void>;
  selectThread: (threadId: string | null) => void;
  sendMessage: (content: string) => Promise<void>;
}
export const useInboxStore = create<InboxState>((set, get) => ({
  threads: [],
  messages: {},
  selectedThreadId: null,
  isLoadingThreads: true,
  isLoadingMessages: false,
  error: null,
  fetchThreads: async () => {
    set({ isLoadingThreads: true, error: null });
    try {
      const threads = await api<ThreadWithContact[]>('/api/inbox/threads');
      set({ threads, isLoadingThreads: false });
      // Select the first thread by default
      if (threads.length > 0 && !get().selectedThreadId) {
        get().selectThread(threads[0].id);
      }
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to fetch threads';
      set({ isLoadingThreads: false, error });
    }
  },
  selectThread: async (threadId) => {
    if (!threadId || get().selectedThreadId === threadId) {
      if (!threadId) set({ selectedThreadId: null });
      return;
    }
    set({ selectedThreadId: threadId, isLoadingMessages: true });
    // Mark thread as read locally
    set(state => ({
      threads: state.threads.map(t => t.id === threadId ? { ...t, isRead: true } : t)
    }));
    // Fetch messages if not already cached
    if (!get().messages[threadId]) {
      try {
        const messages = await api<Message[]>(`/api/inbox/threads/${threadId}/messages`);
        set(state => ({
          messages: { ...state.messages, [threadId]: messages },
          isLoadingMessages: false,
        }));
      } catch (err) {
        const error = err instanceof Error ? err.message : 'Failed to fetch messages';
        set({ isLoadingMessages: false, error });
      }
    } else {
      set({ isLoadingMessages: false });
    }
  },
  sendMessage: async (content) => {
    const { selectedThreadId } = get();
    const user = useAuthStore.getState().user;
    if (!selectedThreadId || !content.trim() || !user) return;
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      threadId: selectedThreadId,
      authorId: user.id,
      authorType: 'user',
      channel: 'email', // Defaulting for mock
      content: content.trim(),
      createdAt: new Date().toISOString(),
      direction: 'outbound',
    };
    set(state => ({
      messages: {
        ...state.messages,
        [selectedThreadId]: [...(state.messages[selectedThreadId] || []), newMessage],
      },
      threads: state.threads.map(t =>
        t.id === selectedThreadId
          ? { ...t, lastMessageSnippet: content.trim(), lastMessageAt: newMessage.createdAt }
          : t
      ),
    }));
  },
}));
// Initialize data on load
useInboxStore.getState().fetchThreads();