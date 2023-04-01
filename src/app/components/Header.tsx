import { Component } from "suika";

export default class Header extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <header key="header" className="card-header my-0">
        <h1>
          <i className="bi bi-check2-square"></i>
          <span key="title">{this.props.title}</span>
        </h1>
      </header>
    );
  }
}
