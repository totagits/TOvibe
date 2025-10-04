import { useEffect, useMemo, useRef } from 'react';
import { useInboxStore } from '@/hooks/use-inbox-data';
import { useShallow } from 'zustand/react/shallow';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageComposer } from './MessageComposer';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/hooks/use-auth';
import { Phone, Video, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function MessageView() {
  const {
    selectedThreadId,
    threads,
    messages,
    isLoadingMessages,
  } = useInboxStore(
    useShallow((state) => ({
      selectedThreadId: state.selectedThreadId,
      threads: state.threads,
      messages: state.messages,
      isLoadingMessages: state.isLoadingMessages,
    }))
  );
  const user = useAuthStore((state) => state.user);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const selectedThread = threads.find(t => t.id === selectedThreadId);
  const currentMessages = useMemo(() => {
    return selectedThreadId ? messages[selectedThreadId] || [] : [];
  }, [selectedThreadId, messages]);
  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [currentMessages]);
  if (!selectedThreadId) {
    return (
      <div className="flex flex-col h-full items-center justify-center bg-muted/20">
        <p className="text-muted-foreground">Select a conversation to start messaging</p>
      </div>
    );
  }
  if (isLoadingMessages) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
        <div className="flex-1 p-4 space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-12 w-3/4 ml-auto" />
          <Skeleton className="h-12 w-3/4" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b flex items-center justify-between bg-background">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={selectedThread?.contact?.avatarUrl} />
            <AvatarFallback>{selectedThread?.contact?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="font-semibold">{selectedThread?.contact?.name}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon"><Video className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon"><Info className="h-4 w-4" /></Button>
        </div>
      </header>
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-4 space-y-4">
          {currentMessages.map((msg) => {
            const isUser = msg.authorType === 'user';
            return (
              <div key={msg.id} className={cn('flex items-end gap-2', isUser ? 'justify-end' : 'justify-start')}>
                {!isUser && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={selectedThread?.contact?.avatarUrl} />
                    <AvatarFallback>{selectedThread?.contact?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg',
                    isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  )}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs mt-1 opacity-70 text-right">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                 {isUser && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatarUrl} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <MessageComposer />
    </div>
  );
}