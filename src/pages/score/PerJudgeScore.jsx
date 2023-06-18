import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import FooterDynamicJudge from "../../components/Report/FooterDynamicJudge";
import FooterReport from "../../components/Report/FooterReport";
import HeaderReport from "../../components/Report/HeaderReport";
import actionHelper from "../../context/actionHelper";
import { useValue } from "../../context/ContextProvider";

const PerCategoryScore = ({
  categories,
  contestants,
  categoryTitle,
  judgeId,
  judgeName,
  handlePrint,
  tableRef,
}) => {
  const {
    state: { category, judge },
    dispatch,
  } = useValue();

  const actions = actionHelper();

  const calculateTotalScore = (item, category) => {
    const contestantCategory = item.categories?.find(
      (cat) => cat.category_id === category.category_id
    );

    const scores = contestantCategory?.scores;
    let totalScore = 0;
    let averageScore = 0;
    if (scores && scores.length > 0) {
      // Filter scores based on criteria_id matching category_id
      const filteredScores = scores.filter(
        (score) =>
          score.criteria_id === category.id &&
          score.judge === parseInt(judge.id)
      );

      // Sum up the filtered scores
      totalScore = filteredScores.reduce(
        (acc, score) => acc + parseFloat(score.score, 10),
        0
      );

      // Calculate the average score
      averageScore = totalScore / filteredScores.length;
    }

    return averageScore;
  };

  return (
    <>
      <TableContainer
        component={Paper}
        ref={tableRef}
        sx={{
          height: "205.9mm",
          width: "320.2mm",
          margin: "5mm",
        }}
      >
        <HeaderReport>
          <Typography variant="body2" mb={-1}>
            Republic of the Philippines
          </Typography>
          <Typography variant="body2" mb={-1}>
            Province of Northern Samar
          </Typography>
          <Typography variant="body1" mb={-1}>
            Mutya san Ibabao 2023
          </Typography>
          <Typography variant="body1" mb={-1}>
            {categoryTitle} Score Sheet
          </Typography>
        </HeaderReport>
        <Table
          sx={{
            tableLayout: "fixed",
          }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead sx={{ backgroundColor: "gray", color: "white" }}>
            <TableRow>
              <TableCell align="left" sx={{ width: 215, fontSize: 12 }}>
                CANDIDATE
              </TableCell>
              {categories.map((item) => (
                <TableCell key={item.id} align="center" sx={{ fontSize: 12 }}>
                  {item.criteriaName.replace("Competition", " ")} <br /> (
                  {item.percentage}%)
                </TableCell>
              ))}
              <TableCell align="center" sx={{ width: 150, fontSize: 12 }}>
                Total (100%)
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {contestants && contestants.length > 0 ? (
              contestants.map((item) => {
                const totalScores = [];

                return (
                  <TableRow key={item.id}>
                    <TableCell align="left" sx={{ fontSize: 8 }}>
                      Mutya san {item.municipality.toUpperCase()}
                    </TableCell>
                    {categories.map((category) => {
                      const calculatedScore = calculateTotalScore(
                        item,
                        category
                      );
                      totalScores.push(calculatedScore);

                      return (
                        <TableCell
                          key={category.id}
                          align="center"
                          sx={{ fontSize: 8 }}
                        >
                          {calculatedScore !== null ? (
                            calculatedScore.toFixed(2)
                          ) : (
                            <span style={{ color: "red" }}>N/A</span>
                          )}
                        </TableCell>
                      );
                    })}
                    <TableCell align="center" sx={{ fontSize: 8 }}>
                      {totalScores.length > 0 ? (
                        totalScores.reduce((a, b) => a + b).toFixed(2)
                      ) : (
                        <span style={{ color: "red" }}>N/A</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={categories.length + 2}>
                  No contestants available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <FooterDynamicJudge judgeName={judgeName} />
      </TableContainer>
    </>
  );
};

export default PerCategoryScore;
