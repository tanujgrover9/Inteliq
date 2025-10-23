import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NewChatScreen from "./pages/NewChatScreen";
import ActiveChatScreen from "./pages/ActiveChatScreen";
import { useChatStore } from "./store/chatStore";

const App: React.FC = () => {
  const init = useChatStore((s) => s.init);
  const startNew = useChatStore((s) => s.startNewConversation);
  const loadConversation = useChatStore((s) => s.loadConversation);
  const activeId = useChatStore((s) => s.activeConversationId);
  const convs = useChatStore((s) => s.conversations);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (!activeId && convs.length) {
      loadConversation(convs[0].id);
    }
  }, [convs, activeId, loadConversation]);

  function onSelectConversation(id: string) {
    loadConversation(id);
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f7f8fa",
      }}
    >
      
      <Sidebar
        collapsed={sidebarCollapsed}
        onSelectConversation={onSelectConversation}
        onToggleCollapse={() => setSidebarCollapsed((s) => !s)}
      />

     
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "#fff",
          borderRadius: "16px",
          mt: 2, 
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          overflow: "hidden",
          transition: "margin 0.3s ease",
        }}
      >
        <Header
          onNewChat={() => startNew()}
          onToggleSidebar={() => setSidebarCollapsed((s) => !s)}
        />

        <Box sx={{ flex: 1, overflowY: "auto" }}>
          {activeId ? (
            (() => {
              const active = convs.find((c) => c.id === activeId);
              if (!active) return <NewChatScreen />;
              const hasUser = active.messages.some((m) => m.role === "user");
              return hasUser ? <ActiveChatScreen /> : <NewChatScreen />;
            })()
          ) : (
            <NewChatScreen />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default App;
