import { Dispatch } from "redux";
import { appActions } from "app/app-reducer";
import axios, { AxiosError } from "axios";

// export const _handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
//   dispatch(appActions.setAppErrorAC({ error: error.message ? error.message : "Some error occurred" }));
//   dispatch(appActions.setAppStatusAC({ status: "failed" }));
// };

/**

 Handles server network errors and dispatches appropriate actions to update application state
 @param {unknown} e - The error object thrown by the server
 @param {Dispatch} dispatch - The dispatch function provided by the Redux store
 @returns {void}
 */

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
  const err = e as Error | AxiosError<{ error: string }>;
  if (axios.isAxiosError(err)) {
    const error = err.message ? err.message : "Some error occurred";
    dispatch(appActions.setAppErrorAC({ error }));
  } else {
    dispatch(appActions.setAppErrorAC({ error: `Native error ${err.message}` }));
  }
  //dispatch(appActions.setAppStatusAC({ status: "failed" }));
};
