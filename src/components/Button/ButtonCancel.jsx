import { Button } from "@mui/material";
import React from "react";

const ButtonCancel = ({ handleClose }) => {
  return (
    <Button
      style={{ backgroundColor: "#636C74", color: "white" }}
      onClick={handleClose}
      variant="contained"
    >
      Cancel
    </Button>
  );
};

export default ButtonCancel;
