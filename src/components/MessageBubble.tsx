import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';
import { Message } from './ChatWindow';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.type === 'user';
  
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} fade-in`}>
      {!isUser && (
        <Avatar className="w-8 h-8 bg-primary">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={`
          ${isUser ? 'chat-message-user' : 'chat-message-bot'}
          ${message.isStreaming ? 'opacity-90' : ''}
        `}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        <div className="flex justify-end mt-1">
          <span className="text-xs opacity-60">
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </div>
      
      {isUser && (
        <Avatar className="w-8 h-8 bg-primary-light">
          <AvatarFallback className="bg-primary-light text-white">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};