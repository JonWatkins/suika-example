import { Component, h, isDef, vNode } from "suika";
import { ListGroup, CardBody } from "suika-ui";
import { TodoItem, Todo } from "./Todo";
import { TodoListForm } from "./TodoListForm";

let id = 0;

const todos: Todo[] = [
  { id: ++id, content: "Eat" },
  { id: ++id, content: "Sleep" },
  { id: ++id, content: "Code" },
];

export class TodoList extends Component {
  state = {
    todos,
  };

  public remove(todo: Todo): void {
    this.state.todos = this.state.todos.filter((i: Todo) => i.id !== todo.id);
  }

  public add(content: string): void {
    if (isDef(content)) {
      this.state.todos.push({
        id: ++id,
        content,
      });
    }
  }

  public render(): vNode {
    return (
      <CardBody>
        <TodoListForm add={(value: string) => this.add(value)} />
        <ListGroup>
          {...this.state.todos.map((todo: Todo) => (
            <TodoItem todo={todo} remove={(v: Todo) => this.remove(v)} />
          ))}
        </ListGroup>
      </CardBody>
    );
  }
}
