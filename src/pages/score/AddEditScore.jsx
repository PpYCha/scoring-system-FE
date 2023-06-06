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
import HeaderReport from "./toPrint/HeaderReport";
import FooterReport from "./toPrint/FooterReport";

const AddEditScore = ({ openEvent, handleCloseEvent }) => {
  const [categories, setCategories] = useState([{}]);
  const [contestants, setContestants] = useState([{}]);
  const [scores, setScores] = useState([{}]);

  const tableRef = useRef();

  const {
    state: { loading },
    dispatch,
  } = useValue();

  const actions = actionHelper();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const [resContestant, resCategories, resScore] = await Promise.all([
      indexContestants(),
      indexCategories(),
      indexScores(),
    ]);

    const combinedData = resContestant.map((contestant) => {
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
        });

        categoryScores[categoryId].totalScore += parseInt(score.score);
      });

      const categories = Object.values(categoryScores);

      return {
        ...contestant,
        categories,
      };
    });

    setContestants(combinedData);
    setCategories(resCategories);
  };

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  return (
    <>
      {loading ? null : (
        <Dialog open={openEvent} fullScreen>
          <DialogContent>
            <TableContainer
              component={Paper}
              ref={tableRef}
              sx={{
                width: "277mm", // Adjusted width to account for margins
                height: "190mm", // Adjusted height to account for margins
                border: "1px solid black",
                margin: "10mm", // Margins of 10mm on all sides
              }}
            >
              <HeaderReport />

              <Table
                sx={{
                  tableLayout: "fixed",
                }}
                aria-label="spanning table"
                size="small"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Contestant</TableCell>
                    {categories.map((item) => (
                      <TableCell key={item.category} align="left">
                        {item.category}({item.percentage}%)
                      </TableCell>
                    ))}
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contestants.map((item) => {
                    const totalScores = [];

                    return (
                      <TableRow key={item.id}>
                        <TableCell align="left">{item.municipality}</TableCell>
                        {categories.map((category) => {
                          const contestantCategory =
                            item.categories &&
                            item.categories.find(
                              (cat) => cat.category_id === category.id
                            );
                          const totalScore = contestantCategory
                            ? contestantCategory.totalScore
                            : null;

                          if (contestantCategory && totalScore !== null) {
                            const categoryPercentage = category.percentage || 0;
                            const totalWeight = categoryPercentage / 100;
                            const calculatedScore = totalScore * totalWeight;
                            totalScores.push(calculatedScore);
                            return (
                              <TableCell key={category.id} align="left">
                                {totalScore}
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell key={category.id} align="left">
                                <span style={{ color: "red" }}>N/A</span>
                              </TableCell>
                            );
                          }
                        })}
                        <TableCell>
                          {totalScores.length > 0 ? (
                            totalScores.reduce((a, b) => a + b).toFixed(2)
                          ) : (
                            <span style={{ color: "red" }}>N/A</span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <FooterReport />
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
