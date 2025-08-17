import React from 'react';
import { Header } from '@/components/Header';
import { ChatWindow } from '@/components/ChatWindow';
import { ChatInput } from '@/components/ChatInput';
import { SampleQuestions } from '@/components/SampleQuestions';
import { ConnectionStatus } from '@/components/ConnectionStatus';
import { useChatbot } from '@/hooks/useChatbot';

const Index = () => {
  const { messages, isTyping, connectionStatus, sendMessage } = useChatbot();

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
      {/* Header Section */}
      <Header />
      
      {/* Main Chat Container */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Connection Status */}
        <div className="flex justify-end p-4 pb-0">
          <ConnectionStatus status={connectionStatus} />
        </div>
        
        {/* Chat Interface */}
        <div className="flex-1 flex flex-col mx-4 mb-4 bg-card rounded-xl shadow-academic border border-border overflow-hidden">
          <ChatWindow messages={messages} isTyping={isTyping} />
          
          {/* Sample Questions - Show only when no messages */}
          {messages.length === 0 && (
            <SampleQuestions 
              onQuestionClick={sendMessage} 
              disabled={isTyping} 
            />
          )}
          
          <ChatInput 
            onSendMessage={sendMessage} 
            disabled={isTyping}
            placeholder="Ask about admissions, programs, requirements..."
          />
        </div>
      </div>
      
      {/* Footer Credit */}
      <footer className="py-4 text-center text-sm text-muted-foreground bg-muted/30">
        <p>
          BOESTI Admission Inquiry Chatbot • Computer Science Final Year Project
        </p>
        <p className="text-xs mt-1">
          Developed by Egbeyemi Adeniyi Olorunfemi • Bamidele Olomilua University of Science & Technology
        </p>
      </footer>
    </div>
  );
};

export default Index;
