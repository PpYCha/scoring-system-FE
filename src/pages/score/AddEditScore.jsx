import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import ButtonCancel from "../../components/Button/ButtonCancel";
import ButtonSave from "../../components/Button/ButtonSave";
import * as Yup from "yup";

import dayjs from "dayjs";
import TextfieldComponent from "../../components/TextFieldComponent";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { storeEvent } from "../../api/eventController";
import Swal from "sweetalert2";
import { formatDatePicker } from "../../utils/formatter";
import { indexContestants } from "../../api/contestantController";
import { indexCategories } from "../../api/categoryController";

import { indexScores } from "../../api/scoreController";
import { useReactToPrint } from "react-to-print";
import { useValue } from "../../context/ContextProvider";
import actionHelper from "../../context/actionHelper";

const AddEditScore = ({ openEvent, handleCloseEvent }) => {
  const [startDate, setStartDate] = useState(dayjs());
  const [contestants, setContestants] = useState([{}]);
  const [categories, setCategories] = useState([]);

  const tableRef = useRef();

  const {
    state: { loading },
    dispatch,
  } = useValue();

  const actions = actionHelper();

  useEffect(() => {
    // fetch();
  }, []);

  const fetch = async () => {
    // dispatch({ type: actions.START_LOADING });
    const [resContestant, resCategories, resScore] = await Promise.all([
      indexContestants(),
      indexCategories(),
      indexScores(),
    ]);

    console.log(resContestant);

    const combinedData = resContestant.map((contestant) => {
      const scores = resScore.filter(
        (score) => score.contestant_id === contestant.id
      );
      return { ...contestant, scores };
    });

    console.log(combinedData);

    setContestants(resContestant);
    setCategories(resCategories);
    // dispatch({ type: actions.END_LOADING });
  };

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  return (
    <>
      {loading ? null : (
        <Dialog open={openEvent} fullWidth={true} maxWidth="lg">
          <DialogContent>
            <TableContainer component={Paper} ref={tableRef}>
              <Table
                sx={{ minWidth: 700, fontSize: "0.8rem", padding: "8px" }}
                aria-label="spanning table"
                size="small"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Contestant</TableCell>
                    {categories.map((item) => (
                      <TableCell key={item.id} align="left">
                        {item.category}
                      </TableCell>
                    ))}
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contestants.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell align="left">{item.name}</TableCell>
                      {categories.map((items, index) => (
                        <TableCell key={index} align="left">
                          80 {index}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <DialogActions>
              <Button onClick={handlePrint} variant="contained">
                Print
              </Button>
              <ButtonCancel handleClose={handleCloseEvent} />
            </DialogActions>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default AddEditScore;
