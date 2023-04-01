import { Suika } from "suika";
import Header from "./components/Header";
import TodoList from "./components/TodoList";

export default class MyApp extends Suika {
  constructor() {
    super();
  }

  state = {
    title: "To Do List",
  };

  render() {
    return (
      <div key="root">
        <div className="todo-list card">
          <Header title={this.state.title} />
          <TodoList title={this.state.title} />
        </div>
      </div>
    );
  }
}
