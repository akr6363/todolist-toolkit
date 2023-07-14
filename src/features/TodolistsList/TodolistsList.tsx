import React, { useCallback, useEffect } from "react";
import {
  FilterValuesType,
  todolistsActions,
  todolistsThunks,
} from "features/TodolistsList/todolists/model/todolists-reducer";
import { tasksThunks } from "features/TodolistsList/tasks/model/tasks-reducer";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "components/AddItemForm/AddItemForm";
import { Todolist } from "./todolists/Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn, selectTodoLists } from "app/app-selectors";
import { TaskStatuses } from "common/enums";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { useActions } from "common/hooks/useActions";

type PropsType = {
  demo?: boolean;
};

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
  const todolists = useAppSelector(selectTodoLists);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const { fetchTodolists, addTodolist: addTodolistThunk } = useActions(todolistsThunks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    fetchTodolists();
  }, []);

  const addTodolist = useCallback((title: string) => {
    return dispatch(todolistsThunks.addTodolist({ title })).unwrap();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist todolist={tl} demo={demo} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
