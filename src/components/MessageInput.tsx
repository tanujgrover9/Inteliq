/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  Badge,
  CircularProgress,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SendIcon from "@mui/icons-material/Send";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { v4 as uuid } from "uuid";
import { useDropzone } from "react-dropzone";
import { useChatStore } from "../store/chatStore";
import type { Attachment } from "../types";

const MessageInput: React.FC = () => {
  const [value, setValue] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const send = useChatStore((s) => s.sendMessage);
  const activeId = useChatStore((s) => s.activeConversationId);
  const startNewConversation = useChatStore((s) => s.startNewConversation);
  const textareaRef = useRef<HTMLInputElement | null>(null);

  const MAX_MEDIA = 1000;

  useEffect(() => {
    if (!activeId) startNewConversation();
  }, [activeId, startNewConversation]);

  const simulateUpload = (files: File[]) => {
    setUploadProgress(0);
    let progress = 0;

    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setUploadProgress(null);
      }
    }, 150);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    simulateUpload(acceptedFiles);

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setAttachments((prev) => [
          ...prev,
          {
            id: uuid(),
            name: file.name,
            size: file.size,
            type: file.type,
            dataUrl:
              typeof reader.result === "string" ? reader.result : undefined,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });

  const handleSend = () => {
    if (!value.trim() && attachments.length === 0) return;
    send(value, attachments);
    setValue("");
    setAttachments([]);
  };

  const removeAttachment = (id: string) =>
    setAttachments((a) => a.filter((x) => x.id !== id));

  return (
    <Box
      {...getRootProps()}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
       
        py: 2,
        px: 1,
        position: "sticky",
        bottom: 0,
        zIndex: 5,
      }}
    >
      <input {...getInputProps()} />

      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: "1.5rem",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          p: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          width: "100%",
          maxWidth: "800px", 
        }}
      >
        <TextField
          variant="standard"
          placeholder="Ask me a question..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          multiline
          maxRows={6}
          fullWidth
          InputProps={{
            disableUnderline: true,
          }}
          sx={{
            "& .MuiInputBase-root": {
              fontSize: "0.95rem",
            },
            "& textarea": {
              resize: "none",
            },
            borderRadius: "1rem",
            border: "1px solid #e5e7eb",
            p: 1,
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 0.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{ position: "relative" }}>
              <Badge
                badgeContent={attachments.length}
                color="primary"
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: "0.65rem",
                    height: 16,
                    minWidth: 16,
                  },
                }}
              >
                <IconButton
                  component="label"
                  size="small"
                  sx={{
                    bgcolor: "#f3f4f6",
                    color: "#6b7280",
                    "&:hover": { bgcolor: "#e5e7eb" },
                    position: "relative",
                  }}
                >
                  <AttachFileIcon fontSize="small" />
                  <input
                    hidden
                    type="file"
                    multiple
                    onChange={(ev) => {
                      const files = ev.target.files
                        ? Array.from(ev.target.files)
                        : [];
                      onDrop(files);
                      ev.currentTarget.value = "";
                    }}
                  />
                </IconButton>
              </Badge>

              {uploadProgress !== null && (
                <CircularProgress
                  variant="determinate"
                  value={uploadProgress}
                  size={30}
                  thickness={4}
                  sx={{
                    color: "#3b82f6",
                    position: "absolute",
                    top: -4,
                    left: -4,
                    zIndex: 2,
                    opacity: 0.8,
                  }}
                />
              )}
            </Box>

            <IconButton
              size="small"
              sx={{
                bgcolor: "#f3f4f6",
                color: "#6b7280",
                "&:hover": { bgcolor: "#e5e7eb" },
              }}
            >
              <CameraAltIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="body2"
              sx={{
                color: "#6b7280",
                fontSize: "0.75rem",
              }}
            >
              {attachments.length} / {MAX_MEDIA}
            </Typography>

            <IconButton
              onClick={handleSend}
              disabled={!value.trim() && attachments.length === 0}
              sx={{
                bgcolor: "#2563eb",
                color: "#fff",
                "&:hover": { bgcolor: "#1d4ed8" },
                width: 36,
                height: 36,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <SendIcon sx={{ fontSize: "1rem" }} />
            </IconButton>
          </Box>
        </Box>

        {attachments.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              mt: 1,
            }}
          >
            {attachments.map((a) => (
              <Box
                key={a.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: 1,
                  px: 1,
                  py: 0.3,
                  fontSize: "0.8rem",
                  color: "#374151",
                  gap: 0.5,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    maxWidth: 120,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {a.name}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => removeAttachment(a.id)}
                  sx={{
                    p: 0.2,
                    color: "#9ca3af",
                    "&:hover": { color: "#ef4444" },
                  }}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {isDragActive && (
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            mt: 1,
            color: "#2563eb",
            fontWeight: 500,
          }}
        >
          Drop files here to attach
        </Typography>
      )}
    </Box>
  );
};

export default MessageInput;
