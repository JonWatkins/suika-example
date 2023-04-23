import { h, isDef, vNode } from "suika";
import { Button, ButtonGroup, Input, InputGroup } from "suika-ui";
import { addTodo } from "../state";
import { navigate } from "suika-router";

// Using this for input value rather than a state or attribute since
// we don't want the input to re-render when the add button is
// clicked, or the dom will update when the `oninput` event is called
let newTodo = "";

export const TodoListForm = (): vNode => {
  return (
    <form className="mb-3">
      <InputGroup className="mb-3">
        <Input
          value={newTodo}
          oninput={(e: Event) => {
            const { target } = e;
            if (isDef(target)) {
              newTodo = (target as HTMLInputElement).value;
            }
          }}
        />
      </InputGroup>
      <ButtonGroup>
        <Button
          color="danger"
          onclick={(e: Event) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onclick={(e: Event) => {
            e.preventDefault();
            const res = newTodo; // store value
            newTodo = ""; // reset value so input clears on add
            addTodo(res);
            navigate("/");
          }}
        >
          Add Todo
        </Button>
      </ButtonGroup>
    </form>
  );
};
