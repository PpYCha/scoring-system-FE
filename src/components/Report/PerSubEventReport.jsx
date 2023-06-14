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
import React, { useEffect, useState } from "react";
import FooterReport from "./FooterReport";

import HeaderReport from "./HeaderReport";

const PerSubEventReport = ({
  tableRef,
  categories,
  contestants,
  textHeader,
}) => {
  const [score, setScore] = useState([{}]);
  const [tableData, setTableData] = useState([{}]);

  return (
    <>
      {contestants.map((judge) => (
        <TableContainer
          key={judge.judge_id}
          component={Paper}
          ref={tableRef}
          sx={{
            width: "205.9mm",
            height: "205.9mm",
            margin: "5mm",
          }}
        >
          <HeaderReport textHeader={textHeader} />

          <Table sx={{ tableLayout: "fixed" }} size="small">
            <TableHead sx={{ backgroundColor: "gray", color: "white" }}>
              <TableRow>
                <TableCell sx={{ width: 135, fontSize: 10 }}>
                  CANDIDATE
                </TableCell>
                {categories.map((category) => (
                  <TableCell
                    key={category.category_id}
                    align="left"
                    sx={{ fontSize: 10, width: 125 }}
                  >
                    {category.category_name}
                  </TableCell>
                ))}
                <TableCell sx={{ width: 60, fontSize: 10 }}>Total</TableCell>
                <TableCell sx={{ width: 60, fontSize: 10 }}>Rank</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {judge.contestants.map((contestant) => (
                <TableRow key={contestant.contestant.id}>
                  <TableCell align="left" sx={{ fontSize: 8 }}>
                    Mutya san {contestant.contestant.municipality.toUpperCase()}
                  </TableCell>
                  {categories.map((category) => {
                    const score = contestant.categories.find(
                      (cat) => cat.category_id === category.category_id
                    );
                    return (
                      <TableCell
                        key={category.category_id}
                        align="left"
                        sx={{ fontSize: 8 }}
                      >
                        {score ? (
                          score.rawScore.toFixed(2)
                        ) : (
                          <span style={{ color: "red" }}>N/A</span>
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell sx={{ fontSize: 8 }}>
                    {contestant.totalScore.toFixed(2)}
                  </TableCell>
                  <TableCell sx={{ fontSize: 8 }}>{contestant.rank}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <FooterReport />
        </TableContainer>
      ))}
    </>
  );
};
export default PerSubEventReport;
