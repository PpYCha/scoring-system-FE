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
import React from "react";
import FooterReport from "../../components/Report/FooterReport";
import HeaderReport from "../../components/Report/HeaderReport";

const PerCategoryScore = ({
  tableRef,
  categories,
  contestants,
  categoryTitle,
}) => {
  const calculateTotalScore = (item, category) => {
    console.log("item", item);
    // console.log("category", category);
    console.log("categories", categories);

    const contestantCategory = item.categories?.find(
      (cat) => cat.category_id === category.category_id
    );
    //filter the contestantCategory to criteria

    // const filteredCriteriaScore =

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
                {item.criteriaName} <br /> ({item.percentage}%)
              </TableCell>
            ))}
            <TableCell align="center" sx={{ width: 150, fontSize: 12 }}>
              Total (100%)
            </TableCell>
            <TableCell align="center" sx={{ width: 150, fontSize: 12 }}>
              Rank
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
                  <TableCell align="center" sx={{ fontSize: 8 }}>
                    1
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

export default PerCategoryScore;
