import { ITodo } from "@/types/todo";

type TodoProps = {
  todo: ITodo;
  changeStatus: (todoId: number) => void;
  handleDelete: (todoId: number) => void;
};

const Todo = (props: TodoProps) => {
  return (
    <>
      {/* If todo is completed text is striketough */}
      <li className={props.todo.isCompleted ? "completed" : ""}>
        <div className="view">
          <input
            className={"toggle"}
            // If todo is completed checkbox is checked
            checked={props.todo.isCompleted}
            type="checkbox"
            onClick={() => props.changeStatus(props.todo.id)}
          />
          <label>{props.todo.content}</label>
          <button
            className="destroy"
            onClick={() => props.handleDelete(props.todo.id)}
          ></button>
        </div>
      </li>
    </>
  );
};

export default Todo;
