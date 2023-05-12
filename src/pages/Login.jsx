import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { Field, Form, Formik } from "formik";

import { loginUser } from "../api/loginController";
import Swal from "sweetalert2";

import actionHelper from "../context/actionHelper";
import { useValue } from "../context/ContextProvider";
import { navigateEvents } from "../utils/navigateUrl";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const { dispatch } = useValue();
  const actions = actionHelper();
  const navigate = useNavigate();

  const handleSubmit = async (value) => {
    try {
      const res = await loginUser(value);

      if (res.data.status === 200) {
        localStorage.setItem("currentUser", JSON.stringify(res.data.data));

        dispatch({ type: actions.UPDATE_C_USER, payload: res.data.data });
        navigate(navigateEvents);
      } else {
        Swal.fire({
          icon: "error",
          title: "Incorrect Email or Password",
          showConfirmButton: false,
        });
      }
    } catch (error) {}
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Please enter email").email("Invalid email"),
    password: Yup.string()
      .required("Please enter password")
      .min(4, "Password should be minimum 4 characters long"),
  });

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          maxWidth: 480,
          margin: "auto",
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          padding: (12, 0),
        }}
      >
        <Paper elevation={24}>
          <Box
            sx={{
              display: "flex",

              maxWidth: "100%",
              justifyContent: "center",
            }}
          >
            {/* <Box component="img" src={logo} /> */}
          </Box>
          <Box padding={2}>
            <Typography variant="h4" gutterBottom>
              Sign in
            </Typography>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, isValid, touched, dirty }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        name="email"
                        type="email"
                        as={TextField}
                        variant="outlined"
                        color="primary"
                        label="Email"
                        fullWidth
                        inputRef={emailRef}
                        error={Boolean(errors.email) && Boolean(touched.email)}
                        helperText={Boolean(touched.email) && errors.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="password"
                        type="password"
                        as={TextField}
                        variant="outlined"
                        color="primary"
                        label="Password"
                        fullWidth
                        inputRef={passwordRef}
                        error={
                          Boolean(errors.password) && Boolean(touched.password)
                        }
                        helperText={
                          Boolean(touched.password) && errors.password
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                      >
                        LOGIN
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
