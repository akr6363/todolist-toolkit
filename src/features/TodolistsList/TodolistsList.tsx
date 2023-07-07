import React, { useCallback, useEffect } from "react";
import { FilterValuesType, todolistsActions, todolistsThunks } from "./todolists-reducer";
import { tasksThunks } from "./tasks-reducer";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "components/AddItemForm/AddItemForm";
import { Todolist } from "./Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn, selectTodoLists } from "app/app-selectors";
import { TaskStatuses } from "common/enums";
import { useAppSelector } from "common/hooks";
import { useActions } from "common/hooks/useActions";

type PropsType = {
  demo?: boolean;
};

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
  const todolists = useAppSelector(selectTodoLists);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const {
    fetchTodolists,
    changeTodolistTitle: changeTodolistTitleThunk,
    removeTodolist: removeTodolistThunk,
    addTodolist: addTodolistThunk,
  } = useActions(todolistsThunks);
  const {
    removeTask: removeTaskThunk,
    addTask: addTaskThunk,
    updateTask,
    fetchTasks,
  } = useActions(tasksThunks);

  const { changeTodolistFilterAC } = useActions(todolistsActions);

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    fetchTodolists();
  }, []);

  const removeTask = useCallback(function (id: string, todolistId: string) {
    removeTaskThunk({ taskId: id, todolistId });
  }, []);

  const addTask = useCallback(function (title: string, todolistId: string) {
    addTaskThunk({ title, todolistId });
  }, []);

  const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
    const payload = {
      taskId: id,
      domainModel: {
        status,
      },
      todolistId,
    };
    updateTask(payload);
  }, []);

  const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
    const payload = {
      taskId: id,
      domainModel: {
        title: newTitle,
      },
      todolistId,
    };
    updateTask(payload);
  }, []);

  const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
    changeTodolistFilterAC({ id: todolistId, filter: value });
  }, []);

  const removeTodolist = useCallback(function (id: string) {
    removeTodolistThunk({ todolistId: id });
  }, []);

  const changeTodolistTitle = useCallback(function (id: string, title: string) {
    changeTodolistTitleThunk({ id, title });
  }, []);

  const addTodolist = useCallback((title: string) => {
    addTodolistThunk({ title });
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
          // let allTodolistTasks = tasks[tl.id];
          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  todolist={tl}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                  demo={demo}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
