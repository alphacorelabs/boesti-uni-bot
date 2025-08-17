import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, GraduationCap, FileText, Calendar } from 'lucide-react';

interface SampleQuestionsProps {
  onQuestionClick: (question: string) => void;
  disabled: boolean;
}

const sampleQuestions = [
  {
    icon: GraduationCap,
    text: "What are the admission requirements for Computer Science?",
    category: "Programs"
  },
  {
    icon: FileText,
    text: "What documents do I need to apply?",
    category: "Documents"
  },
  {
    icon: Calendar,
    text: "When is the application deadline?",
    category: "Deadlines"
  },
  {
    icon: MessageSquare,
    text: "Tell me about scholarship opportunities",
    category: "Financial Aid"
  }
];

export const SampleQuestions: React.FC<SampleQuestionsProps> = ({ onQuestionClick, disabled }) => {
  return (
    <div className="p-4 border-t border-border bg-muted/20">
      <h3 className="text-sm font-medium text-muted-foreground mb-3 text-center">
        Quick Questions to Get Started
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-2xl mx-auto">
        {sampleQuestions.map((question, index) => {
          const Icon = question.icon;
          return (
            <Button
              key={index}
              variant="outline"
              onClick={() => onQuestionClick(question.text)}
              disabled={disabled}
              className="justify-start text-left h-auto py-3 px-4 hover:bg-primary/5 hover:border-primary/30 transition-all duration-200"
            >
              <div className="flex items-start gap-3 w-full">
                <Icon className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {question.text}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {question.category}
                  </p>
                </div>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};