import { h } from "suika";

type props = {
  text: string;
};

export default ({ text }: props) => (
  <div className="card-title">
    <h2>
      <i className="bi bi-check2-square me-3"></i>
      {text}
    </h2>
  </div>
);
