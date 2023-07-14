import { AppRootStateType } from "app/store";
import { createSelector } from "@reduxjs/toolkit";
import { FilterValuesType } from "features/TodolistsList/todolists/model/todolists-reducer";
import { TaskStatuses } from "common/enums";

export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn;
export const selectStatus = (state: AppRootStateType) => state.app.status;
export const selectIsInitialized = (state: AppRootStateType) => state.app.isInitialized;
export const selectTodoLists = (state: AppRootStateType) => state.todolists;
export const selectTasksById = (state: AppRootStateType, todoListId: string) => state.tasks[todoListId];

export const selectTasksByIdAndFilter = createSelector(
  [selectTasksById, (_1: unknown, _2: unknown, filter: FilterValuesType) => filter],
  (tasks, filter) => {
    if (filter === "completed") {
      return tasks.filter((t) => t.status === TaskStatuses.New);
    } else if (filter === "active") {
      return tasks.filter((t) => t.status === TaskStatuses.Completed);
    } else {
      return tasks;
    }
  }
);
