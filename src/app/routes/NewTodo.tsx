import { h, Component } from "suika";
import { vNode } from "suika/dist/vdom";
import { TodoListForm } from "../components/TodoListForm";

export class NewTodo extends Component {
  public render(): vNode {
    return <TodoListForm />;
  }
}
