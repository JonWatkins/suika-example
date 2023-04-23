import { createRouter, Route } from "suika-router";
import { TodoList } from "./routes/TodoList";
import { NewTodo } from "./routes/NewTodo";
import { EditTodo } from "./routes/EditTodo";

export interface RouterOptions {
  mode: string;
  routes: Route[];
}

export const router = createRouter({
  mode: "hash",
  routes: [
    { path: "/", component: TodoList },
    { path: "/todo/create", component: NewTodo },
    { path: "/todo/:id", component: EditTodo },
  ],
} as RouterOptions);
