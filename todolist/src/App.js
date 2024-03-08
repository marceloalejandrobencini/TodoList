import React, { useState } from 'react';
import "./App.css";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from './TodoList';

const App = () => {
  const [todos, setTodos] = useState([]);

  function addTodo(title) {
    setTodos((currentTodos) => {
      const newTodos = [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
      return newTodos;
    });
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      const newTodos = currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
      return newTodos;
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      const newTodos = currentTodos.filter((todo) => todo.id !== id);
      return newTodos;
    });
  }

  function deleteAllTodos() {
    setTodos([]);
  }

  return (
    <>
      <NewTodoForm addTodo={addTodo} />
      <h1 className="header">Tareas:</h1>
      
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <button className="borrar-todo" onClick={deleteAllTodos}>Borrar todas las tareas</button>
    </>
  );
};

export default App;
