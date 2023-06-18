import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { judges, tabulator } from "../../assets/data";

const FooterDynamicJudge = ({ judgeName }) => {
  return (
    <Grid container p={1}>
      <Grid item md={6}>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={1}
        >
          <Typography sx={{ fontWeight: "bold", ontSize: 9 }}>
            Judge:
          </Typography>

          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {/* {judgeName.map((item, index) => ( */}
            <Grid item container md={6}>
              <Grid md={12}>
                <Typography sx={{ fontWeight: "bold", fontSize: 11 }}>
                  {judgeName} _______________
                </Typography>
              </Grid>
              {/* <Grid md={4}>
                <Typography mt={-1} ml={-10}>
                  ____________
                </Typography>
              </Grid> */}
            </Grid>
            {/* // ))} */}
          </Grid>
        </Stack>
      </Grid>

      <Grid item md={6}>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={1}
        >
          <Typography sx={{ fontWeight: "bold", ontSize: 9 }}>
            Tabulators:
          </Typography>

          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {tabulator.map((item, index) => (
              <Grid item container md={6}>
                <Grid md={6}>
                  <Typography sx={{ fontWeight: "bold", fontSize: 11 }}>
                    {item.name}
                  </Typography>
                </Grid>
                <Grid md={6}>
                  <Typography mt={-1}>_______________</Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default FooterDynamicJudge;
