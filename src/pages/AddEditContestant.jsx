import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Input,
  Stack,
  Tooltip,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import ButtonCancel from "../components/Button/ButtonCancel";
import ButtonSave from "../components/Button/ButtonSave";
import * as Yup from "yup";

import dayjs from "dayjs";
import TextfieldComponent from "../components/TextFieldComponent";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { storeEvent } from "../api/eventController";
import Swal from "sweetalert2";
import { formatDatePicker } from "../utils/formatter";

import { indexContestants, storeContestant } from "../api/contestantController";
import MaterialReactTable from "material-react-table";
import { CropDin, Delete, Edit } from "@mui/icons-material";
import { useValue } from "../context/ContextProvider";
import actionHelper from "../context/actionHelper";

const AddEditContestant = ({ openEvent, handleCloseEvent }) => {
  const [startDate, setStartDate] = useState(dayjs());
  const [tableList, setTableList] = useState([{}]);
  const [image, setImage] = useState(null);

  const {
    state: { contestant },
    dispatch,
  } = useValue();

  const actions = actionHelper();

  useEffect(() => {
    fetch();
  }, [openEvent]);

  const fetch = async () => {
    const res = await indexContestants();
    const filteredList = res.filter(
      (item) => item.event_id === contestant.event_id
    );

    setTableList(filteredList);
  };

  const handleSubmit = async (values) => {
    try {
      const dateFormatted = formatDatePicker(startDate.$d);
      let inputs = values;
      inputs.dateOfBirth = dateFormatted;

      const res = await storeContestant(inputs);
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

  const handleEdit = async () => {};
  const handleDelete = async () => {};

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpload = () => {
    // Code to save the image to the server or cloud storage goes here
    console.log("Image uploaded successfully");
  };

  const textInput = [
    {
      name: "name",
      label: "Name",
      md: 6,
    },
    {
      name: "municipality",
      label: "Municipality",
      md: 6,
    },
    {
      name: "weight",
      label: "Weight",
      md: 3,
    },
    {
      name: "height",
      label: "Height",
      md: 3,
    },
    {
      name: "shoeSize",
      label: "Shoe Size",
      md: 3,
    },
    {
      name: "swimsuitSize",
      label: "Swimsuit Size",
      md: 3,
    },
    {
      name: "bust",
      label: "Bust",
      md: 3,
    },
    {
      name: "waist",
      label: "Waist",
      md: 3,
    },
    {
      name: "hips",
      label: "Hips",
      md: 3,
    },
    {
      name: "nickname",
      label: "Nickname",
      md: 3,
    },

    {
      name: "birthPlace",
      label: "Birth Place",
      md: 3,
    },
    {
      name: "age",
      label: "Age",
      md: 3,
    },
  ];

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "municipality",
        header: "Municipality",
      },
      {
        accessorKey: "weight",
        header: "Weight",
      },
      {
        accessorKey: "height",
        header: "Height",
      },
      {
        accessorKey: "shoeSize",
        header: "Shoe Size",
      },
      {
        accessorKey: "swimsuitSize",
        header: "Swimsuit Size",
      },
      {
        accessorKey: "bust",
        header: "Bust",
      },
      {
        accessorKey: "waist",
        header: "Waist",
      },
      {
        accessorKey: "hips",
        header: "Hips",
      },
      {
        accessorKey: "nickname",
        header: "Nickname",
      },

      {
        accessorKey: "birthPlace",
        header: "Birth Place",
      },
      {
        accessorKey: "age",
        header: "Age",
      },
    ],
    []
  );

  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter name"),
    municipality: Yup.string().required("Please enter municipality"),
    age: Yup.string().required("Please enter age"),
    weight: Yup.string().required("Please enter weight"),
    height: Yup.string().required("Please enter height"),
    shoeSize: Yup.string().required("Please enter shoe size"),
    swimsuitSize: Yup.string().required("Please enter swimsuit size"),
    bust: Yup.string().required("Please enter bust"),
    waist: Yup.string().required("Please enter waist"),
    hips: Yup.string().required("Please enter hips"),
    nickname: Yup.string().required("Please enter nickname"),
    birthPlace: Yup.string().required("Please enter birth place"),
  });

  return (
    <Dialog open={openEvent} fullWidth={true} maxWidth="xl">
      <DialogContent>
        <Formik
          initialValues={{ ...contestant }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Grid container spacing={1} justifyContent="center" p={1}>
              <Stack
                direction="row"
                justifyContent="space-evenly"
                alignItems="flex-start"
                spacing={0}
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
                      />
                      <Avatar
                        src={"../../.assets/noImage.png"}
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

                  <Grid item md={3}>
                    <DesktopDatePicker
                      name="apDate"
                      label="Date of Birth"
                      inputFormat="DD/MM/YYYY"
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                      slotProps={{ textField: { size: "small" } }}
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                </Grid>
              </Stack>
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
                  pageSize={30}
                  enableDensityToggle={false}
                  enableFullScreenToggle={false}
                  enableHiding={false}
                  renderRowActions={({ row, table }) => (
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                      <Tooltip arrow placement="left" title="Criteria">
                        <IconButton
                          color="secondary"
                          onClick={(e) => handleEdit(row)}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
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
  );
};

export default AddEditContestant;
