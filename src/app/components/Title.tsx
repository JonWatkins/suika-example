import { h } from "suika";
import { CardTitle } from "suika-ui";

type props = {
  text: string;
};

export default ({ text }: props) => <CardTitle is="h1">{text}</CardTitle>;
