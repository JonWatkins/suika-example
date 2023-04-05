import { h } from "suika";
import { CardFooter } from "suika-ui";
import type { vNode, vAttrs } from "suika/dist/vdom";

export const Footer = (props: vAttrs, children: vNode[]): vNode => (
  <CardFooter className="text-center bg-light">{...children}</CardFooter>
);
