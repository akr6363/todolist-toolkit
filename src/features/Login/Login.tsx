import React from "react";
import { FormikHelpers, useFormik } from "formik";
import { useSelector } from "react-redux";
import { AppRootStateType } from "app/store";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
} from "@mui/material";
import { authThunks } from "features/Login/auth-reducer";
import { LoginParamsType } from "features/Login/auth-api";

import { ResponseType } from "common/types";
import { useActions } from "common/hooks/useActions";

type LoginFormErrorsType = {
  email: string;
  password: string;
};

export const Login = () => {
  const dispatch = useAppDispatch();
  // const {login} = useActions(authThunks)

  const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn);

  const formik = useFormik({
    validate: (values) => {
      let errors = {} as LoginFormErrorsType;
      if (!values.email) {
        errors.email = "Email is required";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      return errors;
    },
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (values, formikHelpers: FormikHelpers<LoginParamsType>) => {
      dispatch(authThunks.login(values))
        .unwrap()
        .then((res) => {})
        .catch((reason: ResponseType) => {
          if (reason.fieldsErrors) {
            reason.fieldsErrors.forEach((error) => {
              formikHelpers.setFieldError(error.field, error.error);
            });
          }
        });
    },
  });

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={4}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered{" "}
                <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p> Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
              {formik.errors.email ? <div>{formik.errors.email}</div> : null}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password ? <div>{formik.errors.password}</div> : null}
              <FormControlLabel
                label={"Remember me"}
                control={
                  <Checkbox {...formik.getFieldProps("rememberMe")} checked={formik.values.rememberMe} />
                }
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
