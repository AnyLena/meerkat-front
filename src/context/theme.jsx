import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "var(--body-font)",
  },
  components: {
    MuiPickersDay: {
      styleOverrides: {
        daySelected: {
          backgroundColor: "var(--secondary-color)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--primary-color) !important",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "var(--primary-color) !important",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "white",
          backgroundColor: "var(--primary-color)", // Replace with your desired color
          "&:hover": {
            backgroundColor: "var(--secondary-color)", // Replace with your desired hover color
          },
          "&:disabled": {
            backgroundColor: "lightgrey", // Replace with your desired disabled color
          },
        },
      },
    },
  },
});