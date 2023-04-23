import { h, vNode, vAttrs } from "suika";
import { CardTitle } from "suika-ui";

export const Title = ({ text }: vAttrs): vNode => (
  <CardTitle is="h1">{text}</CardTitle>
);
