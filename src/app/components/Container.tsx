import { h } from "suika";
import { Card } from "suika-ui";
import type { vNode, vAttrs } from "suika/dist/vdom";

export const Container = (props: vAttrs, children: vNode[]): vNode => (
  <Card className="todo-list">{...children}</Card>
);
