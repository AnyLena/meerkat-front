export const inputStyle = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "var(--primary-color) !important",
    },
  },
  "& .MuiInputLabel-root": {
    "&.Mui-focused": {
      color: "var(--primary-color) !important",
    },
  },
};

export const buttonStyle = {
  color: "white",
  backgroundColor: "var(--primary-color)",
  "&:hover": {
    backgroundColor: "var(--secondary-color)",
  },
  "&:disabled": {
    backgroundColor: "lightgrey",
  },
};
