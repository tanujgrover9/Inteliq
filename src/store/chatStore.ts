/* eslint-disable @typescript-eslint/no-explicit-any */

import create from "zustand";
import type { Conversation, Message } from "../types";
import { v4 as uuid } from "uuid";
import { saveAll, loadAll } from "../utils/storage";

interface ChatState {
  conversations: Conversation[];
  activeConversationId?: string;
  init: () => void;
  startNewConversation: (title?: string) => void;
  sendMessage: (text: string, attachments?: any[]) => void;
  receiveAssistantReply: (replyText: string) => void;
  loadConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  updateConversationTitle: (id: string, title: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: [],
  activeConversationId: undefined,

  init: () => {
    const saved = loadAll();
    if (saved.length) {
      set({
        conversations: saved,
        activeConversationId: saved[0].id,
      });
    } else {
      const id = uuid();
      const welcomeMsg: Message = {
        id: uuid(),
        role: "assistant",
        text: "Hi! What do you want to learn today?",
        createdAt: Date.now(),
      };
      const conv: Conversation = {
        id,
        title: "New Chat",
        messages: [welcomeMsg],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      set({ conversations: [conv], activeConversationId: id });
      saveAll([conv]);
    }
  },

  startNewConversation: (title?: string) => {
    const id = uuid();
    const welcomeMsg: Message = {
      id: uuid(),
      role: "assistant",
      text: "Hi! What do you want to learn today?",
      createdAt: Date.now(),
    };
    const conv: Conversation = {
      id,
      title: title ?? "New Chat",
      messages: [welcomeMsg],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const convs = [conv, ...get().conversations];
    set({ conversations: convs, activeConversationId: id });
    saveAll(convs);
  },

  sendMessage: (text: string, attachments = []) => {
    if (!text.trim() && attachments.length === 0) return;

    if (!get().activeConversationId) {
      get().startNewConversation();
    }

    const { conversations, activeConversationId } = get();
    if (!activeConversationId) return;

    const newMessage: Message = {
      id: uuid(),
      role: "user",
      text,
      attachments,
      createdAt: Date.now(),
    };

    const convs = conversations.map((c) => {
      if (c.id !== activeConversationId) return c;
      return { ...c, messages: [...c.messages, newMessage], updatedAt: Date.now() };
    });

    set({ conversations: convs });
    saveAll(convs);

    setTimeout(() => {
      get().receiveAssistantReply("Thanks — got your message! This is a placeholder assistant reply.");
    }, 800 + Math.random() * 600);
  },

  receiveAssistantReply: (replyText: string) => {
    const { conversations, activeConversationId } = get();
    if (!activeConversationId) return;

    const assistantMsg: Message = {
      id: uuid(),
      role: "assistant",
      text: replyText,
      createdAt: Date.now(),
    };

    const convs = conversations.map((c) => {
      if (c.id !== activeConversationId) return c;
      return { ...c, messages: [...c.messages, assistantMsg], updatedAt: Date.now() };
    });

    set({ conversations: convs });
    saveAll(convs);
  },

  loadConversation: (id: string) => {
    set({ activeConversationId: id });
  },

  deleteConversation: (id: string) => {
    let convs = get().conversations.filter((c) => c.id !== id);

    if (convs.length === 0) {
      const newId = uuid();
      const welcomeMsg: Message = {
        id: uuid(),
        role: "assistant",
        text: "Hi! What do you want to learn today?",
        createdAt: Date.now(),
      };
      const newConv: Conversation = {
        id: newId,
        title: "New Chat",
        messages: [welcomeMsg],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      convs = [newConv];
      set({ conversations: convs, activeConversationId: newId });
      saveAll(convs);
      return;
    }

    const newActive = convs[0].id;
    set({ conversations: convs, activeConversationId: newActive });
    saveAll(convs);
  },

  updateConversationTitle: (id: string, title: string) => {
    const convs = get().conversations.map((c) => (c.id === id ? { ...c, title } : c));
    set({ conversations: convs });
    saveAll(convs);
  },
}));
