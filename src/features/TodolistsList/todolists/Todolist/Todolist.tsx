import React, { FC, memo, useCallback } from "react";
import { AddItemForm } from "components/AddItemForm/AddItemForm";
import { EditableSpan } from "components/EditableSpan/EditableSpan";
import { Task } from "features/TodolistsList/tasks/Task/Task";
import {
  FilterValuesType,
  TodolistDomainType,
  todolistsActions,
  todolistsThunks,
} from "features/TodolistsList/todolists/model/todolists-reducer";
import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { selectTasksByIdAndFilter } from "app/app-selectors";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { useActions } from "common/hooks/useActions";
import { tasksThunks } from "features/TodolistsList/tasks/model/tasks-reducer";

type Props = {
  todolist: TodolistDomainType;
  demo?: boolean;
};

export const Todolist: FC<Props> = memo(function ({ demo = false, todolist }) {
  const { changeTodolistTitle, removeTodolist } = useActions(todolistsThunks);
  const { addTask } = useActions(tasksThunks);
  const { changeTodolistFilterAC } = useActions(todolistsActions);
  const dispatch = useAppDispatch();

  const tasks = useAppSelector((state) => selectTasksByIdAndFilter(state, todolist.id, todolist.filter));

  const addTaskHandler = (title: string) => {
    return dispatch(tasksThunks.addTask({ title, todolistId: todolist.id })).unwrap();
  };

  const removeTodolistHandler = () => {
    removeTodolist({ todolistId: todolist.id });
  };

  const changeTodolistTitleHandler = useCallback(
    (title: string) => {
      changeTodolistTitle({ id: todolist.id, title });
    },
    [todolist.id]
  );

  const onAllClickHandler = () => changeTodolistFilterAC({ filter: "all", id: todolist.id });

  const onActiveClickHandler = () => changeTodolistFilterAC({ filter: "active", id: todolist.id });
  const onCompletedClickHandler = () => changeTodolistFilterAC({ filter: "completed", id: todolist.id });

  return (
    <div>
      <h3>
        <EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler} />
        <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === "loading"} />
      <div>
        {tasks.map((t) => (
          <Task key={t.id} task={t} todolistId={todolist.id} />
        ))}
      </div>
      <div style={{ paddingTop: "10px" }}>
        <Button
          variant={todolist.filter === "all" ? "outlined" : "text"}
          onClick={onAllClickHandler}
          color={"inherit"}
        >
          All
        </Button>
        <Button
          variant={todolist.filter === "active" ? "outlined" : "text"}
          onClick={onActiveClickHandler}
          color={"primary"}
        >
          Active
        </Button>
        <Button
          variant={todolist.filter === "completed" ? "outlined" : "text"}
          onClick={onCompletedClickHandler}
          color={"secondary"}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
