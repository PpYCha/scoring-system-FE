import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import FooterReport from "../../../components/Report/FooterReport";

import HeaderReport from "../../../components/Report/HeaderReport";

const OverallReport = ({ tableRef, categories, contestants }) => {
  const [score, setScore] = useState([{}]);

  const calculateTotalScore = (item, category) => {
    const contestantCategory = item.categories?.find(
      (cat) => cat.category_id === category.id
    );
    const totalScore = contestantCategory?.totalScore;
    const categoryPercentage = category.percentage || 0;
    console.log(category.percentage);
    const totalWeight = categoryPercentage / 100;
    const calculatedScore = totalScore ? totalScore * totalWeight : null;
    return calculatedScore;
  };

  return (
    <TableContainer
      component={Paper}
      ref={tableRef}
      sx={{
        width: "277mm", // Adjusted width to account for margins
        margin: "10mm", // Margins of 10mm on all sides
        // height: "190mm", // Adjusted height to account for margins
      }}
    >
      <HeaderReport />

      <Table
        sx={{
          tableLayout: "fixed",
        }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead sx={{ backgroundColor: "gray", color: "white" }}>
          <TableRow>
            <TableCell sx={{ width: 215, fontSize: 12 }}>CANDIDATE</TableCell>
            {categories.map((item) => (
              <TableCell
                key={item.id}
                align="left"
                sx={{ fontSize: 12, width: item.width }}
              >
                {item.category}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {contestants.map((item) => {
            const totalScores = [];

            return (
              <TableRow key={item.id}>
                <TableCell align="left">
                  Mutya san {item.municipality.toUpperCase()}
                </TableCell>
                {categories.map((category) => {
                  const calculatedScore = calculateTotalScore(item, category);
                  totalScores.push(calculatedScore);

                  return (
                    <TableCell
                      key={category.id}
                      align="left"
                      sx={{ fontSize: 10 }}
                    >
                      {calculatedScore !== null ? (
                        calculatedScore.toFixed(2)
                      ) : (
                        <span style={{ color: "red" }}>N/A</span>
                      )}
                    </TableCell>
                  );
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
  );
};

export default OverallReport;
