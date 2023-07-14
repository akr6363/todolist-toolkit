import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { AnyAction } from "redux";

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
    // setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
    //   console.log(current(state));
    //   state.status = action.payload.status;
    // },
    setAppInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action: AnyAction) => {
          return action.type.endsWith("/pending");
        },
        (state, action) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action: AnyAction) => {
          return action.type.endsWith("/rejected");
        },
        (state, action) => {
          state.status = "failed";
          if (action.type.includes("addTodolist")) return;
          if (action.payload) {
            state.error = action.payload.messages[0];
          } else {
            state.error = action.error.message ? action.error.message : "some occurred message";
          }
        }
      )
      .addMatcher(
        (action: AnyAction) => {
          return action.type.endsWith("/fulfilled");
        },
        (state, action) => {
          state.status = "succeeded";
        }
      );
  },
});

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export const appReducer = slice.reducer;
export const appActions = slice.actions;
