import { h, vNode, vAttrs } from "suika";
import { CardFooter } from "suika-ui";

export const Footer = (props: vAttrs, children: vNode[]): vNode => (
  <CardFooter className="text-center bg-light">{...children}</CardFooter>
);
