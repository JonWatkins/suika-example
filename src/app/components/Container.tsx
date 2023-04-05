import { h } from "suika";

export default (props: object, children: Array<any>) => (
  <div className="todo-list card">{...children}</div>
);
