import { h, vNode } from "suika";
import { Button, ListGroupItem } from "suika-ui";
import { removeTodo } from "../state";

export type Todo = {
  id: number;
  content: string;
};

export type TodoProps = {
  todo: Todo;
};

export const TodoItem = ({ todo }: TodoProps): vNode => (
  <ListGroupItem>
    <div className="d-flex">
      <div className="flex-grow">{todo.content}</div>
      <Button color="danger" size="sm" onclick={() => removeTodo(todo)}>
        Delete
      </Button>
    </div>
  </ListGroupItem>
);
