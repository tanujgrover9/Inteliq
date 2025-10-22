// src/pages/NewChatScreen.tsx
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import QuickCard from "../components/QuickCard";
import MessageInput from "../components/MessageInput";
import { useChatStore } from "../store/chatStore";

const quicks = [
  {
    title: "Give me a concise summary of this meeting transcript",
    subtitle: "",
  },
  {
    title: "Write a product description for a minimalist smartwatch",
    subtitle: "",
  },
  {
    title: "Provide a polite response to a customer asking for a refund",
    subtitle: "",
  },
];

const NewChatScreen: React.FC = () => {
  const send = useChatStore((s) => s.sendMessage);

  function onQuickClick(text: string) {
    send(text, []);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          px: { xs: 2, sm: 4, md: "144px" },
          pt: { xs: 4, sm: 6, md: "58px" },
          pb: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, mb: 2, fontSize: { xs: 12, sm: 14, md: 18 } }}
        >
          👋🏼 Hi Laurence!
        </Typography>
        <Typography
          variant="h5"
          sx={{ mb: 3, fontSize: { xs: 16, sm: 22, md: 28 } }}
        >
          What do you want to <br />
          learn today?
        </Typography>

        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {quicks.map((q) => (
            <Grid item xs={12} sm={6} md={4} key={q.title}>
              <QuickCard
                title={q.title}
                subtitle={q.subtitle}
                onClick={() => onQuickClick(q.title)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mt: "auto" }}>
        <MessageInput />
      </Box>
    </Box>
  );
};

export default NewChatScreen;
