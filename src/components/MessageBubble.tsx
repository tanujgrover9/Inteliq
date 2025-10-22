// src/components/MessageBubble.tsx
import React from "react";
import { Paper, Typography, Box, Chip } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import type { Message } from "../types";

const MessageBubble: React.FC<{ msg: Message }> = ({ msg }) => {
  const isUser = msg.role === "user";
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        my: 1,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: "78%",
          p: 1.25,
          background: isUser ? "#2b6ef6" : "#f5f7fb",
          color: isUser ? "#fff" : "#111827",
          borderRadius: 2,
        }}
      >
        <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
          {msg.text}
        </Typography>

        {msg.attachments?.length ? (
          <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
            {msg.attachments.map((a) => (
              <Chip
                key={a.id}
                label={a.name}
                onDelete={() => {}}
                deleteIcon={<DeleteOutlineIcon />}
                sx={{ background: isUser ? "rgba(255,255,255,0.08)" : "#fff" }}
              />
            ))}
          </Box>
        ) : null}

        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 0.6,
            color: isUser ? "rgba(255,255,255,0.8)" : "#6b7280",
            textAlign: "right",
          }}
        >
          {new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </Paper>
    </Box>
  );
};

export default MessageBubble;
