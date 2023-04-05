import { mount } from "suika";
import App from "./app/App";
import "./scss/styles.scss";

const el = document.querySelector("#app");
mount(App, el as HTMLElement);
