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
        className="fixed bottom-8 right-8 z-[9999] w-16 h-16 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-all duration-300 group"
        aria-label="Open MedCare Assistant"
      >
        {isOpen ? (
          <X className="w-8 h-8" />
        ) : (
          <>
            <MessageCircle className="w-8 h-8" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 z-[9998] w-96 h-[620px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/25 rounded-full flex items-center justify-center">
                  <Heart className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">MedCare Assistant</h3>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Online • 24/7 Support</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition"
                aria-label="Close chat"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="px-5 py-3 bg-teal-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4" />
                <span>Avg. response: &lt; 1 min</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Stethoscope className="w-4 h-4" />
                <span>Patient Services</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-900">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-5 py-4 rounded-2xl shadow-sm ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-br-none"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-teal-600 dark:text-teal-300" />
                      </div>
                      <span className="text-sm font-medium text-teal-600 dark:text-teal-300">
                        MedCare Assistant
                      </span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
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

          {/* Quick Actions */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Common Questions
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {quickReplies.slice(0, 6).map((reply, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(reply)}
                  className="px-3 py-2 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 hover:from-teal-100 hover:to-blue-100 dark:hover:from-gray-600 dark:hover:to-gray-700 border border-teal-200 dark:border-gray-600 rounded-lg text-xs text-gray-700 dark:text-gray-300 transition-all hover:scale-[1.02]"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-5 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask about appointments, reports, billing..."
                className="flex-1 px-5 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className={`px-5 py-3 rounded-full font-medium transition-all ${
                  input.trim()
                    ? "bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:opacity-90 shadow-lg"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <button className="hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment</span>
                </button>
                <button className="hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  <span>View Reports</span>
                </button>
                <button className="hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span>Emergency</span>
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
