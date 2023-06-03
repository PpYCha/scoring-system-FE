import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import ButtonCancel from "../../components/Button/ButtonCancel";
import ButtonSave from "../../components/Button/ButtonSave";
import * as Yup from "yup";

import dayjs from "dayjs";
import TextfieldComponent from "../../components/TextFieldComponent";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { storeEvent } from "../../api/eventController";
import Swal from "sweetalert2";
import { formatDatePicker } from "../../utils/formatter";
import { useValue } from "../../context/ContextProvider";
import { storeSubEvent, updateSubEvent } from "../../api/subEventController";

const AddEditSubEventDialog = ({ openEvent, handleCloseEvent }) => {
  const [startDate, setStartDate] = useState(dayjs());

  const {
    state: { subEvent },
    dispatch,
  } = useValue();

  const handleSubmit = async (values) => {
    try {
      let res;
      const dateFormatted = formatDatePicker(startDate.$d);
      let inputs = values;
      inputs.date = dateFormatted;
      if (typeof subEvent.id === "undefined") {
        res = await storeSubEvent(inputs);
      }
      if (subEvent.id) {
        res = await updateSubEvent(inputs);
      }

      Swal.fire({
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 2000,
      });
      handleCloseEvent();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: JSON.stringify(error.errors),
      });
    }
  };

  const textInput = [
    {
      name: "title",
      label: "Title",
      md: 8,
    },
  ];

  const validationSchema = Yup.object({
    title: Yup.string().required("Please enter event title"),
  });

  return (
    <Dialog open={openEvent} fullWidth={true} maxWidth="lg">
      <DialogTitle>Sub Event Details</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{ ...subEvent }}
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

              <Grid item md={4}>
                <DesktopDatePicker
                  name="apDate"
                  label="Date"
                  inputFormat="DD/MM/YYYY"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  slotProps={{ textField: { size: "small" } }}
                  sx={{ width: "100%" }}
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

export default AddEditSubEventDialog;
