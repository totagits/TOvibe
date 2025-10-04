import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task, User } from '@shared/types';
import { TaskCard } from './TaskCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';
interface TaskColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  users: User[];
}
export function TaskColumn({ id, title, tasks, users }: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: { type: 'Column', status: id },
  });
  const usersById = useMemo(() => new Map(users.map(u => [u.id, u])), [users]);
  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-col flex-shrink-0 w-72 bg-muted/50 rounded-lg h-[calc(100vh-20rem)]",
        isOver && "ring-2 ring-primary"
      )}
    >
      <div className="p-4 border-b">
        <h3 className="font-semibold">{title} <span className="text-sm text-muted-foreground">({tasks.length})</span></h3>
      </div>
      <ScrollArea className="flex-grow p-2">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => {
            const assignees = task.assigneeIds.map(id => usersById.get(id)).filter(Boolean) as User[];
            return <TaskCard key={task.id} task={task} assignees={assignees} />;
          })}
        </SortableContext>
      </ScrollArea>
    </div>
  );
}