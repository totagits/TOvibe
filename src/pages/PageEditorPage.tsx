import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePageEditorStore } from '@/hooks/use-page-editor-data';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye, Save, Monitor, Tablet, Smartphone } from 'lucide-react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { EditorSidebar } from '@/components/pages/EditorSidebar';
import { EditorCanvas } from '@/components/pages/EditorCanvas';
import { Skeleton } from '@/components/ui/skeleton';
export function PageEditorPage() {
  const { pageId } = useParams<{ pageId: string }>();
  const { page, isLoading, fetchPage } = usePageEditorStore((state) => ({
    page: state.page,
    isLoading: state.isLoading,
    fetchPage: state.fetchPage,
  }));
  useEffect(() => {
    if (pageId) {
      fetchPage(pageId);
    }
  }, [pageId, fetchPage]);
  return (
    <div className="h-screen w-screen flex flex-col bg-muted/40">
      <header className="flex items-center justify-between h-14 px-4 border-b bg-background shrink-0">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="sm">
            <Link to="/pages">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          {isLoading ? <Skeleton className="h-6 w-48" /> : <h1 className="font-semibold text-lg">{page?.name}</h1>}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon"><Monitor className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon"><Tablet className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon"><Smartphone className="h-4 w-4" /></Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save & Publish
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <ResizablePanelGroup direction="horizontal" className="h-full w-full">
          <ResizablePanel defaultSize={80}>
            <EditorCanvas />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
            <EditorSidebar />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}