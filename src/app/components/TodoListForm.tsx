import { Component, h } from "suika";

export default class TodoListForm extends Component {
  state = {
    newTodo: "",
  };

  render() {
    return (
      <form className="mb-3">
        <div className="input-group">
          <input
            key="input"
            className="form-control"
            value={this.state.newTodo}
            onblur={(e: Event) => {
              const { target } = e;
              if (target) {
                this.state.newTodo = (target as HTMLInputElement).value;
              }
            }}
          />
          <button
            className="btn btn-primary"
            onclick={(e: Event) => {
              e.preventDefault();
              this.attrs.add(this.state.newTodo);
              this.state.newTodo = "";
            }}
          >
            Add Todo
          </button>
        </div>
      </form>
    );
  }
}
