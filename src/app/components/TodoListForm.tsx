import { h, isDef } from "suika";
import { Button, Input, InputGroup } from "suika-ui";

type TodoListFormProps = {
  add: Function;
};

// Using this for input value rather than a state or attribute since
// we don't want the input to re-render when the add button is
// clicked, or the dom will update when the `oninput` event is called
let newTodo = "";

export const TodoListForm = ({ add }: TodoListFormProps) => {
  return (
    <form className="mb-3">
      <InputGroup>
        <Input
          value={newTodo}
          oninput={(e: Event) => {
            const { target } = e;
            if (isDef(target)) {
              newTodo = (target as HTMLInputElement).value;
            }
          }}
        />
        <Button
          color="primary"
          size="lg"
          onclick={(e: Event) => {
            e.preventDefault();
            const res = newTodo; // store value
            newTodo = ""; // reset value so input clears on add
            add(res);
          }}
        >
          Add Todo
        </Button>
      </InputGroup>
    </form>
  );
};
