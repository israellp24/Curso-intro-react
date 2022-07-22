import React from "react";
import { AppUI } from "./AppUI";


/* const defaultTodos = [
  { text: "Cortar Cebolla", completed: false },
  { text: "Tomar el curso de intro a react", completed: true },
  { text: "Llorar con la llorona", completed: false },
]; */

function useLocalStorage(itemName, initalValue){

  const localStorageItem = localStorage.getItem(itemName);
  let parsedItem;

  if(!localStorageItem){
    localStorage.setItem(itemName,JSON.stringify([initalValue]));
    parsedItem=[initalValue];
  }else{
    parsedItem = JSON.parse(localStorageItem);
  }

  const [item,setItem] = React.useState(parsedItem);

  const saveItem = (newItem) => {
    const stringifieldItem = JSON.stringify(newItem);
    localStorage.setItem(itemName, stringifieldItem);
    setItem(newItem);
  };

  return [
    item,
    saveItem
  ];
}

function App() {

  const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);
  
  const [searchValue,setSearchValue]= React.useState('');

  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  if(!searchValue.length>=1)
  {
    searchedTodos = todos;
  }
  else
  {
    searchedTodos = todos.filter(todo=>{
      const todoText = todo.text.toString().toLowerCase();
      const searchText = searchValue.toString().toLowerCase();

      return todoText.includes(searchText);

    });
    
  }


  const completeTodo = (text)=>{
    const todoIndex = todos.findIndex(todo => todo.text === text);
/*       todos[todoIndex] = {
      text:todos[todoIndex] .text,
      completed:true,
    }; */
    const newTodos = [...todos];

    newTodos[todoIndex].completed=true;

    saveTodos(newTodos);
  }

  const deleteTodo = (text)=>{
    const todoIndex = todos.findIndex(todo => todo.text === text);

    const newTodos = [...todos];

    newTodos.splice(todoIndex,1);

    saveTodos(newTodos);
  }

  return (
    <AppUI 
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;
