import { h, Component, vNode } from "suika";
import { TodoListForm } from "../components/TodoListForm";

export class NewTodo extends Component {
  public render(): vNode {
    return <TodoListForm />;
  }
}
