import React, { useMemo, useState, useEffect } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  InputBase,
  Typography,
  Tooltip,
  IconButton,
  ListItemIcon,
  Avatar,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

import { useChatStore } from "../store/chatStore";
import type { Conversation } from "../types";

// Local icons
import LogoIcon from "../assets/icons/Group 5.png";
import HomeIcon from "../assets/icons/chat-bubble-oval-left-ellipsis.png";
import LibraryIcon from "../assets/icons/folder.png";
import HistoryIcon from "../assets/icons/clock.png";
import ExploreIcon from "../assets/icons/globe-europe-africa.png";
import SearchIcon from "../assets/icons/magnifying-glass.png";
import SettingsIcon from "../assets/icons/chevron-up-down.png";
import RocketIcon from "../assets/icons/Group 13.png";
import UserAvatar from "../assets/icons/Picture.png";

const Sidebar: React.FC<{ onSelectConversation: (id: string) => void }> = ({
  onSelectConversation,
}) => {
  const convs = useChatStore((s) => s.conversations);
  const activeId = useChatStore((s) => s.activeConversationId);
  const deleteConversation = useChatStore((s) => s.deleteConversation);
  const updateConversationTitle = useChatStore(
    (s) => s.updateConversationTitle
  );

  // ✅ Sidebar open by default
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");

  const handleToggleCollapse = () => setCollapsed((prev) => !prev);

  // Filter chats based on search
  const filtered = useMemo(() => {
    if (!search.trim()) return convs;
    const q = search.toLowerCase();
    return convs.filter(
      (c) =>
        c.title?.toLowerCase().includes(q) ||
        c.messages.some((m) => m.text.toLowerCase().includes(q))
    );
  }, [convs, search]);

  const visibleChats = showAll ? filtered : filtered.slice(0, 4);
  const hasMore = filtered.length > 4;

  // Auto-update conversation title
  useEffect(() => {
    convs.forEach((c) => {
      if (c.messages.length && (!c.title || c.title === "New Chat")) {
        const firstUserMessage = c.messages.find((m) => m.role === "user");
        if (firstUserMessage) {
          const words = firstUserMessage.text.split(" ");
          const title =
            words.slice(0, 6).join(" ") + (words.length > 6 ? "..." : "");
          updateConversationTitle(c.id, title);
        }
      }
    });
  }, [convs, updateConversationTitle]);

  const navItems = [
    { icon: HomeIcon, label: "Home", shortcut: "⌘H" },
    { icon: LibraryIcon, label: "Library", shortcut: "⌘T" },
    { icon: HistoryIcon, label: "History", shortcut: "⌘G" },
    { icon: ExploreIcon, label: "Explore", shortcut: "⌘L" },
  ];

  const getConversationLabel = (c: Conversation) => c.title || "New Chat";

  return (
    <Box
      sx={{
        width: { xs: collapsed ? 100 : 240, sm: collapsed ? 120 : 280 },
        background: "#f2f4f8ff",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s ease",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        
      }}
    >
      {/* Collapse Toggle Button */}
      <IconButton
        onClick={handleToggleCollapse}
        sx={{
          position: "absolute",
          top: 28,
          right: -6,
          background: "#dce1efff",
          color: "#4856eaff",
          zIndex: 10,
          borderTopLeftRadius: "20px",
          borderBottomLeftRadius: "20px",
          "&:hover": { background: "#c9d6f1ff" },
          width: 28,
          height: 28,
          transition: "all 0.3s ease",
        }}
        size="small"
      >
        <ChevronRightIcon
          fontSize="small"
          sx={{
            transition: "transform 0.3s ease",
            transform: collapsed ? "rotate(0deg)" : "rotate(180deg)",
          }}
        />
      </IconButton>

      {/* Logo */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          gap: 1,
          p: 2,
          transition: "all 0.3s ease",
        }}
      >
        <Box
          component="img"
          src={LogoIcon}
          alt="Inteliq"
          sx={{ width: 36, height: 36 }}
        />
        {!collapsed && (
          <Typography sx={{ fontWeight: 700, fontSize: 26 }}>
            Inteliq
          </Typography>
        )}
      </Box>

      {/* Search */}
      <Box sx={{ px: 2, pb: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            borderRadius: 4,
            bgcolor: collapsed ? "transparent" : "#fff",
            border: collapsed ? "1px solid transparent" : "1px solid #e5e7eb",
            px: 1.2,
            py: 0.5,
            transition: "all 0.25s ease",
          }}
        >
          <Box
            component="img"
            src={SearchIcon}
            alt="search"
            width={22}
            height={22}
          />
          {!collapsed && (
            <InputBase
              placeholder="Search for chats..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ width: "100%" }}
            />
          )}
        </Box>
      </Box>

      {/* Navigation */}
      <List sx={{ px: collapsed ? 0.5 : 1 }}>
        {navItems.map((item) => {
          const isActive = activeNav === item.label;
          return (
            <Tooltip
              key={item.label}
              title={collapsed ? `${item.label} (${item.shortcut})` : ""}
              placement="right"
            >
              <ListItemButton
                onClick={() => setActiveNav(item.label)}
                sx={{
                  borderRadius: 4,
                  py: 0.45,
                  px: collapsed ? 1.2 : 2,
                  mb: 1,
                  justifyContent: collapsed ? "center" : "flex-start",
                  backgroundColor: !collapsed && isActive ? "#fff" : "transparent",
                  border: !collapsed && isActive ? "1px solid #E0E0E0" : "1px solid transparent",
                  boxShadow: !collapsed && isActive ? "0 1px 3px rgba(0,0,0,0.05)" : "none",
                  transition: "all 0.25s ease",
                }}
              >
                <ListItemIcon
                  sx={{ minWidth: 0, justifyContent: "center", px: 0.75 }}
                >
                  <Box
                    component="img"
                    src={item.icon}
                    alt={item.label}
                    width={22}
                    height={22}
                  />
                </ListItemIcon>

                {!collapsed && (
                  <>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 12,
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? "#000" : "#4b5563",
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        ml: "auto",
                        backgroundColor: "#F3F3F3",
                        color: "#000",
                        fontSize: 12,
                        fontWeight: 500,
                        p: 0.75,
                        borderRadius: "10px",
                      }}
                    >
                      {item.shortcut}
                    </Typography>
                  </>
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>

      {/* Recent Chats */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 1,
          opacity: collapsed ? 0 : 1,
          pointerEvents: collapsed ? "none" : "auto",
          transition: "opacity 0.25s ease",
        }}
      >
        <Typography
          variant="caption"
          sx={{ px: 2, mb: 1, color: "#6b7280", display: "block" }}
        >
          Recent Chats
        </Typography>

        <List disablePadding>
          {visibleChats.map((c) => (
            <ListItemButton
              key={c.id}
              selected={c.id === activeId}
              onClick={() => onSelectConversation(c.id)}
              sx={{
                borderRadius: 2,
                px: collapsed ? 1 : 2,
                py: 0.75,
                mb: 0.5,
                justifyContent: collapsed ? "center" : "flex-start",
                "&:hover .delete-icon": { opacity: 1 },
              }}
            >
              <ListItemText
                primary={getConversationLabel(c)}
                primaryTypographyProps={{
                  noWrap: true,
                  fontSize: 10,
                  fontWeight: 500,
                }}
              />
              {!collapsed && (
                <IconButton
                  className="delete-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation(c.id);
                  }}
                  sx={{
                    position: "absolute",
                    right: 8,
                    opacity: 0,
                    transition: "opacity 0.2s",
                    color: "#9ca3af",
                    "&:hover": { color: "#ef4444" },
                  }}
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </ListItemButton>
          ))}
        </List>

        {hasMore && !showAll && (
          <Box sx={{ textAlign: "center", mt: 1 }}>
            <Typography
              variant="body2"
              sx={{
                color: "#2563eb",
                cursor: "pointer",
                fontWeight: 500,
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => setShowAll(true)}
            >
              View All
            </Typography>
          </Box>
        )}
      </Box>

      {/* Try Pro Section */}
      {!collapsed && (
        <Box
          sx={{
            p: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
            borderTop: "1px solid #e5e7eb",
            background:
              "conic-gradient(from 154.61deg at 80.43% -12.04%, #D9E4FF -93.6deg, #F8F9FC 42.55deg, #FFDDF8 157.8deg, #D9E4FF 266.4deg, #F8F9FC 402.55deg)",
            borderRadius: 2,
            mx: 2,
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 700 }}>Try Pro</Typography>
            <Typography variant="caption" color="textSecondary">
              Upgrade for smarter AI & more
            </Typography>
          </Box>
          <Box component="img" src={RocketIcon} alt="Pro" width={22} height={22} />
        </Box>
      )}

      {/* User Section */}
      <Box
        sx={{
          p: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          bgcolor: collapsed ? "transparent" : "#fff",
          mt: 2,
          mx: 1.5,
          borderRadius: 2,
          mb: 1,
        }}
      >
        <Avatar src={UserAvatar} sx={{ width: 36, height: 36 }} />
        {!collapsed && <Typography sx={{ fontWeight: 600 }}>Lawrence Cruz</Typography>}
        {!collapsed && (
          <IconButton size="small">
            <Box component="img" src={SettingsIcon} alt="settings" width={18} height={18} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
