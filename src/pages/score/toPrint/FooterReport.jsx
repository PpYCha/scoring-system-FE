import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { judges } from "../../../assets/data";

const FooterReport = () => {
  return (
    <Box mt={2} p={1}>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={1}
      >
        <Typography sx={{ fontWeight: "bold" }}>Judges:</Typography>
        <Grid container>
          {judges.map((item, index) => (
            <Grid item mb={2} key={item.id} md={3}>
              <Typography>{item.name}</Typography>
            </Grid>
          ))}
        </Grid>
      </Stack>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={1}
      >
        <Typography sx={{ fontWeight: "bold" }}>Tabulator:</Typography>
        <Grid container>
          {judges.map((item, index) => (
            <Grid item mb={2} key={item.id} md={3}>
              <Typography>{item.name}</Typography>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};

export default FooterReport;
