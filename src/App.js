/* 
import './App.css';
 */
import React from "react";

const todos=[
  {text: 'Cortar Cebolla', completed: true},
  {text: 'Tomar el curso de intro a react', completed: true},
  {text: 'Llorar con la llorona', completed: true},
];

function App() {
  return (
    <React.Fragment >
      <TodoCounter />

      <h2>Has completado 2 de 3 TODOs</h2>

      <TodoSearch />
      <input placeholder="Cebolla" />

      <TodoList>
        {todos.map(todo => (
          <TodoItem />
        ))}

      </TodoList>
      <CreateTodoButton />
    <button></button>
    </React.Fragment>

  );
}

export default App;
