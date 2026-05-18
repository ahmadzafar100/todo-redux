import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";

const Todos = () => {
  const todos = useSelector((state) => state.todo.todos);
  console.log(todos);
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [text, setText] = useState("");
  const handleUpdate = (id, text) => {
    dispatch(updateTodo({ id, text }));
    setId("");
    setText("");
  };
  return (
    <>
      <h1>Todos List</h1>
      {todos.length &&
        todos.map((item, key) => (
          <div style={{ padding: "5px" }} key={key}>
            {id && id === item.id ? (
              <>
                <input
                  type="text"
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                />
                <button onClick={() => handleUpdate(item.id, text)}>
                  Update
                </button>
                <button
                  onClick={() => {
                    setId("");
                    setText("");
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                {item.text}
                <button
                  onClick={() => {
                    setId(item.id);
                    setText(item.text);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => dispatch(removeTodo(item.id))}>
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
    </>
  );
};

export default Todos;
