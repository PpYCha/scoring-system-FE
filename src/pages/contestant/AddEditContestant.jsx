import {
  AppBar,
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Input,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useFormikContext, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import ButtonCancel from "../../components/Button/ButtonCancel";
import ButtonSave from "../../components/Button/ButtonSave";
import * as Yup from "yup";

import dayjs from "dayjs";
import TextfieldComponent from "../../components/TextFieldComponent";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { storeEvent } from "../../api/eventController";
import Swal from "sweetalert2";
import { formatDatePicker } from "../../utils/formatter";

import {
  indexContestants,
  storeContestant,
} from "../../api/contestantController";
import MaterialReactTable from "material-react-table";
import { Close, CropDin, Delete, Edit } from "@mui/icons-material";
import { useValue } from "../../context/ContextProvider";
import actionHelper from "../../context/actionHelper";
import Slide from "@mui/material/Slide";

const AddEditContestant = ({ openEvent, handleCloseEvent }) => {
  const [startDate, setStartDate] = useState(dayjs());
  const [tableList, setTableList] = useState([{}]);
  const [image, setImage] = useState({});
  const [previewImage, setPreviewImage] = useState({});

  const {
    state: { contestant, subEvent, loading },
    dispatch,
  } = useValue();

  const imgUrl = process.env.REACT_APP_IMG;
  const actions = actionHelper();

  useEffect(() => {}, []);

  const handleSubmit = async (values) => {
    dispatch({ type: actions.START_LOADING });
    try {
      const dateFormatted = formatDatePicker(startDate.$d);
      let inputs = values;
      inputs.dateOfBirth = dateFormatted;
      inputs.image = image;
      const res = await storeContestant(inputs);
      Swal.fire({
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 2000,
      });

      setImage({});
      setPreviewImage({});
      handleCloseEvent();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: JSON.stringify(error.errors),
      });
    }
    dispatch({ type: actions.END_LOADING });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setPreviewImage(URL.createObjectURL(selectedImage));
  };

  const handleCloseContestant = () => {
    setPreviewImage({});
    handleCloseEvent();
  };

  const textInput = [
    {
      name: "cotestant_number",
      label: "Contestant Order",
      md: 12,
    },
    {
      name: "name",
      label: "Name",
      md: 12,
    },
    {
      name: "municipality",
      label: "Municipality",
      md: 12,
    },
    {
      name: "age",
      label: "Age",
      md: 12,
    },
    {
      name: "weight",
      label: "Weight",
      md: 6,
    },
    {
      name: "height",
      label: "Height",
      md: 6,
    },
    {
      name: "bust",
      label: "Bust",
      md: 12,
    },
    {
      name: "waist",
      label: "Waist",
      md: 12,
    },
    {
      name: "hips",
      label: "Hips",
      md: 12,
    },
  ];

  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter name"),
    municipality: Yup.string().required("Please enter municipality"),
    age: Yup.string().required("Please enter age"),
    bust: Yup.string().required("Please enter bust"),
    waist: Yup.string().required("Please enter waist"),
    hips: Yup.string().required("Please enter hips"),
  });

  return (
    <Dialog
      open={openEvent}
      fullWidth={true}
      maxWidth="md"
      TransitionComponent={Transition}
    >
      <DialogTitle>Contestant Details</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{ ...contestant }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Grid container spacing={1} justifyContent="center" p={1}>
              <Card>
                <Stack
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="flex-start"
                  spacing={0}
                  p={2}
                >
                  <Grid item container md={4}>
                    <Grid item md={6}>
                      <label htmlFor="profilePhoto">
                        <input
                          accept="image/*"
                          id="profilePhoto"
                          type="file"
                          style={{ display: "none" }}
                          onChange={handleImageChange}
                          name="image"
                        />
                        <Avatar
                          src={
                            contestant.img
                              ? `${imgUrl}${contestant.img}`
                              : previewImage
                          }
                          sx={{ width: 250, height: 250, cursor: "pointer" }}
                        />
                      </label>
                    </Grid>
                  </Grid>
                  <Grid item container md={8} spacing={1}>
                    {textInput.map((item) => {
                      return (
                        <Grid item md={item.md ? item.md : 4} key={item.name}>
                          <TextfieldComponent
                            name={item.name}
                            label={item.label}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Stack>
              </Card>
            </Grid>
            <DialogActions>
              <ButtonSave />
              <ButtonCancel handleClose={handleCloseContestant} />
            </DialogActions>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default AddEditContestant;
