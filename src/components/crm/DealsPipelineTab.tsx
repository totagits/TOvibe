import { useMemo, useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useCrmStore } from '@/hooks/use-crm-data';
import { useShallow } from 'zustand/react/shallow';
import { PipelineColumn } from './PipelineColumn';
import { DealCard } from './DealCard';
import { Deal } from '@shared/types';
import { createPortal } from 'react-dom';
import { Skeleton } from '@/components/ui/skeleton';
export function DealsPipelineTab() {
  const { pipelines, stages, deals, isLoading, moveDeal } = useCrmStore(
    useShallow((state) => ({
      pipelines: state.pipelines,
      stages: state.stages,
      deals: state.deals,
      isLoading: state.isLoading,
      moveDeal: state.moveDeal,
    }))
  );
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  const currentPipeline = pipelines[0]; // Assuming one pipeline for now
  const pipelineStages = useMemo(() => {
    if (!currentPipeline) return [];
    return stages
      .filter((s) => s.pipelineId === currentPipeline.id)
      .sort((a, b) => a.order - b.order);
  }, [stages, currentPipeline]);
  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Deal') {
      setActiveDeal(event.active.data.current.deal);
    }
  };
  const onDragEnd = (event: DragEndEvent) => {
    setActiveDeal(null);
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;
    const isActiveADeal = active.data.current?.type === 'Deal';
    const isOverAStage = over.data.current?.type === 'Stage';
    if (isActiveADeal && isOverAStage) {
      const activeDealData = active.data.current?.deal as Deal;
      const overStageId = over.id as string;
      // Correctly calculate the new order based on the state *before* the move.
      // The new item will be placed at the end of the list in the target column.
      const dealsInNewStage = deals.filter(d => d.stageId === overStageId && d.id !== activeDealData.id);
      const newOrder = dealsInNewStage.length;
      if (activeDealData.stageId !== overStageId) {
        moveDeal(activeDealData.id, overStageId, newOrder);
      }
    }
  };
  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto p-1">
        {[...Array(5)].map((_, i) => (
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
          <SortableContext items={pipelineStages.map(s => s.id)} strategy={horizontalListSortingStrategy}>
            {pipelineStages.map((stage) => (
              <PipelineColumn
                key={stage.id}
                stage={stage}
                deals={deals.filter((deal) => deal.stageId === stage.id)}
              />
            ))}
          </SortableContext>
        </div>
        {createPortal(
          <DragOverlay>
            {activeDeal && <DealCard deal={activeDeal} isDragging />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}