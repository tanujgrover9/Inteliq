import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import chatGPT from "../assets/icons/images (10) (1).png";

interface Props {
  onNewChat: () => void;
  onToggleSidebar?: () => void;
}

const Header: React.FC<Props> = ({ onNewChat }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [, setModel] = useState("GPT-4o mini");
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (modelName?: string) => {
    if (modelName) setModel(modelName);
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: "1px solid #eceff4",
        backgroundColor: "#ffffff",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 1.5, sm: 3, md: 4 },
          minHeight: { xs: 60, sm: 72 },
        }}
      >
        {/* Left: ChatGPT model selector */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Button
            onClick={handleMenuOpen}
            endIcon={<ArrowDropDownIcon />}
            sx={{
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              color: "#111827",
              fontWeight: 500,
              fontSize: { xs: 13, sm: 14 },
              gap: 1,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Box
              component="img"
              src={chatGPT}
              alt="ChatGPT"
              sx={{
                width: 22,
                height: 22,
                borderRadius: "4px",
              }}
            />
            ChatGPT
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleMenuClose()}
            PaperProps={{
              elevation: 3,
              sx: {
                borderRadius: 2,
                mt: 1,
                minWidth: 160,
              },
            }}
          >
            <MenuItem onClick={() => handleMenuClose("GPT-4o mini")}>
              GPT-4o mini
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose("GPT-4o")}>GPT-4o</MenuItem>
            <MenuItem onClick={() => handleMenuClose("GPT-4")}>GPT-4</MenuItem>
          </Menu>
        </Box>

        {/* Right: Icons + New Chat button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1.5 },
          }}
        >
          <Tooltip title="Share" arrow>
            <IconButton
              size="medium"
              sx={{
                color: "#374151",
                "&:hover": { color: "#2563eb", backgroundColor: "#f3f4f6" },
              }}
            >
              <ShareOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Help" arrow>
            <IconButton
              size="medium"
              sx={{
                color: "#374151",
                "&:hover": { color: "#2563eb", backgroundColor: "#f3f4f6" },
              }}
            >
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onNewChat}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "9999px",
              px: { xs: 2, sm: 2.5 },
              py: { xs: 0.5, sm: 0.75 },
              fontSize: { xs: 13, sm: 14 },
              background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
              boxShadow: "0 2px 6px rgba(59,130,246,0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
                boxShadow: "0 4px 10px rgba(59,130,246,0.35)",
              },
            }}
          >
            New Chat
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
