import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

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

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export const appReducer = slice.reducer;
export const appActions = slice.actions;
