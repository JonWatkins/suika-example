import { Component, h } from "suika";
import { TodoItem, Todo } from "./Todo";
import TodoListForm from "./TodoListForm";
let id = 0;

const todos: Todo[] = [
  { id: ++id, content: "Eat" },
  { id: ++id, content: "Sleep" },
  { id: ++id, content: "Code" },
];

export default class TodoList extends Component {
  state = {
    todos,
  };

  remove(todo: Todo) {
    this.state.todos = this.state.todos.filter((i: Todo) => i.id !== todo.id);
  }

  add(content: string) {
    this.state.todos.push({
      id: ++id,
      content,
    });
  }

  render() {
    return (
      <section className="card-body">
        <TodoListForm add={(value: string) => this.add(value)} />
        <ul className="list-group">
          {...this.state.todos.map((todo: Todo) => (
            <TodoItem todo={todo} remove={(v: Todo) => this.remove(v)} />
          ))}
        </ul>
      </section>
    );
  }
}
