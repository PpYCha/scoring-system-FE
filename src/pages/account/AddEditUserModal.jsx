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

const AddEditUserModal = ({ open, onClose, onSubmit, title, fetchUsers }) => {
  const {
    state: { userAccount },
    dispatch,
  } = useValue();
  const actions = actionHelper();

  useEffect(() => {
    // dispatch({ type: actions.RESET_USER_ACCOUNT });
    console.log(userAccount);
  }, [open]);

  const handleSubmit = async (values, { setFieldError }) => {
    console.log(values);
    try {
      let res;
      if (userAccount.id) {
        res = await updateUser(userAccount.id, values);
      } else {
        res = await storeUser(values);
      }
      console.log(res);
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

  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter name"),
    email: Yup.string().required("Please enter email").email("Invalid email"),
    password: Yup.string()
      .required("Please enter password")
      .min(4, "Password should be minimum 4 characters long"),

    phoneNumber: Yup.number(),
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
          validationSchema={validationSchema}
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
                  <SelectComponent name="event" label="Event" options={event} />
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
const event = ["Miss Universe", "Mutya san Ibabao"];
