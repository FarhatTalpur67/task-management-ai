import { useState } from 'react'
import './App.css'

const PRIORITY_OPTIONS = ['High', 'Medium', 'Low']

const EMPTY_FORM = {
  title: '',
  dueDate: '',
  priority: 'Medium',
}

function App() {
  const [tasks, setTasks] = useState([])
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const nextErrors = {}

    if (!formData.title.trim()) {
      nextErrors.title = 'Task title is required'
    }

    if (!formData.dueDate) {
      nextErrors.dueDate = 'Due date is required'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({ ...previous, [name]: value }))

    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: '' }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validate()) {
      return
    }

    const newTask = {
      id: crypto.randomUUID(),
      title: formData.title.trim(),
      dueDate: formData.dueDate,
      priority: formData.priority,
      completed: false,
    }

    setTasks((previous) => [...previous, newTask])
    setFormData(EMPTY_FORM)
    setErrors({})
  }

  const toggleComplete = (id) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const deleteTask = (id) => {
    setTasks((previous) => previous.filter((task) => task.id !== id))
  }

  const formatDueDate = (dateString) => {
    return new Date(`${dateString}T00:00:00`).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Management App</h1>
        <p className="app-subtitle">Add tasks, set priorities, and track your progress.</p>
      </header>

      <form className="task-form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="form-field form-field--wide">
            <label htmlFor="title">Task Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? 'title-error' : undefined}
            />
            {errors.title && (
              <span id="title-error" className="error-message" role="alert">
                {errors.title}
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="dueDate">Due Date</label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              aria-invalid={Boolean(errors.dueDate)}
              aria-describedby={errors.dueDate ? 'dueDate-error' : undefined}
            />
            {errors.dueDate && (
              <span id="dueDate-error" className="error-message" role="alert">
                {errors.dueDate}
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              {PRIORITY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>

      <section className="task-list-section" aria-live="polite">
        <h2>Tasks ({tasks.length})</h2>

        {tasks.length === 0 ? (
          <p className="empty-state">No tasks yet. Add your first task above.</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`task-item ${task.completed ? 'task-item--completed' : ''}`}
              >
                <div className="task-content">
                  <span className="task-title">{task.title}</span>
                  <div className="task-meta">
                    <span className="task-date">Due: {formatDueDate(task.dueDate)}</span>
                    <span className={`priority-badge priority-badge--${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>

                <div className="task-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => toggleComplete(task.id)}
                  >
                    {task.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default App
