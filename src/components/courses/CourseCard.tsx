import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Course } from '@shared/types';
import { Link } from 'react-router-dom';
interface CourseCardProps {
  course: Course;
}
export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link to={`/courses/${course.id}`} className="block group">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-200 group-hover:shadow-xl group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="aspect-video overflow-hidden">
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
            {course.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {course.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="w-full">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{Math.round(course.progress)}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}