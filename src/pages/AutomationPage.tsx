import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { NodesSidebar } from "@/components/automation/NodesSidebar";
import { WorkflowCanvas } from "@/components/automation/WorkflowCanvas";
import { Button } from "@/components/ui/button";
import { Play, Save } from "lucide-react";
export function AutomationPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] w-full">
      <div className="flex items-center justify-between pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Automation Builder</h1>
          <p className="text-muted-foreground">Create powerful workflows to automate your tasks.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Play className="mr-2 h-4 w-4" />
            Test
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Workflow
          </Button>
        </div>
      </div>
      <div className="flex-grow">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full w-full rounded-lg border"
        >
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <NodesSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80}>
            <WorkflowCanvas />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}