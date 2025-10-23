import type { Conversation, Message } from "../types";

const KEY = "chat_app_conversations_v1";

/** Save all conversations */
export function saveAll(conversations: Conversation[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(conversations));
  } catch (e) {
    console.warn("Could not save conversations", e);
  }
}

/** Load all conversations */
export function loadAll(): Conversation[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Conversation[];
  } catch {
    return [];
  }
}

/** ✅ Save just the messages (wraps them inside a single conversation) */
export function saveMessages(messages: Message[]) {
  const conversation: Conversation = {
    id: "default",
    title: "Main Chat",
    messages,
    updatedAt: Date.now(),
    createdAt: 0
  };
  saveAll([conversation]);
}

/** ✅ Load just the messages (reads from first stored conversation) */
export function loadMessages(): Message[] {
  const conversations = loadAll();
  if (conversations.length && conversations[0].messages) {
    return conversations[0].messages;
  }
  return [];
}
