import { Reactive } from "suika";

let id = 0;

export type Todo = {
  id: number;
  content: string;
};

export const todos = new Reactive({
  list: [
    { id: ++id, content: "Eat" },
    { id: ++id, content: "Sleep" },
    { id: ++id, content: "Code" },
  ] as Todo[],
});

export const addTodo = (content: string) => {
  todos.value.list.push({
    id: ++id,
    content,
  });
};

export const removeTodo = (todo: Todo) => {
  todos.value.list = todos.value.list.filter(
    (i: Todo): boolean => i.id !== todo.id
  );
};
