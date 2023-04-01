import { Component } from "suika";
import Todo from "./Todo";

let id = 0;

export default class TodoList extends Component {
  constructor() {
    super();
  }

  state = {
    newTodo: "",
    todos: [
      { id: ++id, content: "Eat" },
      { id: ++id, content: "Sleep" },
      { id: ++id, content: "Code" },
    ],
  };

  remove(todo) {
    this.state.todos = this.state.todos.filter((i) => i.id !== todo.id);
  }

  add(e) {
    e.preventDefault();
    this.state.todos.push({
      id: ++id,
      content: this.state.newTodo,
    });
    this.state.newTodo = "";
  }

  render() {
    return (
      <section key="todos" className="card-body">
        <form key="form" className="mb-3">
          <div key="input-group" className="input-group">
            <input
              key="input"
              className="form-control"
              value={this.state.newTodo}
              onblur={(e) => (this.state.newTodo = e.target.value)}
            />
            <button
              key="add"
              className="btn btn-outline-primary"
              onclick={(e) => this.add(e)}
            >
              <i className="bi bi-plus-lg"></i>
              Add Todo
            </button>
          </div>
        </form>
        <ul key="todos" className="list-group">
          {...this.state.todos.map((todo) => (
            <li key={todo.id} className="list-group-item d-flex">
              <div className="flex-fill lead">{todo.content}</div>
              <button
                className="btn btn-danger"
                onclick={() => this.remove(todo)}
              >
                <i className="bi bi-trash3"></i>
              </button>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}
