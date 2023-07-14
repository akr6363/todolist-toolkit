import { AppDispatch, AppRootStateType } from "app/store";
import { handleServerNetworkError } from "common/utils/handle-server-network-error";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";

import { ResponseType } from "common/types";
import { appActions } from "app/app-reducer";

/**

 Wraps a thunk function with try-catch error handling and dispatches appropriate actions to update application state
 @async
 @param {BaseThunkAPI<AppRootStateType, any, AppDispatch, null | ResponseType>} thunkAPI - The BaseThunkAPI object provided by the Redux Toolkit
 @param {Function} logic - The thunk function to be wrapped
 @returns {Promise<null|ResponseType>} - A Promise that resolves with the response data or rejects with a null value
 */

export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<AppRootStateType, any, AppDispatch, null | ResponseType>,
  logic: Function
) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  // dispatch(appActions.setAppStatusAC({ status: "loading" }));
  try {
    return await logic();
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  } finally {
    // в handleServerNetworkError можно удалить убирание крутилки
    // dispatch(appActions.setAppStatusAC({ status: "idle" }));
  }
};
