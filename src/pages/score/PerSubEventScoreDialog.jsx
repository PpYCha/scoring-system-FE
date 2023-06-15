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
  Typography,
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

import { indexContestantsEvents } from "../../api/contestantEventController";
import OverallReport from "./OverallReport";
import PerSubEventReport from "../../components/Report/PerSubEventReport";

const PerSubEventScoreDialog = ({ openEvent, handleCloseEvent }) => {
  const [categories, setCategories] = useState([{}]);
  const [contestants, setContestants] = useState([{}]);
  const [scores, setScores] = useState([{}]);
  const [open, setOpen] = useState(false);
  const tableRef = useRef();

  const {
    state: { loading, contestant },
    dispatch,
  } = useValue();

  const actions = actionHelper();

  useEffect(() => {
    fetch();
  }, [openEvent]);

  const fetch = async () => {
    // dispatch({ type: actions.START_LOADING });
    const [resContestant, resCategories, resScore] = await Promise.all([
      indexContestants(),
      indexCategories(),
      indexScores(),
    ]);

    const combinedData = resScore.reduce((acc, score) => {
      const judgeId = score.judge_id;

      if (!acc[judgeId]) {
        acc[judgeId] = {
          judge_id: judgeId,
          contestants: [],
        };
      }

      const contestant = resContestant.find(
        (contestant) => contestant.id === score.contestant_id
      );

      if (contestant) {
        acc[judgeId].contestants.push({
          contestant,
          score: score.score,
        });
      }

      return acc;
    }, {});

    const filteredCategories = resCategories.filter(
      (item) => item.subEvent_id === contestant.subEvent_id
    );

    setContestants(combinedData);
    setCategories(filteredCategories);

    // Use the grouped and scored data as needed
    // dispatch({ type: actions.END_LOADING });
  };

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  return (
    <>
      {loading ? null : (
        <Dialog open={openEvent} fullScreen>
          <DialogContent>
            <PerSubEventReport
              tableRef={tableRef}
              contestants={contestants}
              categories={categories}
              textHeader={
                <>
                  {/* <Typography variant="subtitle1" mb={-1}>
                    Republic of the Philippines
                  </Typography>
                  <Typography variant="subtitle1" mb={-1}>
                    Province of Northern Samar
                  </Typography>
                  <Typography variant="subtitle1" mb={-1}>
                    Provincial Tourism Office
                  </Typography>
                  <Typography variant="h6" mb={-1}>
                    Mutya san Ibabao 2023
                  </Typography> */}
                  <Typography variant="h6" mb={-1}>
                    Talent Competition Score Sheet
                  </Typography>
                </>
              }
            />

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

export default PerSubEventScoreDialog;
