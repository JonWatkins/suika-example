import { h } from "suika";

export type Todo = {
  id: number;
  content: string;
};

export type TodoProps = {
  todo: Todo;
  remove: Function;
};

export const TodoItem = ({ todo, remove }: TodoProps) => (
  <li className="list-group-item">
    <div className="d-flex">
      <div className="flex-grow">{todo.content}</div>
      <button className="btn btn-danger" onclick={() => remove(todo)}>
        Delete
      </button>
    </div>
  </li>
);
