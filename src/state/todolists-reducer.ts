import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../App";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST",
  id: string
}

export type AddTodolistActionType = {
  type: "ADD-TODOLIST",
  title: string
  todolistId: string
}

export type ChandgeTodolistTitleActionType = {
  type: "CHANDGE-TODOLIST-TITLE",
  id: string,
  title: string
}

export type ChandgeTodolistFilterActionType = {
  type: "CHANDGE-TODOLIST-FILTER",
  id: string,
  filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChandgeTodolistTitleActionType | ChandgeTodolistFilterActionType


export const todolistsReducer = (
  state: Array<TodoListType>,
  action: ActionsType
): Array<TodoListType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((t) => t.id !== action.id);
    }
    case "ADD-TODOLIST": {
      let newTodoList: TodoListType = {
        id: action.todolistId,
        title: action.title,
        filter: "all",
      };
      return [...state, newTodoList];
    }
    case "CHANDGE-TODOLIST-TITLE": {
      const todoList = state.find((tl) => tl.id === action.id);
      if (todoList) {
        todoList.title = action.title;
      }
      return [...state];
    }
    case "CHANDGE-TODOLIST-FILTER":
      let findTodoList = state.find(tl => tl.id === action.id)
      if(findTodoList) {
        findTodoList.filter = action.filter
      }
      return [...state]
    default:
      throw new Error("I don't understand this action type");
  }
};


export const removeTodolistAC = (todoListId: string): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id: todoListId }
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", title, todolistId: v1() }
}

export const chandgeTodolistTitleAC = (id: string, title: string): ChandgeTodolistTitleActionType => {
  return { type: "CHANDGE-TODOLIST-TITLE", id, title }
}

export const chandgeTodolistFilterAC = (id: string, filter: FilterValuesType): ChandgeTodolistFilterActionType => {
  return { type: "CHANDGE-TODOLIST-FILTER", id, filter}
}