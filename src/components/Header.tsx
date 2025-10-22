/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const [model, setModel] = useState("GPT-4o mini");
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
          px: { xs: 1, sm: 3 },
        
        }}
      >
        {/* Model selector */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Button
            onClick={handleMenuOpen}
            endIcon={<ArrowDropDownIcon />}
            sx={{
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              color: "#111827",
              fontWeight: 700,
              fontSize: 17,
              gap: 1,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <img src={chatGPT} alt="ChatGPT" width={22} height={22} />
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
            <MenuItem onClick={() => handleMenuClose("GPT-4o")}>
              GPT-4o
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose("GPT-4")}>GPT-4</MenuItem>
          </Menu>
        </Box>

        {/* Action buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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
              px: 2.5,
              py: 0.75,
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
