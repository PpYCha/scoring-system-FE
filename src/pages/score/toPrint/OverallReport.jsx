import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import FooterReport from "./FooterReport";
import HeaderReport from "./HeaderReport";

const OverallReport = ({ tableRef, categories, contestants }) => {
  console.log(categories);
  console.log(contestants);

  const columnHeader = [
    {
      id: 2,
      cheader: "PRE-PAGEANT 30%",
      width: 150,
    },
    {
      id: 3,
      cheader: "SWIMSUIT 35%",
      width: 125,
    },
    {
      id: 4,
      cheader: "EVENING GOWN 35%",
      width: 160,
    },
    {
      id: 5,
      cheader: "TOTAL",
    },
    {
      id: 6,
      cheader: "RANK",
    },
  ];

  return (
    <TableContainer
      component={Paper}
      ref={tableRef}
      sx={{
        width: "190mm", // Adjusted width to account for margins
        // width: "277mm", // Adjusted width to account for margins
        // height: "190mm", // Adjusted height to account for margins
        // border: "1px solid black",
        margin: "10mm", // Margins of 10mm on all sides
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
            <TableCell sx={{ width: 125, fontSize: 12 }}>CANDIDATE</TableCell>
            {columnHeader.map((item) => (
              <TableCell
                key={item.id}
                align="left"
                sx={{ fontSize: 12, width: item.width }}
              >
                {item.cheader}
              </TableCell>
            ))}
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
                      <TableCell
                        key={category.id}
                        align="left"
                        sx={{ fontSize: 10 }}
                      >
                        {totalScore}
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell
                        key={category.id}
                        align="left"
                        sx={{ fontSize: 10 }}
                      >
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
  );
};

export default OverallReport;
