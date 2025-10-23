import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  const handleSelectConversation = (id: string) => {
    console.log("Selected conversation:", id);
  };

  return (
    <Box
      display="flex"
      height="100vh"
      sx={{
        backgroundColor: "#fff",
      }}
      className="app-frame"
    >
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={handleToggleCollapse}
        onSelectConversation={handleSelectConversation}
      />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "#ffffff",
          overflow: "hidden",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
