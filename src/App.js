import React, { useState } from 'react';
import './App.css';

const generateUID = () => Math.random().toString(36).substr(2,9);

function Todo({todo, completeTodo}){
  return(
    <div style={{marginTop: '1vh'}}>
      {todo.label}
      <div>
        <button onClick={() => completeTodo(todo.id)}> completeTodo</button>
      </div>
    </div>
  )
}

function CompletedTodo( {todo} ){
  return(
    <div style={{marginTop: '1vh'}}>
      {todo.label}
    </div>
  )
}

function Counter( {todos , completedTodos} ){
  const totalNum = todos.length + completedTodos.length;
  const completedNum = completedTodos.length;
  return(
    <h1>{`Total Todos: ${totalNum}, Completed: ${completedNum}`}</h1>
  )
}

function TodoForm({ addTodo }){

  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if(value.trim() === "") return
    addTodo(value);
    setValue("")
  }

  return(
    <form onSubmit={handleSubmit}>
    <input
      type="text"
      className="input"
      value={value}
      onChange={e => setValue(e.target.value)}
    />
    <button>Submit</button>
  </form>
  );
}

function App() {

  var [todos, setTodos] = useState([
  ]);

  var [completedTodos, setCompletedTodos] = useState([
  ]);

  const addTodo = text => {
    const newTodo = {id: generateUID(), label: text, isCompleted: false};
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  const completeTodo = id => {
    debugger;

    const newArr = todos.filter(todo => todo.id !== id);
    const newTodos = newArr;

    const completedTodo = todos.filter(todo => todo.id === id);
    const newCompletedTodos = [...completedTodos, completedTodo[0]];
    setCompletedTodos(newCompletedTodos);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <h1>To do</h1>
        <div  className="todo-list">
          {todos.map((todo) => (
          <Todo 
          key={todo.id}
          todo={todo}
          completeTodo={completeTodo}
          ></Todo>
          ))}
          <div style={{marginTop: '3vh'}}>
            <TodoForm addTodo={ addTodo }/>
          </div>
        </div>
        <div >
          <h1>Done</h1>
          {completedTodos.map((todo) => 
              <CompletedTodo
              key={todo.id}
              todo={todo}
              completeTodo={completeTodo}
              ></CompletedTodo>
            )}
          </div>
          <Counter todos={todos} completedTodos={completedTodos}/>
    </div>
  );
}

export default App;
