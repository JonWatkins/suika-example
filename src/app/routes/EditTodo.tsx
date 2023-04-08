import { h, Component } from "suika";
import { vNode } from "suika/dist/vdom";

export class EditTodo extends Component {
  render(): vNode {
    return h("div", {}, "Edit Todo");
  }
}
