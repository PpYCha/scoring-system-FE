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
import PerCategoryScore from "./PerCategoryScore";
import { indexCriterias } from "../../api/criteriaController";

const PerCategoryScoreDialog = ({
  openEvent,
  handleCloseEvent,
  categoryId,
  categoryTitle,
}) => {
  const [categories, setCategories] = useState([{}]);
  const [contestants, setContestants] = useState([]);
  const [scores, setScores] = useState([{}]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const tableRef = useRef();

  const {
    state: { contestant },
    dispatch,
  } = useValue();

  const actions = actionHelper();

  useEffect(() => {
    fetch();
  }, [openEvent]);

  const fetch = async () => {
    setLoading(true);
    const [resContestant, resCategories, resScore, resCriteria] =
      await Promise.all([
        indexContestants(),
        indexCategories(),
        indexScores(),
        indexCriterias(),
      ]);

    const sortedContestants = resContestant.sort((a, b) => {
      const contestantNumberA = Number(a.cotestant_number);
      const contestantNumberB = Number(b.cotestant_number);

      return contestantNumberA - contestantNumberB;
    });

    const combinedData = sortedContestants.map((contestant) => {
      const contestantScores = resScore.filter(
        (score) => score.contestant_id === contestant.id
      );

      const categoryScores = {};

      contestantScores.forEach((score) => {
        const categoryId = score.category_id;

        if (!categoryScores[categoryId]) {
          categoryScores[categoryId] = {
            category_id: categoryId,

            scores: [],
            totalScore: 0,
          };
        }

        categoryScores[categoryId].scores.push({
          score_id: score.id,
          judge: score.judge_id,
          score: score.score,
          criteria_id: score.criteria_id,
        });

        categoryScores[categoryId].totalScore += parseInt(score.score);
      });

      const categories = Object.values(categoryScores);

      return {
        ...contestant,
        categories,
      };
    });

    const filteredCategories = resCriteria.filter(
      (item) => item.category_id === categoryId
    );

    setContestants(combinedData);
    setCategories(filteredCategories);

    setLoading(false);
  };

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  return (
    <>
      {loading ? null : (
        <Dialog open={openEvent} fullScreen>
          <DialogContent>
            <DialogActions>
              {contestants.length > 0 && categories.length > 0 ? (
                <PerCategoryScore
                  tableRef={tableRef}
                  categories={categories}
                  contestants={contestants}
                  categoryTitle={categoryTitle}
                />
              ) : (
                <div>Loading...</div>
              )}

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

export default PerCategoryScoreDialog;
