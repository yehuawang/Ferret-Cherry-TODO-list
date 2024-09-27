import React, { useState } from 'react'

export default function TodoInput(props) {

  const { handleAddTodos, todoValue, setTodoValue } = props

  const handleSubmit = () => {
    handleAddTodos(todoValue)
    setTodoValue('')
  }

  return (
    <header>
      <input value={todoValue} onChange={(e) => {
        setTodoValue(e.target.value)
      }} placeholder="Enter TODO..."
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSubmit()
        }
      }} />
      <button onClick={handleSubmit}>Add</button>
    </header>
  )
}