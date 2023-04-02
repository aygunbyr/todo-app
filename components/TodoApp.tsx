import TodoList from "@/components/TodoList";
import { useEffect, useState, useRef } from "react";
import { ITodo } from "@/types/todo";

// Todo Filter can only get one of these values
type TodoFilter = "all" | "active" | "completed";

const TodoApp = () => {
  // State of number of completed todos
  const [completed, setCompleted] = useState<number>(0);

  // Content of todo input
  const [content, setContent] = useState<string>("");

  // State of current filter
  const [filter, setFilter] = useState<TodoFilter>("all");

  // Reference of todo input
  const inputRef = useRef<HTMLInputElement>(null);

  // References of filter anchors
  const allRef = useRef<HTMLAnchorElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);
  const completedRef = useRef<HTMLAnchorElement>(null);

  // State of filtered todos
  const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([]);

  // Initial state of todos
  const [todos, setTodos] = useState<ITodo[]>(() => {
    // If todos are stored in local storage, get them
    // Otherwise use initial state for todos
    const savedTodos =
      typeof window !== "undefined"
        ? window.localStorage.getItem("todoapp.todos")
        : null;

    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [
        {
          id: 5,
          content: "Learn JavaScript",
          isCompleted: false,
        },
        {
          id: 18,
          content: "Learn React",
          isCompleted: false,
        },
        {
          id: 22,
          content: "Have a life!",
          isCompleted: false,
        },
      ];
    }
  });

  // Focus on input when page loads (component mount)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // If todos list change, save to local storage
    localStorage.setItem("todoapp.todos", JSON.stringify(todos));

    // If todos list change, count number of completed todos
    let completed = 0;
    todos.forEach((todo) => (todo.isCompleted ? null : completed++));
    setCompleted(completed);
  }, [todos]);

  // Update filtered todos when filter change
  useEffect(() => {
    // Clear selected class from all anchors
    if (allRef.current) {
      allRef.current.className = "";
    }
    if (activeRef.current) {
      activeRef.current.className = "";
    }
    if (completedRef.current) {
      completedRef.current.className = "";
    }

    // Filters switch
    switch (filter) {
      // All filter
      case "all":
        setFilteredTodos([...todos]);
        if (allRef.current) {
          allRef.current.className = "selected";
        }
        break;

      // Active filter
      case "active":
        setFilteredTodos(
          [...todos].filter((todo) => todo.isCompleted === false)
        );
        if (activeRef.current) {
          activeRef.current.className = "selected";
        }
        break;

      // Completed filter
      case "completed":
        setFilteredTodos(
          [...todos].filter((todo) => todo.isCompleted === true)
        );
        if (completedRef.current) {
          completedRef.current.className = "selected";
        }
        break;

      default:
        setFilteredTodos([...todos]);
        break;
    }
  }, [filter, todos]);

  // Clear completed todos from todo list
  const clearCompleted = () => {
    setTodos([...todos].filter((todo) => todo.isCompleted === false));
  };

  // Change isCompleted status of given todo
  const changeStatus = (todoId: number) => {
    const newTodos = todos.map((todo) => {
      // All except given remains the same
      if (todo.id !== todoId) return todo;

      // Change given todo status
      return { ...todo, isCompleted: !todo.isCompleted };
    });

    // Update todos
    setTodos(newTodos);
  };

  // Handle todo form submit
  const handleSubmit = (event: React.SyntheticEvent) => {
    // Prevent default HTML Form Submit action
    event.preventDefault();

    // If input is empty, abort submit process
    if (content.length < 1) return;

    // Create new todo object with random ID and initially not completed
    const newTodo = {
      id: Math.floor(Math.random() * 428374324),
      content: content,
      isCompleted: false,
    };

    // Add todo to todos array
    setTodos([...todos, newTodo]);

    // Clear input
    setContent("");
  };

  // Handle delete todo
  const handleDelete = (id: number) => {
    // Delete given todo
    const newTodos = [...todos].filter((todo) => todo.id !== id);

    setTodos(newTodos);
  };

  // Bind content state and todo input
  const onInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setContent(event.currentTarget.value);
  };

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={handleSubmit}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={onInputChange}
              value={content}
              ref={inputRef}
              autoFocus
            />
          </form>
        </header>

        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={filteredTodos}
            changeStatus={changeStatus}
            handleDelete={handleDelete}
          />
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>{completed} </strong>
            items left
          </span>

          <ul className="filters">
            <li>
              <a href="#/" onClick={() => setFilter("all")} ref={allRef}>
                All
              </a>
            </li>
            <li>
              <a href="#/" onClick={() => setFilter("active")} ref={activeRef}>
                Active
              </a>
            </li>
            <li>
              <a
                href="#/"
                onClick={() => setFilter("completed")}
                ref={completedRef}
              >
                Completed
              </a>
            </li>
          </ul>

          <button className="clear-completed" onClick={clearCompleted}>
            Clear completed
          </button>
        </footer>
      </section>
    </>
  );
};

export default TodoApp;
