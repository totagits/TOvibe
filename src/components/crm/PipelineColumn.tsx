import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Deal, Stage } from '@shared/types';
import { DealCard } from './DealCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
interface PipelineColumnProps {
  stage: Stage;
  deals: Deal[];
}
export function PipelineColumn({ stage, deals }: PipelineColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage.id,
    data: {
      type: 'Stage',
      stage,
    },
  });
  const totalValue = deals.reduce((sum, deal) => sum + deal.amount, 0);
  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-col flex-shrink-0 w-72 bg-muted/50 rounded-lg h-[calc(100vh-20rem)]",
        isOver && "ring-2 ring-primary"
      )}
    >
      <div className="p-4 border-b">
        <h3 className="font-semibold">{stage.name} ({deals.length})</h3>
        <p className="text-sm text-muted-foreground">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalValue)}
        </p>
      </div>
      <ScrollArea className="flex-grow p-2">
        <SortableContext items={deals.map(d => d.id)} strategy={verticalListSortingStrategy}>
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </SortableContext>
      </ScrollArea>
    </div>
  );
}