import { Component, h } from "suika";
import Container from "./components/Container";
import Header from "./components/Header";
import Title from "./components/Title";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";

export default class MyApp extends Component {
  state = {
    title: "Todo List",
    count: 0,
  };

  inc() {
    this.state.count++;
  }

  render() {
    return (
      <Container>
        <Header>
          <Title text={this.state.title} />
        </Header>
        <TodoList />
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
