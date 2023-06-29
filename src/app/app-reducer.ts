import { authAPI } from "../api/todolists-api";
import { authActions } from "features/Login/auth-reducer";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
};

export type AppInitialStateType = typeof initialState;

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      console.log(current(state));
      state.status = action.payload.status;
    },
    setAppInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized;
    },
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export const initializeAppTC = (): AppThunk => (dispatch) => {
  authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedInAC({ isLoggedIn: true }));
    } else {
    }
    dispatch(appActions.setAppInitializedAC({ isInitialized: true }));
  });
};
