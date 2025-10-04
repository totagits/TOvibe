import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ConversationList } from "@/components/inbox/ConversationList";
import { MessageView } from "@/components/inbox/MessageView";
export function InboxPage() {
  return (
    <div className="h-[calc(100vh-5rem)] w-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-full rounded-lg border"
      >
        <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
          <ConversationList />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <MessageView />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}