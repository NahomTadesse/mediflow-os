"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  Calendar,
  FileText,
  Phone,
  Stethoscope,
  Clock,
  AlertCircle,
  Heart,
  Pill,
  Menu,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  time: string;
}

const quickReplies = [
  "How do I book an appointment?",
  "Where can I view my lab results?",
  "What are the visiting hours?",
  "How to request a prescription refill?",
  "I need to see a doctor urgently",
  "How to access my medical records?",
  "Insurance coverage questions",
  "Find a specialist",
  "Emergency contact numbers",
  "Hospital directions & parking",
];

export default function GlobalChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! 👋 Welcome to MedCare Hospital.\nI'm your virtual assistant. How can I help you today?",
      sender: "bot",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

    // Simulate MedCare bot responses
    setTimeout(() => {
      const botResponses: Record<string, string> = {
        "How do I book an appointment?":
          "You can book online via Patient Portal → Appointments, or call our hotline at +251-11-123-4567 (24/7).",
        "Where can I view my lab results?":
          "Lab results are available in Patient Portal → Reports after 48 hours. Urgent results are notified by phone.",
        "What are the visiting hours?":
          "Visiting hours: 3:00 PM - 8:00 PM daily. ICU: 11:00 AM - 12:00 PM & 5:00 PM - 6:00 PM.",
        "How to request a prescription refill?":
          "Submit refill requests in Patient Portal → Pharmacy. Allow 24 hours for processing.",
        "I need to see a doctor urgently":
          "For emergencies, please go directly to ER or call 911. For urgent care, call +251-911-999999.",
        "How to access my medical records?":
          "Medical records are available in Patient Portal → Records. Full history requires written request.",
        "Insurance coverage questions":
          "Please contact our Insurance Desk at extension 300 or email insurance@medcare.com.",
        "Find a specialist":
          "Browse our specialists in Find a Doctor section on the website or ask at reception.",
        "Emergency contact numbers":
          "Emergency: 911\nMain Hospital: +251-11-123-4567\nAmbulance: +251-911-888888",
        "Hospital directions & parking":
          "We are located at Bole Road, Addis Ababa. Free parking available in front and basement.",
      };

      const defaultResponses = [
        "I've notified the relevant department. Someone will contact you shortly.",
        "You can find this information in your Patient Portal.",
        "For immediate assistance, please call our main line: +251-11-123-4567.",
        "Your query has been forwarded to patient services.",
        "Please visit the reception desk on the ground floor for in-person help.",
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

    // On mobile, hide quick replies after sending to save space
    if (isMobile) {
      setShowQuickReplies(false);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Floating Chat Button - Responsive */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-[9999] flex items-center justify-center text-white transition-all duration-300 group bg-gradient-to-r from-teal-600 to-blue-600 rounded-full shadow-2xl hover:scale-110"
        style={{
          width: isMobile ? "56px" : "64px",
          height: isMobile ? "56px" : "64px",
          bottom: isMobile ? "16px" : "32px",
          right: isMobile ? "16px" : "32px",
        }}
        aria-label="Open MedCare Assistant"
      >
        {isOpen ? (
          <X className={isMobile ? "w-4 h-4" : "w-6 h6"} />
        ) : (
          <>
            <MessageCircle className={isMobile ? "w-6 h-6" : "w-8 h-8"} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-ping"></span>
          </>
        )}
      </button>

      {/* Chat Window - Responsive */}
      {isOpen && (
        <div
          className="fixed z-[9998] flex flex-col overflow-hidden bg-white border border-gray-200 shadow-2xl dark:bg-gray-900 dark:border-gray-800"
          style={{
            width: isMobile ? "calc(100vw - 32px)" : "24rem",
            height: isMobile ? "calc(100vh - 120px)" : "620px",
            maxHeight: isMobile ? "calc(100vh - 120px)" : "620px",
            bottom: isMobile ? "80px" : "112px",
            right: isMobile ? "16px" : "32px",
            left: isMobile ? "16px" : "auto",
            borderRadius: isMobile ? "20px" : "24px",
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-4 text-white sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-white/25 rounded-full sm:w-12 sm:h-12">
                  <Heart className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold sm:text-xl">
                    MedCare Assistant
                  </h3>
                  <div className="flex items-center gap-2 text-xs opacity-90 sm:text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Online • 24/7 Support</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isMobile && (
                  <button
                    onClick={() => setShowQuickReplies(!showQuickReplies)}
                    className="p-2 transition rounded-lg hover:bg-white/20"
                    aria-label="Toggle quick replies"
                  >
                    {showQuickReplies ? (
                      <ChevronRight className="w-5 h-5" />
                    ) : (
                      <ChevronLeft className="w-5 h-5" />
                    )}
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 transition rounded-lg hover:bg-white/20"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="flex items-center justify-between px-4 py-2 text-xs border-b border-gray-200 bg-teal-50 dark:bg-gray-800 dark:border-gray-700 sm:px-5 sm:py-3 sm:text-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Avg. response: &lt; 1 min</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Stethoscope className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Patient Services</span>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900 sm:p-6 sm:space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-xs px-4 py-3 rounded-2xl shadow-sm sm:px-5 sm:py-4 ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-br-none"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {msg.sender === "bot" && !isMobile && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-teal-600 dark:text-teal-300" />
                      </div>
                      <span className="text-sm font-medium text-teal-600 dark:text-teal-300">
                        MedCare Assistant
                      </span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap sm:text-sm">
                    {msg.text}
                  </p>
                  <p
                    className={`text-xs mt-2 ${
                      msg.sender === "user"
                        ? "text-teal-100"
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

          {/* Quick Actions - Responsive */}
          {(showQuickReplies || !isMobile) && (
            <div className="p-4 border-t border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
              <h4 className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <AlertCircle className="w-4 h-4" />
                Common Questions
              </h4>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {quickReplies.slice(0, isMobile ? 4 : 6).map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(reply)}
                    className="px-3 py-2 text-xs transition-all border rounded-lg bg-gradient-to-r from-teal-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 hover:from-teal-100 hover:to-blue-100 dark:hover:from-gray-600 dark:hover:to-gray-700 border-teal-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:scale-[1.02] sm:text-xs"
                  >
                    <span className="line-clamp-1 text-left">{reply}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area - Responsive */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-700 sm:p-5">
            <div className="flex items-center gap-2 sm:gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask about appointments, reports..."
                className="flex-1 px-4 py-3 text-sm transition bg-white border border-gray-300 rounded-full dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent sm:px-5 sm:text-base"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className={`px-4 py-3 font-medium transition-all rounded-full sm:px-5 ${
                  input.trim()
                    ? "bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:opacity-90 shadow-lg"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            {/* Footer Actions - Responsive */}
            <div className="flex flex-col gap-2 mt-3 text-xs text-gray-500 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center justify-between gap-2 sm:gap-4">
                <button className="flex items-center gap-1 hover:text-teal-600 dark:hover:text-teal-400">
                  <Calendar className="w-4 h-4" />
                  {!isMobile && <span>Book</span>}
                </button>
                <button className="flex items-center gap-1 hover:text-teal-600 dark:hover:text-teal-400">
                  <FileText className="w-4 h-4" />
                  {!isMobile && <span>Reports</span>}
                </button>
                <button className="flex items-center gap-1 hover:text-teal-600 dark:hover:text-teal-400">
                  <Phone className="w-4 h-4" />
                  {!isMobile && <span>Emergency</span>}
                </button>
              </div>
              {!isMobile && (
                <span className="text-xs">Press Enter to send</span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
