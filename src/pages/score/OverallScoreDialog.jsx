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

import { indexContestantsEvents } from "../../api/contestantEventController";
import OverallReport from "./OverallReport";
import { indexCriterias } from "../../api/criteriaController";

const OverallScoreDialog = ({ openEvent, handleCloseEvent, subEventid }) => {
  const [categories, setCategories] = useState([{}]);
  const [contestants, setContestants] = useState([]);

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
            criteria: {}, // Object to store criteria scores
          };
        }

        categoryScores[categoryId].scores.push({
          score_id: score.id,
          judge: score.judge_id,
          score: score.score,
          criteria_id: score.criteria_id,
        });

        categoryScores[categoryId].totalScore += parseFloat(score.score);

        // Store criteria scores
        const criteriaId = score.criteria_id;
        if (!categoryScores[categoryId].criteria[criteriaId]) {
          categoryScores[categoryId].criteria[criteriaId] = [];
        }

        categoryScores[categoryId].criteria[criteriaId].push({
          judge: score.judge_id,
          score: score.score,
        });
      });

      const categories = Object.values(categoryScores);

      // Calculate overall score for each category
      categories.forEach((category, index) => {
        const { scores, totalScore, criteria } = category;

        // Calculate average score for each criterion
        Object.values(criteria).forEach((criterion) => {
          const criterionScores = criterion.map((score) =>
            parseFloat(score.score)
          );
          const criterionAverage =
            criterionScores.reduce((a, b) => a + b, 0) / criterionScores.length;
          criterion.averageScore = criterionAverage;
        });

        const overallScore = totalScore;
        category.overallScore = overallScore;
      });

      // Calculate sum of average scores for each category
      const sumOfAverageScores = categories.reduce((sum, category) => {
        return (
          sum +
          Object.values(category.criteria).reduce((criterionSum, criterion) => {
            return criterionSum + criterion.averageScore;
          }, 0)
        );
      }, 0);

      return {
        ...contestant,
        categories,
        sumOfAverageScores,
      };
    });

    combinedData.reduce((acc, item) => {
      item.categories.forEach((category) => {
        const criteria = category.criteria;
        Object.keys(criteria).forEach((criterionId) => {
          const criterion = criteria[criterionId];
          const averageScore = criterion.averageScore;
          criterion.averageScore = averageScore;
        });
      });
      return acc;
    }, []);
    console.log(combinedData);

    const filteredCategories = resCategories.filter(
      (item) => item.subEvent_id === 2
    );

    setContestants(combinedData);
    setCategories(filteredCategories);

    console.log(filteredCategories.categories);
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
            {contestants.length > 0 && categories.length > 0 ? (
              <OverallReport
                tableRef={tableRef}
                categories={categories}
                contestants={contestants}
              />
            ) : (
              <div>Loading...</div>
            )}

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

export default OverallScoreDialog;
