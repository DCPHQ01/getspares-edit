"use client";
import { Button, createTheme, IconButton, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";

const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableTouchRipple: true,
      },
    },
  },
});

interface ReusableButtonProps {
  onClick: () => void;
  color: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  text: string;
  backgroundColor: string;
  width: string;
}
export default function ReusableButton({
  onClick,
  color,
  leftIcon,
  rightIcon,
  text,
  backgroundColor,
  width,
}: ReusableButtonProps) {
  return (
    <ThemeProvider theme={theme}>
      <Button
        disableRipple
        className="rounded-full"
        variant="contained"
        onClick={onClick}
        sx={{
          position: "relative",
          width: { width }, // Responsive width based on breakpoints
          color: color,
          backgroundColor: backgroundColor,
          "&:hover": {
            backgroundColor: "mecaIconSuccessColor",
          },
        }}
      >
        {leftIcon && (
          <IconButton
            sx={{
              marginRight: 1,
              position: "absolute",
              left: 1,
              color: "white",
            }}
            aria-label="left icon"
          >
            {leftIcon}
          </IconButton>
        )}
        {text}
        {rightIcon && (
          <IconButton
            sx={{
              marginLeft: 1,
              position: "absolute",
              right: 1,
              color: "white",
            }}
            aria-label="right icon"
          >
            {rightIcon}
          </IconButton>
        )}
      </Button>
    </ThemeProvider>
  );
}
