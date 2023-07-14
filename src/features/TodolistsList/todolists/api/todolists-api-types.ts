import { TaskPriorities, TaskStatuses } from "common/enums";

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
