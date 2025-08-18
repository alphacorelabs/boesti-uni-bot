import { useState, useCallback, useRef } from "react";
import { Message } from "@/components/ChatWindow";
import { ConnectionState } from "@/components/ConnectionStatus";

const API_BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3001/api" : "/api";

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content: `Hello! I'm your official BOUESTI admission assistant. I can help you with:

🎓 **Admission Requirements** - Entry requirements and eligibility
📋 **Application Process** - Step-by-step guidance
📅 **Important Dates** - Deadlines and academic calendar
💰 **Fees & Scholarships** - Financial information
🏫 **Programs** - Available degree courses
📞 **Contact Information** - University details

What would you like to know about BOUESTI?`,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionState>("connected");
  const messageIdCounter = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const generateMessageId = () => {
    messageIdCounter.current += 1;
    return `msg_${messageIdCounter.current}_${Date.now()}`;
  };

  const sendMessage = useCallback(
    async (content: string) => {
      if (isTyping || !content.trim()) return;

      // Add user message
      const userMessage: Message = {
        id: generateMessageId(),
        type: "user",
        content: content.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);
      setConnectionStatus("connected");

      // Cancel any previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();

      try {
        // Prepare conversation history (last 10 messages for context)
        const conversationHistory = messages.slice(-10).map((msg) => ({
          role: msg.type === "user" ? "user" : "assistant",
          content: msg.content,
        }));

        const response = await fetch(`${API_BASE_URL}/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: content,
            conversationHistory,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Create bot message for streaming
        const botMessage: Message = {
          id: generateMessageId(),
          type: "bot",
          content: "",
          timestamp: new Date(),
          isStreaming: true,
        };

        setMessages((prev) => [...prev, botMessage]);

        // Handle streaming response
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (reader) {
          let accumulatedContent = "";

          while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n").filter((line) => line.trim());

            for (const line of lines) {
              try {
                const parsed = JSON.parse(line);
                if (parsed.content) {
                  accumulatedContent += parsed.content;

                  // Update bot message with new content
                  setMessages((prev) => prev.map((msg) => (msg.id === botMessage.id ? { ...msg, content: accumulatedContent } : msg)));
                }
              } catch (e) {
                // Ignore parsing errors for incomplete chunks
              }
            }
          }

          // Mark streaming as complete
          setMessages((prev) => prev.map((msg) => (msg.id === botMessage.id ? { ...msg, isStreaming: false } : msg)));
        }
      } catch (error: unknown) {
        console.error("Error sending message:", error);

        if (error instanceof Error && error.name === "AbortError") {
          return; // Request was cancelled
        }

        setConnectionStatus("disconnected");

        // Add error message
        const errorMessage: Message = {
          id: generateMessageId(),
          type: "bot",
          content: `I apologize, but I'm having trouble connecting to the server right now. Please check your internet connection and try again. If the problem persists, you can contact BOUESTI directly at portal.bouesti.edu.ng.`,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
        abortControllerRef.current = null;
      }
    },
    [isTyping, messages]
  );

  return {
    messages,
    isTyping,
    connectionStatus,
    sendMessage,
  };
};
