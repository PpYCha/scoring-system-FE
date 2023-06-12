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
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryPercentages, setCategoryPercentages] = useState({});

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
    setCategoriesList(
      res.map((category) => ({ ...category, id: category.id }))
    );
  };

  const handleSubmit = (values) => {
    console.log(values);
    console.log("Selected Categories:", values.selectedCategories);
    console.log("Category Percentages:", values.categoryPercentages);
  };

  const handleSwitchToggle = (item) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(item)) {
        return prevCategories.filter((category) => category !== item);
      } else {
        return [...prevCategories, item];
      }
    });
  };

  const handlePercentageChange = (event, item) => {
    const { id, value } = event.target;
    setCategoryPercentages((prevPercentages) => ({
      ...prevPercentages,
      [item.id]: value,
    }));
  };

  return (
    <Dialog open={openEvent} fullWidth={true} maxWidth="md">
      <DialogTitle variant="h5">Settings</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            selectedCategories: selectedCategories,
            categoryPercentages: categoryPercentages,
          }}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    Sidebar Navigation Active
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Sidebar navigation view judge
                  </Typography>
                  {/* <Box flex>
                    <FormControl>
                      <FormLabel id="demo-radioasdf-buttons-group-label">
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
                      <FormLabel id="demo-radiadffo-buttfons-group-label">
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
                  </Box> */}
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6">List of Events</Typography>
                  <Typography variant="body2" gutterBottom>
                    To be included in final computation
                  </Typography>

                  {categoriesList.map(
                    (item) =>
                      item && (
                        <Stack
                          key={item.id}
                          spacing={2}
                          mb={2}
                          direction="row"
                          justifyContent="space-between"
                        >
                          <FormControlLabel
                            control={
                              <Switch
                                color="primary"
                                checked={selectedCategories.includes(item)}
                                onChange={() => handleSwitchToggle(item)}
                              />
                            }
                            label={item.category}
                            labelPlacement="start"
                          />
                          {selectedCategories.includes(item) && (
                            <TextField
                              name={`categoryPercentages.${item.id}`}
                              label="Percentage"
                              variant="outlined"
                              size="small"
                              value={categoryPercentages[item.id] || ""}
                              onChange={handlePercentageChange}
                            />
                          )}
                        </Stack>
                      )
                  )}
                </CardContent>
              </Card>

              <DialogActions>
                <ButtonSave />
                <ButtonCancel handleClose={handleCloseEvent} />
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditSettingsEventDialog;
