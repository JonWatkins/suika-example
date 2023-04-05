import { h } from "suika";
import { Card } from "suika-ui";

export default (props: object, children: Array<any>) => (
  <Card className="todo-list">{...children}</Card>
);
