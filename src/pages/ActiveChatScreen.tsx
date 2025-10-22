import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import MessageBubble from "../components/MessageBubble";
import MessageInput from "../components/MessageInput";
import { useChatStore } from "../store/chatStore";

const ActiveChatScreen: React.FC = () => {
  const conversations = useChatStore((s) => s.conversations);
  const activeId = useChatStore((s) => s.activeConversationId);
  const conv = conversations.find((c) => c.id === activeId);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight + 200;
    }
  }, [conv?.messages?.length]);

  if (!conv) {
    return <div />;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ p: 2, borderBottom: "1px solid #eceff4" }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {conv.title}
        </Typography>
      </Box>

      <Box sx={{ p: 2, flex: 1, overflow: "auto" }} ref={scrollerRef}>
        {conv.messages.map((m) => (
          <MessageBubble key={m.id} msg={m} />
        ))}
      </Box>

      <MessageInput />
    </Box>
  );
};

export default ActiveChatScreen;
