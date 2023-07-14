import React, { ChangeEvent, FC, memo } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { EditableSpan } from "components/EditableSpan/EditableSpan";
import { Delete } from "@mui/icons-material";
import { TaskStatuses } from "common/enums";
import { TaskType } from "features/TodolistsList/tasks/api/tasks-api-types";
import { useActions } from "common/hooks/useActions";
import { tasksThunks } from "features/TodolistsList/tasks/model/tasks-reducer";

type Props = {
  task: TaskType;
  todolistId: string;
};
export const Task: FC<Props> = memo(({ task, todolistId }) => {
  const { removeTask, updateTask } = useActions(tasksThunks);
  const removeTaskHandler = () => removeTask({ taskId: task.id, todolistId: todolistId });

  const updateTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    updateTask({
      taskId: task.id,
      todolistId,
      domainModel: { status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New },
    });
  };

  const onTitleChangeHandler = (newValue: string) => {
    updateTask({
      taskId: task.id,
      todolistId,
      domainModel: { title: newValue },
    });
  };

  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
      <Checkbox
        checked={task.status === TaskStatuses.Completed}
        color="primary"
        onChange={updateTaskStatusHandler}
      />

      <EditableSpan value={task.title} onChange={onTitleChangeHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
