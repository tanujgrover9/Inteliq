export type Role = "user" | "assistant" | "system";

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  dataUrl?: string; 
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  createdAt: number;
  attachments?: Attachment[];
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}
