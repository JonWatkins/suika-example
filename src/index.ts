import { mount } from "suika";
import App from "./app/App";
import "./scss/styles.scss";

const el = document.querySelector("#app");
window.app = mount(App, el);
