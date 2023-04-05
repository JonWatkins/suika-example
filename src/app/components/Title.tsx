import { h } from "suika";
import { CardTitle } from "suika-ui";
import type { vNode, vAttrs } from "suika/dist/vdom";

export const Title = ({ text }: vAttrs): vNode => (
  <CardTitle is="h1">{text}</CardTitle>
);
