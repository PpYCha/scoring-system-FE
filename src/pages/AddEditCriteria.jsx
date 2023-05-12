import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import ButtonCancel from "../components/Button/ButtonCancel";
import ButtonSave from "../components/Button/ButtonSave";
import * as Yup from "yup";
import { useValue } from "../context/ContextProvider";
import dayjs from "dayjs";
import TextfieldComponent from "../components/TextFieldComponent";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { storeEvent } from "../api/eventController";
import Swal from "sweetalert2";
import { formatDatePicker } from "../utils/formatter";
import MaterialReactTableComponent from "../components/MaterialReactTableComponent";
import {
  deleteCategory,
  indexCategories,
  storeCategory,
} from "../api/categoryController";
import {
  deleteCriteria,
  indexCriterias,
  storeCriteria,
} from "../api/criteriaController";

const AddEditCriteria = ({ openEvent, handleCloseEvent }) => {
  const [startDate, setStartDate] = useState(dayjs());
  const [tableList, setTableList] = useState([{}]);

  const {
    state: { criteria },
    dispatch,
  } = useValue();

  useEffect(() => {
    fetch();
  }, [openEvent]);

  const fetch = async () => {
    const res = await indexCriterias();

    const filteredList = res.filter(
      (item) => item.category_id === criteria.category_id
    );
    setTableList(filteredList);
  };

  const handleSubmit = async (values) => {
    try {
      const dateFormatted = formatDatePicker(startDate.$d);
      let inputs = values;
      inputs.date = dateFormatted;

      const res = await storeCriteria(inputs);
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
    }
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
          const res = await deleteCriteria(e.original.id);
          fetch();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const textInput = [
    {
      name: "description",
      label: "Criteria",
      md: 12,
    },
    {
      name: "percentage",
      label: "Percentage",
      md: 12,
    },
  ];

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "description",
        header: "Description",
      },
      {
        accessorKey: "percentage",
        header: "Percentage",
      },
    ],
    []
  );

  const cVisibility = { id: false };

  const validationSchema = Yup.object({
    description: Yup.string().required("Please enter description"),
    percentage: Yup.number().required("Please enter percentage"),
  });

  return (
    <Dialog open={openEvent} fullWidth={true} maxWidth="lg">
      <DialogContent>
        <Formik
          initialValues={{ ...criteria }}
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
                <MaterialReactTableComponent
                  columns={columns}
                  dataList={tableList}
                  columnVisibility={cVisibility}
                  handleDelete={handleDelete}
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
  );
};

export default AddEditCriteria;
