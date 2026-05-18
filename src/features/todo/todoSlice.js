import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  //   todos: [{ id: 1, text: "Hello World" }],
  todos: localStorage.getItem("todo")
    ? JSON.parse(localStorage.getItem("todo"))
    : [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
      };
      state.todos.push(todo);
      localStorage.setItem("todo", JSON.stringify(state.todos));
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todo", JSON.stringify(state.todos));
    },
    updateTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
        localStorage.setItem("todo", JSON.stringify(state.todos));
      }
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
