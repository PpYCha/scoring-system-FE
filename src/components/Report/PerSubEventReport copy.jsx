import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FooterReport from "./FooterReport";

import HeaderReport from "./HeaderReport";

const PerSubEventReport = ({
  tableRef,
  categories,
  contestants,
  textHeader,
}) => {
  const [score, setScore] = useState([{}]);

  const calculateTotalScore = (item, category) => {
    const contestantCategory = item.categories?.find(
      (cat) => cat.category_id === category.id
    );
    const totalScore = contestantCategory?.totalScore;

    const categoryPercentage = category.percentage || 0;
    const totalWeight = categoryPercentage / 100;

    const calculatedScore = totalScore ? (totalScore / 5) * totalWeight : null;
    return calculatedScore;
  };

  const sortedContestants = contestants.sort((a, b) => {
    const totalScoreA = categories.reduce(
      (acc, category) => acc + calculateTotalScore(a, category),
      0
    );
    const totalScoreB = categories.reduce(
      (acc, category) => acc + calculateTotalScore(b, category),
      0
    );
    return totalScoreB - totalScoreA;
  });

  return (
    <TableContainer
      component={Paper}
      ref={tableRef}
      sx={{
        // 1 inch is equal to 25.4 millimeters. So, to convert 8.5 inches to millimeters:
        // 8.5 inches * 25.4 mm/inch = 215.9 mm
        // height: "13in"
        width: "205.9mm", // Adjusted height to account for margins
        margin: "5mm",
      }}
    >
      <HeaderReport textHeader={textHeader} />

      <Table
        sx={{
          tableLayout: "fixed",
        }}
        size="small"
      >
        <TableHead sx={{ backgroundColor: "gray", color: "white" }}>
          <TableRow>
            <TableCell sx={{ width: 135, fontSize: 10 }}>CANDIDATE</TableCell>
            {categories.map((item) => (
              <TableCell
                key={item.id}
                align="left"
                sx={{ fontSize: 10, width: 125 }}
              >
                {item.category}
              </TableCell>
            ))}
            <TableCell sx={{ width: 60, fontSize: 10 }}>Total</TableCell>
            <TableCell sx={{ width: 60, fontSize: 10 }}>Rank</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedContestants.map((item, index) => {
            const totalScores = [];

            return (
              <TableRow key={item.id}>
                <TableCell align="left" sx={{ fontSize: 8 }}>
                  Mutya san {item.municipality.toUpperCase()}
                </TableCell>
                {categories.map((category) => {
                  const calculatedScore = calculateTotalScore(item, category);
                  totalScores.push(calculatedScore);

                  return (
                    <TableCell
                      key={category.id}
                      align="left"
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
                <TableCell sx={{ fontSize: 8 }}>
                  {totalScores.length > 0 ? (
                    totalScores.reduce((a, b) => a + b).toFixed(2)
                  ) : (
                    <span style={{ color: "red" }}>N/A</span>
                  )}
                </TableCell>
                <TableCell sx={{ fontSize: 8 }}>{index + 1}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <FooterReport />
    </TableContainer>
  );
};
export default PerSubEventReport;
