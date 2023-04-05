import { h } from "suika";
import { CardFooter } from "suika-ui";

export default (props: object, children: Array<any>) => (
  <CardFooter className="text-center bg-light">{...children}</CardFooter>
);
