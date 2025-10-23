import React, { createContext, useContext, useEffect, useState } from "react";
import type { Message } from "../types";
import { v4 as uuid } from "uuid";
import { saveMessages, loadMessages } from "../utils/storage";

interface ChatContextValue {
  messages: Message[];
  sendUserMessage: (text: string) => void;
  clearMessages: () => void;
  isIdle: boolean;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

const PLACEHOLDER_REPLY =
  "Thanks — got your message! This is a placeholder assistant reply.";

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const loaded = loadMessages();
    if (loaded.length) return loaded;
    return [
      {
        id: uuid(),
        role: "assistant",
        text: "Hi! What do you want to learn today?",
        createdAt: Date.now(),
      },
    ];
  });

  const [isIdle, setIsIdle] = useState(true);

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  function sendUserMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: uuid(),
      role: "user",
      text,
      createdAt: Date.now(),
    };
    setMessages((m) => [...m, userMsg]);

    setIsIdle(false);

    setTimeout(() => {
      const assistant: Message = {
        id: uuid(),
        role: "assistant",
        text: PLACEHOLDER_REPLY,
        createdAt: Date.now(),
      };
      setMessages((m) => [...m, assistant]);
      setIsIdle(true);
    }, 700 + Math.round(Math.random() * 600));
  }

  function clearMessages() {
    setMessages([]);
  }

  return (
    <ChatContext.Provider
      value={{ messages, sendUserMessage, clearMessages, isIdle }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside ChatProvider");
  return ctx;
}
