import { h } from "suika";
import { CardHeader } from "suika-ui";

export default (props: object, children: Array<any>) => (
  <CardHeader className="bg-light">{...children}</CardHeader>
);
