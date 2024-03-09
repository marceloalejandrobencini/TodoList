import { TodoItem } from "./TodoItem"; 
import React from "react";
import "./App.css"; 

export function TodoList({ todos = [], toggleTodo, deleteTodo }) {
  return (
    <div className="container">
  
      {todos.length === 0 && "No hay Tareas"}
      {todos.map((todo) => {
        return (
          <div className="task-post-it" key={todo.id}>
            <TodoItem
              {...todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          </div>
        );
      })}
    </div>
  );
}
