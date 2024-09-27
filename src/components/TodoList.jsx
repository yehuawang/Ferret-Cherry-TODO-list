import { useState, useRef, useEffect } from 'react'

export default function TodoList(props) {
  const { todos, handleDeleteTodos, handleUpdateTodos } = props
  const [editIndex, setEditIndex] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [savedIndex, setSavedIndex] = useState(null)
  const [completedTodos, setCompletedTodos] = useState([])

  const inputRef = useRef(null)

  useEffect(() => {
    if (editIndex !== null && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editIndex])

  function handleEditClick(index) {
    setEditIndex(index)
    setEditValue(todos[index])
  }

  function handleSaveEdit(index) {
    handleUpdateTodos(index, editValue)
    setEditIndex(null)
    setEditValue('')
    setSavedIndex(index)

    setTimeout(() => {
      setSavedIndex(null)
    }, 300) 

    setCompletedTodos(completedTodos.filter((i) => i !== index));
  }

  function handleCancelEdit() {
    setEditIndex(null)
    setEditValue('')
  }

  function handleKeyDown(event, index) {
    if (event.key === 'Enter') {
      handleSaveEdit(index)
    } else if (event.key === 'Escape') {
      handleCancelEdit()
    }
  }

  function toggleCompleted(index) {
    const newCompletedTodos = [...completedTodos]
    if (completedTodos.includes(index)) {
      const indexToRemove = completedTodos.indexOf(index)
      newCompletedTodos.splice(indexToRemove, 1)
    } else {
      newCompletedTodos.push(index)
    }
    setCompletedTodos(newCompletedTodos)
  } 

  return (
    <ul className='main'>
      {todos.map((todo, index) => (
        <li key={index} className={`todoItem ${savedIndex === index ? 'saved' : ''}`}>
          <div className='actionsContainer'>
            <button onClick={() => handleEditClick(index)}>
              <i className="fa-solid fa-pencil"></i>
            </button>
            <button onClick={() => toggleCompleted(index)}>
              {completedTodos.includes(index) ? (
                <i class="fa-regular fa-square-check"></i>
              ) : (
                <i className="fa-regular fa-square"></i>
              )}
            </button>
            {editIndex === index ? (
              <input
                ref={inputRef}
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onBlur={handleCancelEdit}
              />
            ) : (
              <p
                className={completedTodos.includes(index) ? 'completed' : ''} // Apply completed class
              >
                {todo}
              </p>
            )}
            <button onClick={() => handleDeleteTodos(index)}>
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
