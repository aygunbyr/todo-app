import { ITodo } from "@/types/todo";
import Todo from "./Todo";

type TodoListProps = {
  todos: ITodo[];
  changeStatus: (todoId: number) => void;
  handleDelete: (todoId: number) => void;
};

const TodoList = (props: TodoListProps) => {
  return (
    <>
      <ul className="todo-list">
        {props.todos.map((todo) => (
          // Todo component shows single todo
          <Todo
            key={todo.id}
            todo={todo}
            changeStatus={props.changeStatus}
            handleDelete={props.handleDelete}
          />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
