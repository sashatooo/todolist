import { v1 } from "uuid";
import { FilterValuesType, TaskStateType, TodoListType } from "../App";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";

export type removeTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};

export type addTaskActionType = {
  type: "ADD-TASK";
  todolistId: string;
  titleTask: string;
};

export type changeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  todolistId: string;
  taskId: string;
  status: boolean
};

export type changeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  todolistId: string;
  taskId: string;
  title: string
};

type ActionsType = removeTaskActionType | addTaskActionType | changeTaskStatusActionType | changeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType;

export const tasksReducer = (
  state: TaskStateType,
  action: ActionsType
): TaskStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      let stateCopy = { ...state };
      let targetTasks = state[action.todolistId];
      let newTasks = targetTasks.filter((t) => t.id !== action.taskId);
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }
    case "ADD-TASK": {
      let stateCopy = { ...state };
      let newTask = { id: v1(), title: action.titleTask, isDone: false };
      let targetTasks = stateCopy[action.todolistId];
      let newTasks = [newTask, ...targetTasks];
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }
    case "CHANGE-TASK-STATUS": {
      let stateCopy = { ...state };
      let targetTasks = stateCopy[action.todolistId]
      let task = targetTasks.find(t => t.id === action.taskId)
      if(task) {
        task.isDone = action.status
      }
      return stateCopy;
    }
    case "CHANGE-TASK-TITLE": {
      let stateCopy = { ...state };
      let targetTasks = stateCopy[action.todolistId]
      let task = targetTasks.find(t => t.id === action.taskId)
      if(task) {
        task.title = action.title
      }
      return stateCopy;
    }
    case "ADD-TODOLIST": {
      let stateCopy = { ...state };
      stateCopy[action.todolistId] = []
      return stateCopy;
    }
    case "REMOVE-TODOLIST": {
      let stateCopy = { ...state };
      delete stateCopy[action.id]
      return stateCopy;
    }
    default:
      throw new Error("I don't understand this action type");
  }
};

export const removeTaskAC = (
  todolistId: string,
  taskId: string
): removeTaskActionType => {
  return { type: "REMOVE-TASK", taskId, todolistId };
};

export const addTaskAC = (
  todolistId: string,
  titleTask: string
): addTaskActionType => {
  return { type: "ADD-TASK", todolistId, titleTask };
};

export const changeTaskStatusAC = (
  todolistId: string,
  taskId: string,
  status: boolean
): changeTaskStatusActionType => {
  return { type: "CHANGE-TASK-STATUS", todolistId, taskId, status };
};

export const changeTaskTitleAC = (
  todolistId: string,
  taskId: string,
  title: string
): changeTaskTitleActionType => {
  return { type: "CHANGE-TASK-TITLE", todolistId, taskId, title };
};