import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex gap-3 flex-row fade-in">
      <Avatar className="w-8 h-8 bg-primary">
        <AvatarFallback className="bg-primary text-primary-foreground">
          <Bot className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>
      
      <div className="bg-chat-bot text-chat-bot-foreground mr-auto max-w-xs lg:max-w-md px-4 py-3 rounded-2xl rounded-bl-md shadow-chat">
        <div className="flex items-center space-x-1">
          <span className="text-sm text-muted-foreground">BOESTI Assistant is typing</span>
          <div className="typing-dots">
            <div 
              className="typing-dot" 
              style={{ '--delay': '0ms' } as React.CSSProperties}
            />
            <div 
              className="typing-dot" 
              style={{ '--delay': '150ms' } as React.CSSProperties}
            />
            <div 
              className="typing-dot" 
              style={{ '--delay': '300ms' } as React.CSSProperties}
            />
          </div>
        </div>
      </div>
    </div>
  );
};