import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { useValue } from "../../context/ContextProvider";
import actionHelper from "../../context/actionHelper";

import { indexContestants } from "../../api/contestantController";
import { Formik, Form } from "formik";

const Judge = () => {
  const [contestantList, setContestantList] = useState([{}]);

  const {
    state: { loading },
    dispatch,
  } = useValue();

  const actions = actionHelper();

  useEffect(() => {
    fetchContestant();
  }, []);

  const fetchContestant = async () => {
    const res = await indexContestants();
    console.log(res);
    setContestantList(res);
  };

  return (
    <Box display="flex" flexDirection="column">
      <Paper elevation={3}>
        <Formik>
          <Form>
            <Stack
              direction="row"
              spacing={2}
              m={3}
              justifyContent="space-between"
            >
              <Typography variant="h5">Contestant</Typography>
            </Stack>
            <Box m={2}>
              {contestantList.map((item, index) => {
                return (
                  <Box key={index}>
                    <Typography>{item.name}</Typography>
                  </Box>
                );
              })}
            </Box>

            <Button type="submit " title="Submit" />
          </Form>
        </Formik>
      </Paper>
    </Box>
  );
};

export default Judge;
