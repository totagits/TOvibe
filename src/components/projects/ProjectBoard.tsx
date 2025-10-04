import { useMemo, useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useProjectsStore } from '@/hooks/use-projects-data';
import { useShallow } from 'zustand/react/shallow';
import { TaskColumn } from './TaskColumn';
import { TaskCard } from './TaskCard';
import { Task, TaskStatus, User } from '@shared/types';
import { createPortal } from 'react-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { MOCK_USERS } from '@shared/mock-data'; // Using mock users for assignee info
const columns: { id: TaskStatus; title: string }[] = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'todo', title: 'To Do' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];
export function ProjectBoard() {
  const { tasks, selectedProjectId, isLoading, moveTask } = useProjectsStore(
    useShallow((state) => ({
      tasks: state.tasks,
      selectedProjectId: state.selectedProjectId,
      isLoading: state.isLoading,
      moveTask: state.moveTask,
    }))
  );
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    })
  );
  const usersById = useMemo(() => new Map(MOCK_USERS.map(u => [u.id, u])), []);
  const projectTasks = useMemo(() => {
    return tasks.filter(t => t.projectId === selectedProjectId);
  }, [tasks, selectedProjectId]);
  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
    }
  };
  const onDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;
    const isActiveATask = active.data.current?.type === 'Task';
    const isOverAColumn = over.data.current?.type === 'Column';
    if (isActiveATask && isOverAColumn) {
      const activeTaskData = active.data.current?.task as Task;
      const newStatus = over.data.current?.status as TaskStatus;
      if (activeTaskData.status !== newStatus) {
        moveTask(activeTaskData.id, newStatus);
      }
    }
  };
  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto p-1">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col flex-shrink-0 w-72">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex-grow h-full overflow-x-auto">
      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="flex gap-4 items-start p-1">
          {columns.map((col) => (
            <TaskColumn
              key={col.id}
              id={col.id}
              title={col.title}
              tasks={projectTasks.filter((task) => task.status === col.id)}
              users={MOCK_USERS}
            />
          ))}
        </div>
        {createPortal(
          <DragOverlay>
            {activeTask && (
              <TaskCard
                task={activeTask}
                assignees={activeTask.assigneeIds.map(id => usersById.get(id)).filter(Boolean) as User[]}
                isDragging
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}