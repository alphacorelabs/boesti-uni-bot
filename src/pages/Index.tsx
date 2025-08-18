import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Wifi, WifiOff, MessageCircle, GraduationCap, BookOpen, Users, Award } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useChatbot } from "@/hooks/useChatbot";

const Index: React.FC = () => {
  const { messages, isTyping, connectionStatus, sendMessage } = useChatbot();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim() || isTyping) return;
    sendMessage(input);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What are the admission requirements?",
    "Tell me about Computer Science program",
    "When are application deadlines?",
    "What scholarships are available?",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-gray-800 to-emerald-900">
      {/* Glassmorphism background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-gray-800/40 to-emerald-900/60"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      {/* Additional glassmorphism elements */}
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-60 h-60 sm:w-80 sm:h-80 bg-gradient-to-r from-emerald-400/20 to-green-400/15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-400/15 to-indigo-400/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-gradient-to-r from-teal-400/10 to-emerald-400/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-md rounded-full mb-4 sm:mb-6 border border-white/30 shadow-2xl">
            <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 bg-clip-text text-transparent px-2">
            BOUESTI Admission Chatbot
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-3 sm:mb-2 px-4">
            Get instant answers about admissions, programs, and requirements
          </p>
          <div className="text-xs sm:text-sm text-gray-300 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 inline-block border border-white/20 shadow-lg mx-4">
            Developed by <span className="font-semibold text-emerald-400 block sm:inline">Egbeyemi Adeniyi Olorunfemi</span>{" "}
            <span className="hidden sm:inline">-</span> <span className="block sm:inline">BOUESTI Computer Science</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 text-center shadow-2xl hover:bg-white/20 transition-all duration-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-1">50+ Programs</h3>
            <p className="text-gray-300 text-xs sm:text-sm">Undergraduate & Postgraduate</p>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 text-center shadow-2xl hover:bg-white/20 transition-all duration-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-1">15,000+ Students</h3>
            <p className="text-gray-300 text-xs sm:text-sm">Active Learners</p>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 text-center shadow-2xl hover:bg-white/20 transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Top Ranked</h3>
            <p className="text-gray-300 text-xs sm:text-sm">Excellence in Education</p>
          </div>
        </div>

        {/* Chat Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/30 shadow-2xl overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-emerald-500/30 to-teal-500/30 backdrop-blur-sm p-3 sm:p-4 border-b border-white/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                    <Bot className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm sm:text-base">BOUESTI Assistant</h3>
                    <p className="text-gray-200 text-xs sm:text-sm">Always here to help</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  {connectionStatus === "connected" ? (
                    <Wifi className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                  ) : (
                    <WifiOff className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                  )}
                  <span className="text-xs text-gray-200 hidden sm:inline">
                    {connectionStatus === "connected" ? "Connected" : "Disconnected"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="p-3 sm:p-4 border-b border-white/20 bg-white/10 backdrop-blur-sm">
                <p className="text-gray-200 text-xs sm:text-sm mb-2 sm:mb-3">Quick questions to get started:</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(question)}
                      className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-emerald-400/30 transition-all duration-200 hover:scale-105 backdrop-blur-sm"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="h-80 sm:h-96 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start space-x-2 max-w-[280px] sm:max-w-xs lg:max-w-md ${
                      message.type === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-emerald-400 to-teal-400"
                          : "bg-gradient-to-r from-emerald-400 to-teal-400"
                      }`}
                    >
                      {message.type === "user" ? (
                        <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      ) : (
                        <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                          : "bg-white/3 backdrop-blur-md text-white border border-white/40 shadow-lg"
                      }`}
                    >
                      {message.type === "bot" ? (
                        <div className="text-sm sm:text-sm leading-relaxed text-white">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({ children }) => <p className="mb-2 last:mb-0 text-white">{children}</p>,
                              strong: ({ children }) => <span className="font-bold text-emerald-100">{children}</span>,
                              em: ({ children }) => <span className="italic text-white">{children}</span>,
                              ul: ({ children }) => <ul className="ml-4 mb-2 list-disc text-white">{children}</ul>,
                              ol: ({ children }) => <ol className="ml-4 mb-2 list-decimal text-white">{children}</ol>,
                              li: ({ children }) => <li className="mb-1 text-white">{children}</li>,
                              h1: ({ children }) => <h1 className="text-sm sm:text-base font-bold mb-2 text-emerald-100">{children}</h1>,
                              h2: ({ children }) => <h2 className="text-sm font-bold mb-2 text-emerald-100">{children}</h2>,
                              h3: ({ children }) => <h3 className="text-xs sm:text-sm font-bold mb-1 text-emerald-100">{children}</h3>,
                              code: ({ children }) => (
                                <code className="bg-white/20 px-1 py-0.5 rounded text-emerald-100 font-medium">{children}</code>
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                          {message.isStreaming && (
                            <span className="inline-block w-1.5 h-3 sm:w-2 sm:h-4 ml-1 bg-white animate-pulse"></span>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm sm:text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content}
                          {message.isStreaming && (
                            <span className="inline-block w-1.5 h-3 sm:w-2 sm:h-4 ml-1 bg-current animate-pulse"></span>
                          )}
                        </p>
                      )}
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && messages.length > 0 && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 flex items-center justify-center">
                      <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div className="bg-white/25 backdrop-blur-md p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-white/30 shadow-lg">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-300 rounded-full animate-bounce"></div>
                        <div
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-300 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-300 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 sm:p-4 border-t border-white/30">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about admissions, programs..."
                    className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent shadow-lg"
                    disabled={isTyping}
                  />
                  <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2">
                    <span className="text-xs text-gray-300 hidden sm:inline">{input.length}/500</span>
                  </div>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isTyping}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:from-gray-500 disabled:to-gray-600 text-white p-2.5 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-200 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              <div className="flex items-center justify-center mt-2 sm:mt-3 space-x-2">
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
                <span className="text-xs text-gray-300">Responses can be wrong or inaccurate, please verify with the university</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 sm:mt-8 px-4">
          <p className="text-gray-300 text-xs sm:text-sm">© 2024 Bamidele Olomilua University • Computer Science Department</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
