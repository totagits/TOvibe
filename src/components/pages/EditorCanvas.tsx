import { DndContext, DragEndEvent, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { usePageEditorStore } from '@/hooks/use-page-editor-data';
import { useShallow } from 'zustand/react/shallow';
import { BlockRenderer } from './BlockRenderer';
import { Skeleton } from '@/components/ui/skeleton';
import { PageBlock } from '@shared/types';
import { useState } from 'react';
import { createPortal } from 'react-dom';
export function EditorCanvas() {
  const { blocks, isLoading, moveBlock } = usePageEditorStore(
    useShallow((state) => ({
      blocks: state.blocks,
      isLoading: state.isLoading,
      moveBlock: state.moveBlock,
    }))
  );
  const [activeBlock, setActiveBlock] = useState<PageBlock | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    })
  );
  const handleDragStart = (event: any) => {
    if (event.active.data.current?.type === 'Block') {
      setActiveBlock(event.active.data.current.block);
    }
  };
  const handleDragEnd = (event: DragEndEvent) => {
    setActiveBlock(null);
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      moveBlock(oldIndex, newIndex);
    }
  };
  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }
  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="bg-white dark:bg-gray-800 h-full overflow-y-auto">
        <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
          {blocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </SortableContext>
      </div>
      {createPortal(
        <DragOverlay>
          {activeBlock ? <BlockRenderer block={activeBlock} /> : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}