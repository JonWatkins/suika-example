import { h } from "suika";
import { Button, ListGroupItem } from "suika-ui";

export type Todo = {
  id: number;
  content: string;
};

export type TodoProps = {
  todo: Todo;
  remove: Function;
};

export const TodoItem = ({ todo, remove }: TodoProps) => (
  <ListGroupItem>
    <div className="d-flex">
      <div className="flex-grow">{todo.content}</div>
      <Button color="danger" size="sm" onclick={() => remove(todo)}>
        Delete
      </Button>
    </div>
  </ListGroupItem>
);
