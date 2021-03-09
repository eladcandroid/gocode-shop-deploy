import { useEffect, useState } from "react";

const TodoDetails = ({ match }) => {
  const [todo, setTodo] = useState({});

  useEffect(() => {
    fetch(`/api/todos/${match.params.todoId}`)
      .then((response) => response.json())
      .then((data) => setTodo(data));
  }, [match.params.todoId]);

  return <div>Todo Details: {todo ? todo.title : ""}</div>;
};

export default TodoDetails;
