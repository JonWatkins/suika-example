import { Component } from "suika";

export default class Footer extends Component {
  constructor() {
    super();
  }

  onMounted() {
    console.log("input mounted");
  }

  state = {
    value: "",
  };

  onUpdated() {
    console.log("input updated");
  }

  render() {
    return (
      <form>
        <input
          key="input"
          style={`color: ${this.state.value.length > 4 ? "red" : "inherit"}`}
          value={this.state.value}
          oninput={(e) => (this.state.value = e.target.value)}
        />
        <p key="value">{this.state.value}</p>
      </form>
    );
  }
}
