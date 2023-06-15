import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import mutyaLogo2023 from "../../assets/logo/mutyaLogo2023-removebg-preview.png";
import ibabaoFestivalLogo from "../../assets/logo/ibabaoFestivalLogo.jpg";

const HeaderReport = ({ children }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      spacing={2}
    >
      <img src={mutyaLogo2023} alt="mutya" width="90" height="90" />

      <Box sx={{ textAlign: "center" }}>{children}</Box>
      <img src={ibabaoFestivalLogo} alt="mutya" width="90" height="90" />
    </Stack>
  );
};

export default HeaderReport;
