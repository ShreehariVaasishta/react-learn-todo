
import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  // states
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all")
  const [filteredTodos, setFilteredTodos] = useState([])


  // functions
  const filterHandler = () => {
    switch (status) {
      case "completed": setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case "uncompleted": setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default: setFilteredTodos(todos);
        break;
    }
  }

  // useEffect
  useEffect(() => {
    getLocalTodos();
  }, [])

  useEffect(() => {
    // console.log("helllo");
    filterHandler();
    saveLocalTodos();
  },
    [todos, status]
  );

  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') == null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoFromLocal = JSON.parse(localStorage.getItem('todos', JSON.stringify(todos)));
      setTodos(todoFromLocal);
    }
  }
  return (
    <div className="App">
      <header>
        <h1>Gary's TODO List</h1>
      </header>
      <Form todos={todos} setTodos={setTodos} inputText={inputText} setInputText={setInputText} setStatus={setStatus}
      />
      <TodoList setTodos={setTodos} todos={todos} filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
