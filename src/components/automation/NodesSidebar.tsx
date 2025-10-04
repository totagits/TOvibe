import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WorkflowNodeData } from "@shared/types";
import { DynamicIcon } from '@/components/DynamicIcon';
const availableNodes: { title: string; nodes: Omit<WorkflowNodeData, 'type'>[] }[] = [
  {
    title: 'Triggers',
    nodes: [
      { title: 'Form Submitted', description: 'When a form is submitted.', icon: 'FileText' },
      { title: 'Contact Created', description: 'When a new contact is added.', icon: 'UserPlus' },
      { title: 'Tag Added', description: 'When a tag is added to a contact.', icon: 'Tag' },
    ],
  },
  {
    title: 'Actions',
    nodes: [
      { title: 'Send Email', description: 'Send a marketing email.', icon: 'Mail' },
      { title: 'Send SMS', description: 'Send an SMS message.', icon: 'MessageSquare' },
      { title: 'Wait/Delay', description: 'Pause the workflow for a time.', icon: 'Timer' },
      { title: 'Add to Pipeline', description: 'Create a new deal for contact.', icon: 'KanbanSquare' },
    ],
  },
];
export function NodesSidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: 'trigger' | 'action', data: Omit<WorkflowNodeData, 'type'>) => {
    const nodeData: WorkflowNodeData = { ...data, type: nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeData));
    event.dataTransfer.effectAllowed = 'move';
  };
  return (
    <div className="p-4 border-r bg-background h-full">
      <h2 className="text-lg font-semibold mb-4">Nodes</h2>
      <Accordion type="multiple" defaultValue={['Triggers', 'Actions']} className="w-full">
        {availableNodes.map(({ title, nodes }) => (
          <AccordionItem value={title} key={title}>
            <AccordionTrigger>{title}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {nodes.map((node) => {
                  const nodeType = title.toLowerCase().includes('trigger') ? 'trigger' : 'action';
                  return (
                    <div
                      key={node.title}
                      className="p-3 border rounded-md flex items-center gap-3 cursor-grab hover:shadow-md transition-shadow bg-card"
                      onDragStart={(event) => onDragStart(event, nodeType, node)}
                      draggable
                    >
                      <DynamicIcon name={node.icon} className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold text-sm">{node.title}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}