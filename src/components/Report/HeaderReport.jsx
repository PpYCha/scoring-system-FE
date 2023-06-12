import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import mutyaLogo2023 from "../../assets/logo/mutyaLogo2023.jpg";
import ibabaoFestivalLogo from "../../assets/logo/ibabaoFestivalLogo.jpg";

const HeaderReport = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      spacing={2}
      mb={1}
    >
      <img src={mutyaLogo2023} alt="mutya" width="150" height="150" />

      <Box sx={{ textAlign: "center" }}>
        {/* <Typography variant="subtitle1" mb={-1}>
          Republic of the Philippines
        </Typography>
        <Typography variant="subtitle1" mb={-1}>
          Province of Northern Samar
        </Typography>
        <Typography variant="subtitle1" mb={-1}>
          Provincial Tourism Office
        </Typography> */}
        <Typography variant="h6" mb={-1}>
          Mutya san Ibabao 2023
        </Typography>
        <Typography variant="h6" mb={-1}>
          Talent Competition Score
        </Typography>
      </Box>
      <img src={ibabaoFestivalLogo} alt="mutya" width="150" height="150" />
    </Stack>
  );
};

export default HeaderReport;
