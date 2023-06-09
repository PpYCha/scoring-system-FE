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
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
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
import { indexContestants } from "../../api/contestantController";
import { indexCategories } from "../../api/categoryController";

const AddEditSettingsEventDialog = ({ openEvent, handleCloseEvent }) => {
  const [startDate, setStartDate] = useState(dayjs());
  const [categoriesList, setCategoriesList] = useState([{}]);

  const {
    state: { loading, event },
    dispatch,
  } = useValue();

  const action = actionHelper();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const res = await indexCategories();
    console.log(res);
    setCategoriesList(res);
  };

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
                <Typography variant="h6">Sidebar Navigation Active</Typography>
                <Typography variant="body2" gutterBottom>
                  Sidebar navigation view judge
                </Typography>
                <Box flex>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Sub Event
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Talent Night"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Pre-Pageant"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Main Event"
                      />
                      <FormControlLabel
                        value="others"
                        control={<Radio />}
                        label="Final Seven"
                      />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Category
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Talent Night"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Pre-Pageant"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Main Event"
                      />
                      <FormControlLabel
                        value="others"
                        control={<Radio />}
                        label="Final Seven"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6">List of Events</Typography>
                <Typography variant="body2" gutterBottom>
                  To be included in final computation
                </Typography>

                {categoriesList.map((item) => (
                  <Stack
                    key={item.id} // Add a unique key prop for each item in the array
                    spacing={2}
                    mb={2}
                    direction="row"
                    justifyContent="space-between"
                  >
                    <FormControlLabel
                      value="end"
                      control={<Switch color="primary" />}
                      label={item.category}
                      labelPlacement="start"
                    />
                    <TextField
                      id={item.title}
                      label="Percentage"
                      variant="outlined"
                      size="small"
                    />
                  </Stack>
                ))}
              </CardContent>
            </Card>

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

export default AddEditSettingsEventDialog;
