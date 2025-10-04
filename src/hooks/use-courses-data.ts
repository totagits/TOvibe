import { create } from 'zustand';
import { api } from '@/lib/api-client';
import type { Course, Lesson } from '@shared/types';
import { useAuthStore } from './use-auth';
interface CoursesState {
  courses: Course[];
  currentCourse: Course | null;
  lessons: Lesson[];
  isLoading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
  fetchCourseDetails: (courseId: string) => Promise<void>;
}
export const useCoursesStore = create<CoursesState>((set) => ({
  courses: [],
  currentCourse: null,
  lessons: [],
  isLoading: true,
  error: null,
  fetchCourses: async () => {
    set({ isLoading: true, error: null });
    try {
      const courses = await api<Course[]>('/api/courses');
      set({ courses, isLoading: false });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to fetch courses';
      set({ isLoading: false, error });
      console.error(error);
    }
  },
  fetchCourseDetails: async (courseId: string) => {
    set({ isLoading: true, error: null, currentCourse: null, lessons: [] });
    try {
      const { course, lessons } = await api<{ course: Course; lessons: Lesson[] }>(`/api/courses/${courseId}`);
      set({ currentCourse: course, lessons, isLoading: false });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to fetch course details';
      set({ isLoading: false, error });
      console.error(error);
    }
  },
}));
// Initialize data on load and re-fetch when account changes
useCoursesStore.getState().fetchCourses();
useAuthStore.subscribe(
  (state, prevState) => {
    if (state.currentAccountId && state.currentAccountId !== prevState.currentAccountId) {
      useCoursesStore.getState().fetchCourses();
    }
  }
);