import { create } from 'zustand';
import { api } from '@/lib/api-client';
import type { Project, Task, TaskStatus } from '@shared/types';
import { useAuthStore } from './use-auth';
interface ProjectsState {
  projects: Project[];
  tasks: Task[];
  selectedProjectId: string | null;
  isLoading: boolean;
  error: string | null;
  fetchProjectsData: () => Promise<void>;
  setSelectedProjectId: (projectId: string) => void;
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
}
export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: [],
  tasks: [],
  selectedProjectId: null,
  isLoading: true,
  error: null,
  fetchProjectsData: async () => {
    set({ isLoading: true, error: null });
    try {
      const { projects, tasks } = await api<{ projects: Project[]; tasks: Task[] }>('/api/projects');
      set({
        projects,
        tasks,
        isLoading: false,
        selectedProjectId: get().selectedProjectId ?? projects[0]?.id ?? null,
      });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to fetch projects data';
      set({ isLoading: false, error });
      console.error(error);
    }
  },
  setSelectedProjectId: (projectId: string) => {
    set({ selectedProjectId: projectId });
  },
  moveTask: (taskId, newStatus) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ),
    }));
  },
}));
// Initialize data on load and re-fetch when account changes
useProjectsStore.getState().fetchProjectsData();
useAuthStore.subscribe(
  (state, prevState) => {
    if (state.currentAccountId && state.currentAccountId !== prevState.currentAccountId) {
      useProjectsStore.getState().fetchProjectsData();
    }
  }
);