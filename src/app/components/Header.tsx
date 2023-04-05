import { h } from "suika";
import { CardHeader } from "suika-ui";
import type { vNode, vAttrs } from "suika/dist/vdom";

export const Header = (props: vAttrs, children: vNode[]): vNode => (
  <CardHeader className="bg-light">{...children}</CardHeader>
);
