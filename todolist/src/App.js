import React, { useState, useEffect } from 'react';
import './App.css';
import { NewTodoForm } from './NewTodoForm';
import { TodoList } from './TodoList';

const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  console.log('Todos:', todos);

  function addTodo(title) {
    if (!title.trim()) {
      return; 
    }

    const newTodo = {
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
      title,
      completed: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
  }

  function toggleTodo(id, completed) {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed } : todo
    );
    setTodos(updatedTodos);
  }

  function deleteTodo(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function deleteAllTodos() {
    const updatedTodos = [];
    setTodos(updatedTodos);
  }

  return (
    <>
      <NewTodoForm addTodo={addTodo} />
      <h1 className="header">Lista de Tareas:</h1>

      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <button className="borrar-todo" onClick={deleteAllTodos}>
        Borrar todas las tareas
      </button>
    </>
  );
};

export default App;
