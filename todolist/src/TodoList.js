import { TodoItem } from "./TodoItem"; // Importa la función TodoItem de forma nombrada
import React from "react";
import "./App.css"; // Importa los estilos CSS

export function TodoList({ todos = [], toggleTodo, deleteTodo }) {
  return (
    <div className="container">
  
      {todos.length === 0 && "No hay Todos"}
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
