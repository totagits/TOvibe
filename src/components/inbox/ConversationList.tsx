import { useInboxStore, ThreadWithContact } from '@/hooks/use-inbox-data';
import { useShallow } from 'zustand/react/shallow';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
function ConversationItem({ thread }: { thread: ThreadWithContact }) {
  const { selectedThreadId, selectThread } = useInboxStore(
    useShallow((state) => ({
      selectedThreadId: state.selectedThreadId,
      selectThread: state.selectThread,
    }))
  );
  const isSelected = thread.id === selectedThreadId;
  return (
    <button
      onClick={() => selectThread(thread.id)}
      className={cn(
        'flex items-start gap-3 p-3 w-full text-left rounded-lg transition-colors',
        isSelected ? 'bg-muted' : 'hover:bg-muted/50'
      )}
    >
      <Avatar>
        <AvatarImage src={thread.contact?.avatarUrl} />
        <AvatarFallback>{thread.contact?.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold truncate">{thread.contact?.name}</h3>
          <p className="text-xs text-muted-foreground whitespace-nowrap">
            {formatDistanceToNow(new Date(thread.lastMessageAt), { addSuffix: true })}
          </p>
        </div>
        <p className={cn('text-sm text-muted-foreground truncate', !thread.isRead && 'font-bold text-foreground')}>
          {thread.lastMessageSnippet}
        </p>
      </div>
      {!thread.isRead && <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />}
    </button>
  );
}
export function ConversationList() {
  const { threads, isLoadingThreads } = useInboxStore(
    useShallow((state) => ({
      threads: state.threads,
      isLoadingThreads: state.isLoadingThreads,
    }))
  );
  if (isLoadingThreads) {
    return (
      <div className="p-2 space-y-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Inbox</h2>
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search conversations..." className="pl-8" />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {threads
            .slice()
            .sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime())
            .map((thread) => (
              <ConversationItem key={thread.id} thread={thread} />
            ))}
        </div>
      </ScrollArea>
    </div>
  );
}