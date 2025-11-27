'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getChatbotResponse } from '@/lib/actions';
import { Bot, User, Send, Sparkle, Gavel } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type Message = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
};

export function ChatbotInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    const query = input;
    setInput('');

    startTransition(async () => {
      const assistantResponse = await getChatbotResponse(query);
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: assistantResponse,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    });
  };

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="container mx-auto max-w-3xl space-y-6 p-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center h-[calc(100dvh-12rem)]">
                <Gavel className="h-16 w-16 text-primary" />
                <h2 className="mt-4 text-2xl font-bold">Legal Buddy Chatbot</h2>
                <p className="mt-2 text-muted-foreground">
                  Ask me any legal questions. How can I assist you today?
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    'flex items-start gap-4',
                    message.role === 'user' && 'justify-end'
                  )}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="h-8 w-8 border">
                      <AvatarFallback>
                        <Bot />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-md rounded-lg px-4 py-3 text-sm',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card'
                    )}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                    <Avatar className="h-8 w-8 border">
                      <AvatarFallback>
                        <User />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              ))
            )}
            {isPending && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-4"
              >
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback>
                    <Bot />
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-md rounded-lg bg-card px-4 py-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Sparkle className="h-4 w-4 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>
      </div>
      <div className="border-t bg-card">
        <div className="container mx-auto max-w-3xl p-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a legal question..."
              className="flex-1"
              autoComplete="off"
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isPending}>
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
