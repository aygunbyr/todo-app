import { ITodo } from "@/types/todo";

type TodoProps = {
  todo: ITodo;
  changeStatus: (todoId: number) => void;
};

const Todo = (props: TodoProps) => {
  return (
    <>
      <li className={props.todo.isCompleted ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onClick={() => props.changeStatus(props.todo.id)}
          />
          <label>{props.todo.content}</label>
          <button className="destroy"></button>
        </div>
      </li>
    </>
  );
};

export default Todo;
