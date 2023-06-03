import { Save, Send } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import React from "react";
import { useValue } from "../../context/ContextProvider";

const ButtonSave = () => {
  const {
    state: { loading },
  } = useValue();

  return (
    // <Button
    //   color="success"
    //   type="submit"
    //   variant="contained"
    //   startIcon={<Save />}
    //   size="small"
    // >
    //   Save
    // </Button>

    <LoadingButton
      size="small"
      type="submit"
      startIcon={<Save />}
      loading={loading}
      color="success"
      loadingPosition="start"
      variant="contained"
    >
      <span>Save</span>
    </LoadingButton>
  );
};

export default ButtonSave;
