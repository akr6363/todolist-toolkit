import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";
import { appActions } from "app/app-reducer";
import { authAPI, LoginParamsType } from "features/Login/auth-api";
import { handleServerAppError, handleServerNetworkError } from "common/utils";
import { clearData } from "common/actions";

const initialState = {
  isLoggedIn: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const authReducer = slice.reducer;
//export const { setIsLoggedInAC } = slice.actions;
export const authActions = slice.actions;

// thunks

export const loginTC =
  (data: LoginParamsType): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatusAC({ status: "loading" }));
    authAPI
      .login(data)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(authActions.setIsLoggedInAC({ isLoggedIn: true }));
          dispatch(appActions.setAppStatusAC({ status: "succeeded" }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
export const logoutTC = (): AppThunk => (dispatch) => {
  dispatch(appActions.setAppStatusAC({ status: "loading" }));
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedInAC({ isLoggedIn: false }));
        dispatch(appActions.setAppStatusAC({ status: "succeeded" }));
        dispatch(clearData());
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
