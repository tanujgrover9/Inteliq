import type { Conversation } from "../types";

const KEY = "chat_app_conversations_v1";

export function saveAll(conversations: Conversation[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(conversations));
  } catch (e) {
    console.warn("Could not save conversations", e);
  }
}

export function loadAll(): Conversation[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Conversation[];
  } catch {
    return [];
  }
}
