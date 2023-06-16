import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { useValue } from "../../context/ContextProvider";

import TextfieldComponent from "../../components/TextFieldComponent";

import { showUser, storeUser, updateUser } from "../../api/userController";
import Swal from "sweetalert2";
import SelectComponent from "../../components/SelectComponent";
import actionHelper from "../../context/actionHelper";
import { showEvent } from "../../api/eventController";

const AddEditUserModal = ({
  open,
  onClose,
  onSubmit,
  title,
  fetchUsers,
  eventOption,
}) => {
  const [event, setEvent] = useState([]);

  const {
    state: { userAccount },
    dispatch,
  } = useValue();
  const actions = actionHelper();

  useEffect(() => {}, [open]);

  const handleSubmit = async (values, { setFieldError }) => {
    try {
      const resEventId = await showEvent(values.event);
      values.event = resEventId.data.event.id;

      let res;
      if (userAccount.id) {
        res = await updateUser(userAccount.id, values);
      } else {
        res = await storeUser(values);
      }

      Swal.fire({
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });

      fetchUsers();

      onClose();
    } catch (error) {
      if (error.errors.email[0] === "The email has already been taken.") {
        setFieldError("email", "The email has already been taken.");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: JSON.stringify(error.errors),
        });
      }
    }
  };

  const validationSchemaCreate = Yup.object({
    name: Yup.string().required("Please enter name"),
    email: Yup.string().required("Please enter email").email("Invalid email"),
    password: Yup.string()
      .required("Please enter password")
      .min(4, "Password should be minimum 4 characters long"),
    status: Yup.string().required("Please select status"),
    role: Yup.string().required("Please select role"),
  });

  const validationSchemaUpdate = Yup.object({
    name: Yup.string().required("Please enter name"),
    email: Yup.string().required("Please enter email").email("Invalid email"),
    password: Yup.string().min(
      4,
      "Password should be minimum 4 characters long"
    ),
    status: Yup.string().required("Please select status"),
    role: Yup.string().required("Please select role"),
  });

  const textInput = [
    {
      name: "name",
      label: "Name",
      helperText: "ex:(Firstname, Middle Initial, Lastname)",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
    },
    {
      name: "contactNumber",
      label: "Contact Number",
    },
  ];

  return (
    <Dialog open={open} fullWidth={true} maxWidth={"xl"}>
      <DialogTitle textAlign="center">{title}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            ...userAccount,
          }}
          validationSchema={
            title === "Create Account"
              ? validationSchemaCreate
              : validationSchemaUpdate
          }
          onSubmit={handleSubmit}
        >
          <Form>
            <Box p={2}>
              <Grid container spacing={2} justifyContent="center">
                {textInput.map((item, index) => {
                  return (
                    <Grid item md={4} key={index}>
                      <TextfieldComponent
                        name={item.name}
                        label={item.label}
                        {...item}
                      />
                    </Grid>
                  );
                })}

                <Grid item md={4}>
                  <SelectComponent name="role" label="Role" options={role} />
                </Grid>
                <Grid item md={4}>
                  <SelectComponent
                    name="status"
                    label="Status"
                    options={status}
                  />
                </Grid>
                <Grid item md={4}>
                  <SelectComponent
                    name="event"
                    label="Event"
                    options={eventOption}
                  />
                </Grid>
              </Grid>
            </Box>

            <DialogActions sx={{ p: "1.25rem" }}>
              <Button color="success" variant="contained" type="submit">
                {title}
              </Button>
              <Button color="error" variant="contained" onClick={onClose}>
                Cancel
              </Button>
            </DialogActions>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditUserModal;

const status = ["Active", "InActive"];
const role = ["Admin", "Tabulator", "Judge"];
// const event = ["Miss Universe", "Mutya san Ibabao"];
