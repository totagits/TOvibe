import { PageBlock } from '@shared/types';
import { Button } from '@/components/ui/button';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import { usePageEditorStore } from '@/hooks/use-page-editor-data';
import { cn } from '@/lib/utils';
interface BlockRendererProps {
  block: PageBlock;
}
const HeroBlock = ({ content }: { content: any }) => (
  <div className="relative w-full h-[500px] bg-cover bg-center text-white flex items-center justify-center" style={{ backgroundImage: `url(${content.imageUrl})` }}>
    <div className="absolute inset-0 bg-black/50" />
    <div className="relative text-center p-8">
      <h1 className="text-5xl font-bold">{content.title}</h1>
      <p className="text-xl mt-4">{content.subtitle}</p>
      <Button size="lg" className="mt-8">{content.buttonText}</Button>
    </div>
  </div>
);
const TextBlock = ({ content }: { content: any }) => (
  <div className="container mx-auto py-16 px-4">
    <h2 className="text-3xl font-bold mb-4">{content.heading}</h2>
    <p className="text-lg text-muted-foreground">{content.text}</p>
  </div>
);
const blockComponents: Record<string, React.FC<{ content: any }>> = {
  hero: HeroBlock,
  text: TextBlock,
};
export function BlockRenderer({ block }: BlockRendererProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
    data: { type: 'Block', block },
  });
  const deleteBlock = usePageEditorStore((state) => state.deleteBlock);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const BlockComponent = blockComponents[block.type];
  if (!BlockComponent) {
    return (
      <div className="p-4 border border-dashed border-destructive text-destructive">
        Unknown block type: {block.type}
      </div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("relative group", isDragging && "opacity-50 z-50")}
    >
      <div className="absolute top-2 right-2 z-10 hidden group-hover:flex items-center gap-1 bg-background p-1 rounded-md border shadow-sm">
        <Button variant="ghost" size="icon" {...attributes} {...listeners} className="cursor-grab">
          <GripVertical className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => deleteBlock(block.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <BlockComponent content={block.content} />
    </div>
  );
}