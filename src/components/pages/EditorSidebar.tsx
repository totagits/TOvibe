import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PageBlockType } from '@shared/types';
import { Heading1, Image, Type, MousePointer, MessageSquare } from 'lucide-react';
const availableBlocks = [
  { type: 'hero', name: 'Hero Section', icon: Heading1 },
  { type: 'text', name: 'Text Block', icon: Type },
  { type: 'image', name: 'Image', icon: Image },
  { type: 'button', name: 'Button', icon: MousePointer },
  { type: 'form', name: 'Form', icon: MessageSquare },
];
export function EditorSidebar() {
  const onDragStart = (event: React.DragEvent, blockType: PageBlockType) => {
    event.dataTransfer.setData('application/json', JSON.stringify({ type: blockType }));
    event.dataTransfer.effectAllowed = 'copy';
  };
  return (
    <Card className="h-full border-0 border-r rounded-none">
      <CardHeader>
        <CardTitle>Content Blocks</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-10rem)]">
          <div className="grid grid-cols-2 gap-4">
            {availableBlocks.map((block) => (
              <div
                key={block.type}
                draggable
                onDragStart={(e) => onDragStart(e, block.type as PageBlockType)}
                className="flex flex-col items-center justify-center p-4 border rounded-lg cursor-grab hover:bg-muted hover:shadow-md transition-all"
              >
                <block.icon className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm font-medium text-center">{block.name}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}