import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCoursesStore } from '@/hooks/use-courses-data';
import { useShallow } from 'zustand/react/shallow';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, PlayCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
export function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { currentCourse, lessons, isLoading, fetchCourseDetails } = useCoursesStore(
    useShallow((state) => ({
      currentCourse: state.currentCourse,
      lessons: state.lessons,
      isLoading: state.isLoading,
      fetchCourseDetails: state.fetchCourseDetails,
    }))
  );
  useEffect(() => {
    if (courseId) {
      fetchCourseDetails(courseId);
    }
  }, [courseId, fetchCourseDetails]);
  if (isLoading || !currentCourse) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
            <div className="space-y-2 pt-4">
              {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }
  const completedLessons = lessons.filter(l => l.isCompleted).length;
  const totalLessons = lessons.length;
  const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  return (
    <div className="space-y-6 animate-fade-in">
      <Button asChild variant="outline" size="sm">
        <Link to="/courses">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Link>
      </Button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold tracking-tight">{currentCourse.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{currentCourse.description}</p>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {lessons.map((lesson, index) => (
                  <AccordionItem value={`item-${index}`} key={lesson.id}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-3">
                        {lesson.isCompleted ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <PlayCircle className="h-5 w-5 text-muted-foreground" />
                        )}
                        <span>{index + 1}. {lesson.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{lesson.content}</p>
                      <p className="text-sm font-medium mt-2">Duration: {lesson.duration} minutes</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>
                {completedLessons} of {totalLessons} lessons completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="w-full" />
              <Button className="w-full mt-4">
                {progress > 0 ? 'Continue Learning' : 'Start Course'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}