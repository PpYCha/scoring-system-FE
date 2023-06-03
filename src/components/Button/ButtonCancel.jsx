import { Cancel } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

const ButtonCancel = ({ handleClose }) => {
  return (
    <Button
      style={{ backgroundColor: "#636C74", color: "white" }}
      onClick={handleClose}
      variant="contained"
      startIcon={<Cancel />}
      size="small"
    >
      Cancel
    </Button>
  );
};

export default ButtonCancel;
