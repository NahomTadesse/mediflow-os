"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  Users,
  Clock,
  Briefcase,
  Calendar,
  FileText,
} from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  time: string;
}

const quickReplies = [
  "How do I apply for leave?",
  "Where can I check my payslip?",
  "I need to update my personal details",
  "How to request a training?",
  "Report a technical issue",
  "Check my attendance record",
  "Request equipment",
  "View company policies",
  "Schedule performance review",
  "Submit expense report",
];

export default function GlobalChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! Welcome to HR Assistant.\nHow can I help you with HR matters today?",
      sender: "bot",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: messages.length + 1,
      text,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMsg]);

    // Simulate HR bot responses
    setTimeout(() => {
      const botResponses: Record<string, string> = {
        "How do I apply for leave?":
          "Go to Leave Management → Apply Leave. Select type, dates, and submit. Approval takes 24-48 hours.",
        "Where can I check my payslip?":
          "Payslips are available in Payroll → My Payslips. They're generated on the 5th of each month.",
        "I need to update my personal details":
          "Update personal info in Employee Profile → Personal Details. Emergency contacts can be added there too.",
        "How to request a training?":
          "Submit training requests in Training → Request Training. Include course details and justification.",
        "Report a technical issue":
          "Please submit IT tickets through IT Portal. Urgent issues? Call IT helpdesk at ext. 555.",
        "Check my attendance record":
          "View your attendance in Attendance → My Records. Discrepancies? Contact your manager.",
        "Request equipment":
          "Equipment requests go through Assets → Request Equipment. IT equipment needs IT approval.",
        "View company policies":
          "All policies are in Documents → Company Policies. Latest updates highlighted in yellow.",
        "Schedule performance review":
          "Schedule reviews in Performance → My Reviews. Quarterly reviews are mandatory.",
        "Submit expense report":
          "Submit expenses in Finance → Expense Claims. Keep receipts under $50, invoices above.",
      };

      const defaultResponses = [
        "I've forwarded your query to the HR department. They'll respond within 24 hours.",
        "Please check the HR handbook for detailed procedures.",
        "You can find that information in the Employee Self-Service portal.",
        "For urgent matters, please contact HR directly at hr@company.com.",
        "That process requires manager approval first. Please discuss with your supervisor.",
      ];

      const reply =
        botResponses[text] ||
        defaultResponses[Math.floor(Math.random() * defaultResponses.length)];

      const botMsg: Message = {
        id: messages.length + 2,
        text: reply,
        sender: "bot",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);

    setInput("");
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[9999] w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-all duration-300 group"
        aria-label="Open HR Assistant"
      >
        {isOpen ? (
          <X className="w-8 h-8" />
        ) : (
          <>
            <MessageCircle className="w-8 h-8" />
            {/* Notification dot for new messages */}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 z-[9998] w-96 h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-5 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">HR Assistant</h3>
                  <div className="flex items-center gap-2 text-xs opacity-90">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Live Support</span>
                    </div>
                    <span>•</span>
                    <span>Mon-Fri, 9AM-6PM</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-lg p-2 transition"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="px-4 py-3 bg-blue-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Clock className="w-3 h-3" />
                <span>Avg. response: 2 min</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Users className="w-3 h-3" />
                <span>HR Team Online</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <Bot className="w-3 h-3 text-blue-600 dark:text-blue-300" />
                      </div>
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-300">
                        HR Assistant
                      </span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  <p
                    className={`text-xs mt-2 ${
                      msg.sender === "user"
                        ? "text-blue-200"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Quick HR Actions
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {quickReplies.slice(0, 4).map((reply, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(reply)}
                  className="px-3 py-2 bg-white dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg text-xs text-gray-700 dark:text-gray-300 transition-all hover:scale-[1.02]"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask about HR policies, leave, payroll..."
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  input.trim()
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <button className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Leave</span>
                </button>
                <button className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  <span>Documents</span>
                </button>
              </div>
              <span>Press Enter to send</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
