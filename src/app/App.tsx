import { Component, h, vNode } from "suika";
import { CardBody } from "suika-ui";
import { RouterView } from "suika-router";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { Title } from "./components/Title";
import { Footer } from "./components/Footer";
import { router } from "./router";

export class App extends Component {
  public render(): vNode {
    return (
      <Container>
        <Header>
          <Title text="Todo List" />
        </Header>
        <CardBody>
          <RouterView router={router} />
        </CardBody>
        <Footer>
          <small>
            An example{" "}
            <a
              href="https://jonwatkins.github.io/suika/"
              target="_blank"
              className="text-primary"
            >
              Suika
            </a>{" "}
            todo list
          </small>
        </Footer>
      </Container>
    );
  }
}
