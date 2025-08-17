import { useState, useCallback, useRef } from 'react';
import { Message } from '@/components/ChatWindow';
import { ConnectionState } from '@/components/ConnectionStatus';

// Simulated responses for demonstration
const botResponses: Record<string, string> = {
  admission: `The admission requirements for BOESTI programs include:

📋 **General Requirements:**
• Senior Secondary Certificate (WAEC/NECO) with minimum 5 credits including English and Mathematics
• JAMB UTME score (minimum cut-off varies by program)
• BOESTI Post-UTME screening examination
• Medical certificate of fitness

🖥️ **Computer Science Specific:**
• Mathematics (credit level)
• Physics (credit level)  
• Chemistry or Biology (credit level)
• Minimum JAMB score: 180

Would you like more details about any specific requirement?`,

  documents: `Required documents for your application:

📄 **Academic Documents:**
• Original and photocopies of O'Level certificates (WAEC/NECO)
• JAMB result slip
• Birth certificate or age declaration
• Local Government origin certificate

🏥 **Medical & Personal:**
• Medical certificate from a recognized hospital
• Recent passport photographs (8 copies)
• Completed application form

💰 **Payment:**
• Application fee receipt
• Acceptance fee receipt (upon offer)

All documents should be submitted during the application period.`,

  programs: `BOESTI offers excellent programs in technology and science:

🖥️ **Computer Science Department:**
• Computer Science (B.Sc) - 4 years
• Software Engineering track available
• Strong emphasis on practical programming
• Industry partnerships for internships

🔬 **Other Programs:**
• Information Technology
• Electrical/Electronics Engineering  
• Mechanical Engineering
• Pure and Applied Sciences

The Computer Science program includes modern curriculum with AI, cybersecurity, and mobile development courses.`,

  deadlines: `Important dates for the 2024/2025 academic session:

📅 **Application Timeline:**
• Application portal opens: May 15, 2024
• Application deadline: August 30, 2024
• Post-UTME screening: September 15-20, 2024
• Admission list release: October 15, 2024

⏰ **Payment Deadlines:**
• Application fee: Before August 30, 2024
• Acceptance fee: Within 2 weeks of admission offer
• School fees: Before resumption date

📚 **Academic Calendar:**
• Resumption: November 4, 2024
• Orientation: November 4-8, 2024
• Lectures begin: November 11, 2024`,

  scholarship: `BOESTI offers several scholarship opportunities:

🎓 **Merit-Based Scholarships:**
• Academic Excellence Award (full tuition)
• Dean's List Scholarship (50% tuition)
• Minimum CGPA requirement: 3.5

💼 **Need-Based Support:**
• Financial hardship assistance
• Work-study programs available
• Payment plan options

🏆 **Special Programs:**
• STEM Excellence Scholarship for Computer Science
• Rural Community Scholarship
• Alumni Scholarship Fund

Application for scholarships opens alongside admission applications. Contact the Student Affairs Office for more details.`
};

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionState>('connected');
  const messageIdCounter = useRef(0);

  const generateMessageId = () => {
    messageIdCounter.current += 1;
    return `msg_${messageIdCounter.current}_${Date.now()}`;
  };

  const findBestResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('admission') || message.includes('requirement') || message.includes('qualify')) {
      return botResponses.admission;
    }
    if (message.includes('document') || message.includes('paper') || message.includes('certificate')) {
      return botResponses.documents;
    }
    if (message.includes('program') || message.includes('course') || message.includes('computer science') || message.includes('study')) {
      return botResponses.programs;
    }
    if (message.includes('deadline') || message.includes('when') || message.includes('date') || message.includes('timeline')) {
      return botResponses.deadlines;
    }
    if (message.includes('scholarship') || message.includes('financial') || message.includes('fee') || message.includes('payment')) {
      return botResponses.scholarship;
    }

    // Default response for other queries
    return `Thank you for your question about "${userMessage}".

I'm the BOESTI Admission Assistant, and I can help you with:

🎓 **Admission Requirements** - Entry requirements for all programs
📋 **Required Documents** - What you need to submit  
📅 **Important Dates** - Application deadlines and academic calendar
💰 **Financial Information** - Fees, scholarships, and payment options
🖥️ **Program Details** - Information about our courses

Please feel free to ask me about any of these topics, and I'll provide you with detailed information to help with your admission process.`;
  };

  const simulateTyping = async (response: string): Promise<void> => {
    return new Promise((resolve) => {
      const words = response.split(' ');
      let currentText = '';
      let wordIndex = 0;
      
      const botMessage: Message = {
        id: generateMessageId(),
        type: 'bot',
        content: '',
        timestamp: new Date(),
        isStreaming: true
      };

      // Add empty bot message
      setMessages(prev => [...prev, botMessage]);

      const typeNextWord = () => {
        if (wordIndex < words.length) {
          currentText += (wordIndex > 0 ? ' ' : '') + words[wordIndex];
          
          setMessages(prev => 
            prev.map(msg => 
              msg.id === botMessage.id 
                ? { ...msg, content: currentText }
                : msg
            )
          );
          
          wordIndex++;
          // Vary typing speed for more natural feel
          const delay = Math.random() * 50 + 30; // 30-80ms per word
          setTimeout(typeNextWord, delay);
        } else {
          // Mark as complete
          setMessages(prev => 
            prev.map(msg => 
              msg.id === botMessage.id 
                ? { ...msg, isStreaming: false }
                : msg
            )
          );
          setIsTyping(false);
          resolve();
        }
      };

      setTimeout(typeNextWord, 500); // Initial delay before typing starts
    });
  };

  const sendMessage = useCallback(async (content: string) => {
    if (isTyping) return;

    // Add user message
    const userMessage: Message = {
      id: generateMessageId(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Get and stream bot response
    const response = findBestResponse(content);
    await simulateTyping(response);
  }, [isTyping]);

  return {
    messages,
    isTyping,
    connectionStatus,
    sendMessage
  };
};