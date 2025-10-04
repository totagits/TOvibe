import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Deal } from '@shared/types';
import { cn } from '@/lib/utils';
import { GripVertical } from 'lucide-react';
interface DealCardProps {
  deal: Deal;
  isDragging?: boolean;
}
export function DealCard({ deal, isDragging }: DealCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging: isSortableDragging } = useSortable({
    id: deal.id,
    data: {
      type: 'Deal',
      deal,
    },
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
      <CardHeader className="p-3 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium leading-none">{deal.name}</CardTitle>
        <div {...attributes} {...listeners} className="cursor-grab p-1 text-secondary-foreground/50 hover:text-secondary-foreground">
          <GripVertical className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="text-xs text-muted-foreground">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: deal.currency }).format(deal.amount)}
        </div>
      </CardContent>
    </Card>
  );
}