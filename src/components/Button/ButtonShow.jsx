import { Button } from "@mui/material";
import React from "react";

const ButtonShow = ({ bgColor, text, onClick }) => {
  return (
    <Button
      size="small"
      style={{ backgroundColor: bgColor, color: "white" }}
      onClick={onClick}
      variant="contained"
    >
      {text}
    </Button>
  );
};

export default ButtonShow;
