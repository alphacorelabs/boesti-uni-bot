import React, { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isTyping }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-muted/20">
      {messages.length === 0 && (
        <div className="text-center py-12 fade-in">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Welcome to BOESTI Admission Inquiry
            </h3>
            <p className="text-muted-foreground mb-6">
              I'm here to help you with questions about admissions, programs, requirements, and more. How can I assist you today?
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium text-primary">Try asking:</p>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>• "What are the admission requirements?"</p>
                <p>• "Tell me about Computer Science programs"</p>
                <p>• "What documents do I need to apply?"</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      
      {isTyping && <TypingIndicator />}
      
      <div ref={messagesEndRef} />
    </div>
  );
};