import React, { useState, useEffect } from 'react'

function App() {
  const [todoList, setTodoList] = useState([])
  const [currentTask, setCurrentTask] = useState('')

  const addTask = () => {
    setTodoList([...todoList, currentTask])
  }
  return (
    <div className="containers mt-5" style={{ textAlign: 'center' }}>
      <h1>Todo List</h1>
      <input
        className="mr-2"
        type="text"
        placeholder="Task.."
        onChange={(e) => {
          setCurrentTask(e.target.value)
        }}
      />
      <button onClick={addTask}>Add Task</button>
      <hr />
      {currentTask}
      <br />
      <ul>
        {todoList.map((val, key) => {
          return <li>{val}</li>
        })}
      </ul>
    </div>
  )
}

export default App
