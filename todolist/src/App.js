import React, { useState, useEffect } from 'react';
import "./App.css";
import { NewTodoForm } from "./NewTodoForm";

import { TodoList } from './TodoList';




const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/NicolasJaramillo')
      .then((response) => response.json())
      .then((data) => {
        const todos = data.map((todo) => ({
          id: todo.id,
          title: todo.label, 
          completed: todo.done, 
        }));
        setTodos(todos);
      })
      .catch((error) => console.log(error));
  }, []);

  function syncTodosWithServer(todos) {
    const serverTodos = todos.map((todo) => ({
      label: todo.title, 
      done: todo.completed, 
    }));

    fetch('https://playground.4geeks.com/apis/fake/todos/user/NicolasJaramillo', {
      method: "PUT",
      body: JSON.stringify(serverTodos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }

  function addTodo(title) {
    setTodos((currentTodos) => {
      const newTodos = [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
      syncTodosWithServer(newTodos);
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
      syncTodosWithServer(newTodos);
      return newTodos;
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      const newTodos = currentTodos.filter((todo) => todo.id !== id);
    syncTodosWithServer(newTodos);
    return newTodos;
    });
  }

  function deleteAllTodos() {
    setTodos([]);
    syncTodosWithServer([]);
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