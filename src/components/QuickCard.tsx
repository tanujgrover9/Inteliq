import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import sparkel from "../assets/icons/sparkles.png";

interface Props {
  title: string;
  subtitle?: string;
  onClick?: () => void;
}

const QuickCard: React.FC<Props> = ({ title, subtitle, onClick }) => {
  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        width: { xs: "90%", sm: "90%", md: 220 }, 
        height: { xs: 180, sm: 210 },
        borderRadius: 4,
        border: "1px solid #e5e7eb",
        background:
          "conic-gradient(from 154.61deg at 80.43% -12.04%, #D9E4FF -93.6deg, #F8F9FC 42.55deg, #FFDDF8 157.8deg, #D9E4FF 266.4deg, #F8F9FC 402.55deg)",
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: { xs: 1, sm: 2 },
        boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
          borderColor: "#3b82f6",
        },
        "&:hover .sparkle-box": {
          backgroundColor: "#3b82f6",
        },
        "&:hover .sparkle-icon": {
          filter: "brightness(0) invert(1)",
        },
      }}
    >
      <Box
        className="sparkle-box"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 0.6, sm: 1 },
          backgroundColor: "#fff",
          width: { xs: 32, sm: 42 },
          height: { xs: 32, sm: 42 },
          borderRadius: "50%",
          boxShadow: "inset 0 0 6px rgba(59,130,246,0.1)",
          transition: "background-color 0.3s ease, transform 0.3s ease",
        }}
      >
        <img
          src={sparkel}
          alt="Sparkle"
          width={22}
          height={22}
          className="sparkle-icon"
          style={{ transition: "filter 0.3s ease" }}
        />
      </Box>

      <Box sx={{ p: { xs: 0.8, sm: 1.5 }, mt: "auto" }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            color: "#111827",
            lineHeight: 1.4,
            fontSize: { xs: 10, sm: 12 },
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="body2"
            sx={{
              color: "#6b7280",
              fontSize: { xs: 11, sm: 11.5 },
              mt: 0.5,
              lineHeight: 1.5,
              fontWeight: 100,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default QuickCard;
