import { useCoursesStore } from '@/hooks/use-courses-data';
import { useShallow } from 'zustand/react/shallow';
import { Skeleton } from '@/components/ui/skeleton';
import { CourseCard } from '@/components/courses/CourseCard';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
export function CoursesPage() {
  const { courses, isLoading } = useCoursesStore(
    useShallow((state) => ({
      courses: state.courses,
      isLoading: state.isLoading,
    }))
  );
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">Expand your knowledge and skills.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Course
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading
          ? [...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          : courses.map((course) => <CourseCard key={course.id} course={course} />)}
      </div>
    </div>
  );
}