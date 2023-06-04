import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
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
import actionHelper from "../../context/actionHelper";

const AddEditSettingsEventDialog = ({ openEvent, handleCloseEvent }) => {
  const [startDate, setStartDate] = useState(dayjs());

  const {
    state: { loading, event },
    dispatch,
  } = useValue();

  const action = actionHelper();

  const handleSubmit = async (values) => {
    dispatch({ type: action.START_LOADING });
    try {
      if (typeof values.id === "undefined") {
        handleSave(values);
      }
      if (values.id) {
        handleUpdate(values);
      }
    } catch (error) {
      throw error;
    }
    dispatch({ type: action.END_LOADING });
  };

  const handleSave = async (values) => {
    try {
      const dateFormatted = formatDatePicker(startDate.$d);
      let inputs = values;
      inputs.date = dateFormatted;

      const res = await storeEvent(inputs);
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

  const handleUpdate = async (values) => {
    console.log(values);
    dispatch({ type: action.RESET_EVENT });
  };

  const textInput = [
    {
      name: "title",
      label: "Title",
      md: 12,
    },
    // {
    //   name: "description",
    //   label: "Description",
    //   md: 12,
    // },
  ];

  const validationSchema = Yup.object({
    title: Yup.string().required("Please enter event title"),
  });

  return (
    <Dialog open={openEvent} fullWidth={true} maxWidth="md">
      <DialogTitle variant="h5">Settings</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{ ...event }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Card>
              <CardContent>
                <Typography variant="h6">List of Events</Typography>
                <Typography variant="body2" gutterBottom>
                  To be included in final computation
                </Typography>
                <Stack
                  spacing={2}
                  mb={2}
                  direction="row"
                  justifyContent="space-between"
                >
                  <FormControlLabel
                    value="end"
                    control={<Switch color="primary" />}
                    label="Philippine Terno"
                    labelPlacement="end"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Percentage"
                    variant="outlined"
                    size="small"
                  />
                </Stack>
                <Stack
                  spacing={2}
                  mb={2}
                  direction="row"
                  justifyContent="space-between"
                >
                  <FormControlLabel
                    value="end"
                    control={<Switch color="primary" />}
                    label="Pre-Pageant"
                    labelPlacement="end"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Percentage"
                    variant="outlined"
                    size="small"
                  />
                </Stack>
                <Stack
                  spacing={2}
                  mb={2}
                  direction="row"
                  justifyContent="space-between"
                >
                  <FormControlLabel
                    value="end"
                    control={<Switch color="primary" />}
                    label="Main Event"
                    labelPlacement="end"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Percentage"
                    variant="outlined"
                    size="small"
                  />
                </Stack>
              </CardContent>
            </Card>

            <DialogActions>
              {/* <ButtonSave />*/}
              <ButtonCancel handleClose={handleCloseEvent} />
            </DialogActions>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditSettingsEventDialog;
