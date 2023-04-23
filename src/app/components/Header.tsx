import { h, vNode, vAttrs } from "suika";
import { CardHeader } from "suika-ui";

export const Header = (props: vAttrs, children: vNode[]): vNode => (
  <CardHeader className="bg-light">{...children}</CardHeader>
);
