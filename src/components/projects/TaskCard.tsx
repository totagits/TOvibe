import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Task, User } from '@shared/types';
import { cn } from '@/lib/utils';
import { Calendar, GripVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { format } from 'date-fns';
interface TaskCardProps {
  task: Task;
  assignees: User[];
  isDragging?: boolean;
}
export function TaskCard({ task, assignees, isDragging }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging: isSortableDragging } = useSortable({
    id: task.id,
    data: { type: 'Task', task },
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const isActuallyDragging = isDragging || isSortableDragging;
  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        'mb-2 touch-none',
        isActuallyDragging && 'ring-2 ring-primary ring-offset-2 shadow-lg z-50'
      )}
    >
      <CardHeader className="p-3 flex flex-row items-start justify-between space-y-0">
        <CardTitle className="text-sm font-medium leading-snug">{task.title}</CardTitle>
        <div {...attributes} {...listeners} className="cursor-grab p-1 text-secondary-foreground/50 hover:text-secondary-foreground flex-shrink-0">
          <GripVertical className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="flex justify-between items-center">
          <div className="flex -space-x-2">
            {assignees.map(user => (
              <TooltipProvider key={user.id} delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar className="h-6 w-6 border-2 border-background">
                      <AvatarImage src={user.avatarUrl} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>{user.name}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
          {task.dueDate && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{format(new Date(task.dueDate), 'MMM d')}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}