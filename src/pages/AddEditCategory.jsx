import {
  Box,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Divider,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import ButtonCancel from "../components/Button/ButtonCancel";
import ButtonSave from "../components/Button/ButtonSave";
import * as Yup from "yup";

import dayjs from "dayjs";
import TextfieldComponent from "../components/TextFieldComponent";

import Swal from "sweetalert2";
import { formatDatePicker } from "../utils/formatter";
import MaterialReactTable from "material-react-table";
import {
  deleteCategory,
  indexCategories,
  showCategory,
  storeCategory,
} from "../api/categoryController";
import { CropDin, Delete, Edit } from "@mui/icons-material";
import { deleteCriteria, showCriteria } from "../api/criteriaController";

import AddEditCriteria from "./AddEditCriteria";
import { useValue } from "../context/ContextProvider";
import actionHelper from "../context/actionHelper";
import { type } from "@testing-library/user-event/dist/type";
import {
  faArrowRight,
  faPenToSquare,
  faScaleUnbalancedFlip,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OverallReport from "./score/OverallReport";

const AddEditCategory = ({ openEvent, handleCloseEvent }) => {
  const [startDate, setStartDate] = useState(dayjs());
  const [tableList, setTableList] = useState([{}]);
  const [openCriteria, setOpenCriteria] = useState(false);
  const [totalPercentage, setTotalPercentage] = useState(0);

  const {
    state: { category },
    dispatch,
  } = useValue();

  const actions = actionHelper();

  useEffect(() => {
    fetch();
  }, [openEvent]);

  const fetch = async () => {
    const res = await indexCategories();

    const filteredList = res.filter(
      (item) =>
        item.event_id === category.event_id &&
        item.subEvent_id === category.subEvent_id
    );
    setTableList(filteredList);
  };

  const handleSubmit = async (values) => {
    dispatch({ type: actions.START_LOADING });
    try {
      const dateFormatted = formatDatePicker(startDate.$d);
      let inputs = values;
      inputs.date = dateFormatted;
      console.log(inputs);
      const res = await storeCategory(inputs);
      Swal.fire({
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 2000,
      });
      fetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: JSON.stringify(error.errors),
      });
      console.log(error);
    }
    dispatch({ type: actions.END_LOADING });
  };

  const handleEdit = (row) => {
    dispatch({
      type: actions.UPDATE_CATEGORY,
      payload: {
        category_id: row.original.id,
        category: row.original.category,
        description: row.original.description,
        percentage: row.original.percentage,
      },
    });
    dispatch({ type: actions.END_LOADING });
  };

  const handleDelete = async (e) => {
    try {
      Swal.fire({
        title: "Do you want to delete?",
        showCancelButton: true,
        confirmButtonText: "Delete",
        confirmButtonColor: "#d33",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
          const res = await deleteCategory(e.original.id);
          fetch();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCriteria = async (e) => {
    try {
      dispatch({
        type: actions.UPDATE_CRITERIA,
        payload: {
          category_id: e.original.id,
          categoryTitle: e.original.category,
        },
      });
      setOpenCriteria(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = async () => {
    setOpenCriteria(false);
  };

  const textInput = [
    {
      name: "category",
      label: "Category",
      md: 6,
    },
    // {
    //   name: "description",
    //   label: "Description",
    //   md: 12,
    // },
    {
      name: "percentage",
      label: "Percentage",
      md: 6,
    },
    // {
    //   name: "minimumPercentage",
    //   label: "Minimum Score Percentage",
    //   md: 6,
    // },
    // {
    //   name: "maximumPercentage",
    //   label: "Maximum Score Percentage",
    //   md: 6,
    // },
  ];

  const columns = useMemo(() => {
    const totalPercentage = tableList.reduce(
      (acc, curr) => acc + parseInt(curr.percentage),
      0
    );

    return [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "category",
        header: "Category",
      },
      // {
      //   accessorKey: "description",
      //   header: "Description",
      //   Cell: ({ cell }) => (
      //     <Box
      //       sx={{
      //         maxWidth: "500px",
      //         wordWrap: "break-word",
      //         whiteSpace: "normal",
      //       }}
      //     >
      //       {cell.getValue()}
      //     </Box>
      //   ),
      // },
      {
        accessorKey: "percentage",
        header: "Percentage",
        Footer: () => (
          <Stack>
            Total:
            <Box
              color={totalPercentage === 100 ? "success.main" : "warning.main"}
            >
              {totalPercentage}%
            </Box>
          </Stack>
        ),
      },
      // {
      //   accessorKey: "minimumPercentage",
      //   header: "Minimum Score Percentage",
      // },
      // {
      //   accessorKey: "maximumPercentage",
      //   header: "Maximum Score Percentage",
      // },
    ];
  }, [tableList]);

  const cVisibility = { id: false };

  const validationSchema = Yup.object({
    category: Yup.string().required("Please enter event category"),
    // description: Yup.string().required("Please enter description"),
    percentage: Yup.number().required("Please enter percentage"),
  });

  return (
    <>
      <Dialog open={openEvent} fullWidth={true} maxWidth="md">
        <DialogTitle>Category Details</DialogTitle>

        <DialogContent>
          <DialogContentText m={0} p={0} mb={2}>
            <Typography m={0} p={0}>
              {category.title}{" "}
              <FontAwesomeIcon icon={faArrowRight} size="2xs" />{" "}
              {category.titleSubEvent}
            </Typography>
          </DialogContentText>
          <Divider variant="fullWidth" sx={{ marginTop: 0, marginBottom: 2 }} />
          <Formik
            initialValues={{ ...category }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={1} justifyContent="center" p={1}>
                {textInput.map((item) => {
                  return (
                    <Grid item md={item.md ? item.md : 4} key={item.name}>
                      <TextfieldComponent name={item.name} label={item.label} />
                    </Grid>
                  );
                })}

                <Grid item md={12}>
                  <MaterialReactTable
                    columns={columns}
                    data={tableList}
                    enableColumnActions={false}
                    enableSorting={false}
                    enableEditing
                    initialState={{
                      density: "compact",
                      columnVisibility: { id: false },
                    }}
                    enableDensityToggle={false}
                    enableFullScreenToggle={false}
                    enableHiding={false}
                    renderRowActions={({ row, table }) => (
                      <Box sx={{ display: "flex", gap: "1rem" }}>
                        <Tooltip arrow placement="left" title="Criteria">
                          <IconButton
                            color="secondary"
                            onClick={(e) => handleCriteria(row)}
                          >
                            <FontAwesomeIcon
                              size="xs"
                              icon={faScaleUnbalancedFlip}
                            />
                          </IconButton>
                        </Tooltip>
                        {/* <Tooltip arrow placement="right" title="Edit">
                          <IconButton onClick={(e) => handleEdit(row)}>
                            <FontAwesomeIcon size="xs" icon={faPenToSquare} />
                          </IconButton>
                        </Tooltip> */}
                        <Tooltip arrow placement="right" title="Delete">
                          <IconButton
                            color="error"
                            onClick={(e) => handleDelete(row)}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )}
                  />
                </Grid>
              </Grid>

              <DialogActions>
                <ButtonSave />
                <ButtonCancel handleClose={handleCloseEvent} />
              </DialogActions>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>

      <AddEditCriteria
        openEvent={openCriteria}
        handleCloseEvent={handleClose}
      />
    </>
  );
};

export default AddEditCategory;
