import React from "react";
import { TodoCounter } from "../TodoCounter";
import { TodoContext } from "../TodoContext";
import { TodoSearch } from "../TodoSearch";
import { CreateTodoButton } from "../CreateTodoButton";
import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";
import { Modal } from "../Modal";
import {TodoForm} from "../TodoForm";
import {TodosError} from "../TodosError"
import {TodosLoading} from "../TodosLoading"
import {EmptyTodos} from "../EmptyTodos"

function AppUI() {
  const { error, loading, searchedTodos, completeTodo, deleteTodo, openModal,setOpenModal } =
    React.useContext(TodoContext);

  return (
    <React.Fragment>
      <TodoCounter />
      <TodoSearch />

      <TodoList>
        {error && <TodosError ></TodosError>}
        {loading && <TodosLoading></TodosLoading>}
        {!loading && !searchedTodos.length && <EmptyTodos></EmptyTodos>}

        {searchedTodos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>

      {!!openModal&&(
        <Modal>
          <TodoForm/>
        </Modal>
      )}

      <CreateTodoButton setOpenModal={setOpenModal}  />
    </React.Fragment>
  );
}

export { AppUI };
