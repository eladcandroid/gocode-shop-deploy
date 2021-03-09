import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddTodo from "../../components/AddTodo/AddTodo";
import Todo from "../../components/Todo/Todo";
import ThemeContext from "../../ThemeContext";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const theme = useContext(ThemeContext);

  console.log("theme", theme);
  // const check = useRef("Hello");

  const fetchTodos =  () => fetch("/api/todos")
  .then((response) => response.json())
  .then((data) => setTodos(data));
  // let check = "Hello";
  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (title) => {
    const res = await fetch("http://localhost:8000/todos", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title }),
    });

    const todo = await res.json();
    
    setTodos([todo, ...todos]);
  };

  return (
    <div style={{ background: theme.background }}>
      <AddTodo onAdd={addTodo} />
      {todos.map((todo) => (
        <Link
          to={`/todos/${todo._id}`}
          key={todo._id}
          style={{ color: theme.foreground }}
        >
          <Todo id={todo._id} title={todo.title} />
        </Link>
      ))}
    </div>
  );
};

export default Home;
