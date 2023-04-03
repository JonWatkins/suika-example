import { Component } from "suika";
import Todo from "./Todo";
import TodoListForm from "./TodoListForm";
let id = 0;

export default class TodoList extends Component {
  state = {
    todos: [
      { id: ++id, content: "Eat" },
      { id: ++id, content: "Sleep" },
      { id: ++id, content: "Code" },
    ],
  };

  remove(todo) {
    this.state.todos = this.state.todos.filter((i) => i.id !== todo.id);
  }

  add(content) {
    this.state.todos.push({
      id: ++id,
      content,
    });
  }

  render() {
    return (
      <section className="card-body">
        <TodoListForm add={(value) => this.add(value)} />
        <ul className="list-group">
          {...this.state.todos.map((todo) => (
            <Todo todo={todo} remove={(v) => this.remove(v)} />
          ))}
        </ul>
      </section>
    );
  }
}
