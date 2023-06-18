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
import FooterReport from "../../components/Report/FooterReport";
import ibabaoFestivalLogo from "../../assets/logo/ibabaoFestivalLogo.jpg";

import HeaderReport from "../../components/Report/HeaderReport";
import { indexCriterias } from "../../api/criteriaController";

const OverallReport = ({ tableRef, categories, contestants }) => {
  const [score, setScore] = useState([{}]);
  const [criterias, setSetCriterias] = useState([]);

  useEffect(() => {
    const fetchCriterias = async () => {
      try {
        const res = await indexCriterias();
        setSetCriterias(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCriterias();
  }, []);

  // const calculateTotalScore = (item, category) => {
  //   const contestantCategory = item.categories?.find(
  //     (cat) => cat.category_id === category.id
  //   );

  //   const totalScore = contestantCategory?.totalScore;
  //   const categoryPercentage = category.percentage || 0;

  //   const totalWeight = categoryPercentage / 100;
  //   const calculatedScore = totalScore ? totalScore * totalWeight : null;
  //   return calculatedScore;
  // };

  const calculateTotalScore = (item, category) => {
    const result = item.categories.find(
      (value) => value.category_id === category.id
    );

    if (result) {
      const overallScore = item.categories.find(
        (e) => e.category_id === category.id
      );

      // const totalCategory = item.finalScore * (category.percentage / 100);
      return overallScore.overallScore;
    }

    // Handle the case when item.categories does not contain category.id
    // You can return a default value or handle it according to your requirements
    return 0; // Return 0 as an example, modify it as needed
  };

  return (
    <TableContainer
      component={Paper}
      ref={tableRef}
      sx={{
        // 1 inch is equal to 25.4 millimeters. So, to convert 8.5 inches to millimeters:
        // 8.5 inches * 25.4 mm/inch = 215.9 mm
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
          Overall Score Sheet
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
                {item.category} <br /> ({item.percentage}%)
              </TableCell>
            ))}
            <TableCell align="center" sx={{ width: 150, fontSize: 12 }}>
              Total (100%)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ borderBottom: "unset" }}>
          {contestants && contestants.length > 0 ? (
            contestants.map((item) => {
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
      <FooterReport />
    </TableContainer>
  );
};

export default OverallReport;
