import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider(props) {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);

  const [searchValue, setSearchValue] = React.useState("");
  const [openModal, setOpenModal]= React.useState(false);

  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      const todoText = todo.text.toString().toLowerCase();
      const searchText = searchValue.toString().toLowerCase();

      return todoText.includes(searchText);
    });
  }

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    /*       todos[todoIndex] = {
          text:todos[todoIndex] .text,
          completed:true,
        }; */
    const newTodos = [...todos];

    newTodos[todoIndex].completed = true;

    saveTodos(newTodos);
  };

  const addTodo = (text) => {

    const newTodos = [...todos];

    newTodos.push({
      completed: false,
      text,
    });

    saveTodos(newTodos);
  };

  /*   console.log('Render (antes del useeffect)');
    
      React.useEffect(()=>{
        console.log('use effect');
      }, [totalTodos]);
    
      console.log('Render (Luego del useeffect)');
    
     */
  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);

    const newTodos = [...todos];

    newTodos.splice(todoIndex, 1);

    saveTodos(newTodos);
  };
  return (
    <TodoContext.Provider value={{
        error,
        loading,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        completeTodo,
        addTodo,
        deleteTodo,
        openModal,
        setOpenModal,
    }}>{props.children}</TodoContext.Provider>
  );
}

export {TodoContext, TodoProvider};