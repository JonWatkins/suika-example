import { h, vNode, vAttrs } from "suika";
import { Card } from "suika-ui";

export const Container = (props: vAttrs, children: vNode[]): vNode => (
  <Card className="todo-list">{...children}</Card>
);
