export default ({ todo, remove }) => (
  <li className="list-group-item">
    <div className="d-flex">
      <div className="flex-grow">{todo.content}</div>
      <button className="btn btn-danger" onclick={() => remove(todo)}>
        Delete
      </button>
    </div>
  </li>
);
