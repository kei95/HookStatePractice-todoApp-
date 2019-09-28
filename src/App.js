import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Form, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const generateUID = () => Math.random().toString(36).substr(2,9);

function Todo({todo, completeTodo}){
  return(
    <div style={{marginTop: '1vh'}}>
      {todo.label}
      <div>
        <Button onClick={() => completeTodo(todo.id)}> completeTodo</Button>
      </div>
    </div>
  )
}

function CompletedTodo( {todo, undoTodo} ){
  return(
    <div style={{marginTop: '1vh'}}>
      {todo.label}
      <div>
        <Button onClick={() => undoTodo(todo.id)}> Undo</Button>
      </div>
    </div>
  )
}

function Counter( {todos , completedTodos} ){
  const totalNum = todos.length + completedTodos.length;
  const completedNum = completedTodos.length;
  return(
    <div fixed="bottom" style={{marginTop: '5vh'}}>
      <h1>{`Total Todos: ${totalNum}`}</h1>
      <h1>{`Completed: ${completedNum}`}</h1>
    </div>
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
    <Form onSubmit={handleSubmit}>
      <Row >
      <Form.Group className="m-auto">
        <Col >
          <Form.Label>Type your Todo...</Form.Label>
          <Form.Control value={value}
          onChange={e => setValue(e.target.value)} placeholder="Enter your todo" />
        </Col>
        <Button style={{marginTop: '1vh'}} onClick={handleSubmit}>Submit</Button>
    </Form.Group>
    </Row>
  </Form>
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

    const newArr = todos.filter(todo => todo.id !== id);
    const newTodos = newArr;

    const completedTodo = todos.filter(todo => todo.id === id);
    const newCompletedTodos = [...completedTodos, completedTodo[0]];
    setCompletedTodos(newCompletedTodos);
    setTodos(newTodos);
  }

  const undoTodo = id => {
    const pickedTodo = completedTodos.filter(todo => todo.id === id);
    const newTodoArr = [...todos, pickedTodo[0]];
    const newCompletedTodoArr = completedTodos.filter(todo => todo.id !== id);
    setTodos(newTodoArr);
    setCompletedTodos(newCompletedTodoArr);
  }

  return (
    <div style={{width: '95%'}} className="App">
      <div>
        <TodoForm addTodo={ addTodo }/>
      </div>
      <h1 style={{marginTop: '3vh'}}>To do:</h1>
      { todos.length === 0 ? <p>No Todo has been set</p> : null}
        <div className="todo-list">
          {todos.map((todo) => (
          <Todo 
          key={todo.id}
          todo={todo}
          completeTodo={completeTodo}
          ></Todo>
          ))}
        </div>
        <h1>Completed:</h1>
        { completedTodos.length === 0 ? <p>No Todo has been completed</p> : null}
        <div>
          {completedTodos.map((todo) => 
              <CompletedTodo
              key={todo.id}
              todo={todo}
              undoTodo={undoTodo}
              ></CompletedTodo>
            )}
          </div>
          <Counter todos={todos} completedTodos={completedTodos}/>
    </div>
  );
}

export default App;
