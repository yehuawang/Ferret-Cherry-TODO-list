import { useState } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

function App() {

  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')
  
  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo]
    setTodos(newTodoList)
  }

  function handleDeleteTodos(index) {
    const newTodoList = todos.filter((_, todoIndex) => {
      return index !== todoIndex
    })
    setTodos(newTodoList)
  }

  function handleUpdateTodos(index, newValue) {
    const updatedTodos = todos.map((todo, todoIndex) => 
      todoIndex === index ? newValue : todo
    )
    setTodos(updatedTodos)
  }

  return (
    <>

        <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} />

        <TodoList handleDeleteTodos={handleDeleteTodos} handleUpdateTodos={handleUpdateTodos} todos={todos} />
      
    </>
  )
}

export default App
