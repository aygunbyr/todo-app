import { ITodo } from "@/types/todo";
import Todo from "./Todo";

type TodoListProps = {
  todos: ITodo[];
  changeStatus: (todoId: number) => void;
};

const TodoList = (props: TodoListProps) => {
  return (
    <>
      <ul className="todo-list">
        {props.todos.map((todo) => (
          <Todo key={todo.id} todo={todo} changeStatus={props.changeStatus} />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
