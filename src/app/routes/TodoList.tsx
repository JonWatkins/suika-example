import { Component, h, vNode } from "suika";
import { ListGroup } from "suika-ui";
import { RouterLink } from "suika-router";
import { TodoItem } from "../components/Todo";
import { todos, Todo } from "../state";

export class TodoList extends Component {
  state = todos;

  public render(): vNode {
    return (
      <div id="todoList">
        <div className="d-flex mb-3">
          <RouterLink
            to="/todo/create"
            className="btn btn-primary btn-sm ml-auto"
          >
            Create Todo
          </RouterLink>
        </div>
        <ListGroup>
          {...this.state.value.list.map((todo: Todo) => (
            <TodoItem todo={todo} />
          ))}
        </ListGroup>
      </div>
    );
  }
}
