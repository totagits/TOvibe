import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, Paperclip, Mic } from 'lucide-react';
import { useInboxStore } from '@/hooks/use-inbox-data';
export function MessageComposer() {
  const [message, setMessage] = useState('');
  const sendMessage = useInboxStore((state) => state.sendMessage);
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };
  return (
    <div className="p-4 border-t bg-background">
      <form onSubmit={handleSend} className="relative">
        <Textarea
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              handleSend(e);
            }
          }}
          className="pr-28 min-h-[60px] resize-none"
        />
        <div className="absolute top-3 right-3 flex items-center gap-1">
           <Button type="button" size="icon" variant="ghost">
            <Paperclip className="w-4 h-4" />
          </Button>
           <Button type="button" size="icon" variant="ghost">
            <Mic className="w-4 h-4" />
          </Button>
          <Button type="submit" size="icon" disabled={!message.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}