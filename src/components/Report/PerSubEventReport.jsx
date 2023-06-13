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
  columnHeaderCategories,
  contestants,
  textHeader,
}) => {
  const [score, setScore] = useState([{}]);

  const calculateTotalScore = (item, category) => {
    const contestantCategory = item.columnHeaderCategories?.find(
      (cat) => cat.category_id === category.id
    );
    const totalScore = contestantCategory?.totalScore;
    const categoryPercentage = category.percentage || 0;

    const totalWeight = categoryPercentage / 100;
    const calculatedScore = totalScore ? totalScore * totalWeight : null;
    return calculatedScore;
  };

  return (
    <TableContainer
      component={Paper}
      ref={tableRef}
      sx={{
        // height: "13in"
        width: "8.5in", // Adjusted height to account for margins
        margin: "10mm", // Margins of 10mm on all sides
      }}
    >
      <HeaderReport textHeader={textHeader} />

      <Table
        sx={{
          tableLayout: "fixed",
        }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead sx={{ backgroundColor: "gray", color: "white" }}>
          <TableRow>
            <TableCell sx={{ width: 150, fontSize: 10 }}>CANDIDATE</TableCell>
            {columnHeaderCategories.map((item) => (
              <TableCell
                key={item.id}
                align="left"
                sx={{ fontSize: 10, width: 125 }}
              >
                {item.category}
              </TableCell>
            ))}
            <TableCell sx={{ width: 80, fontSize: 10 }}>Total</TableCell>
            <TableCell sx={{ width: 80, fontSize: 10 }}>Rank</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contestants.map((item) => {
            const totalScores = [];

            return (
              <TableRow key={item.id} sx={{ margin: 0, padding: 0 }}>
                <TableCell align="left">
                  <Typography sx={{ fontSize: 8, margin: 0, padding: 0 }}>
                    Mutya san {item.municipality.toUpperCase()}
                  </Typography>
                </TableCell>
                {columnHeaderCategories.map((category) => {
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

export default PerSubEventReport;
