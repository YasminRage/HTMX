const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

let todos = []
let idCounter = 1

// GET all todos
app.get('/todos', (req, res) => {
  const html = todos.map(todo => `
    <li id="todo-${todo.id}" style="margin: 8px 0;">
      <span style="${todo.done ? 'text-decoration: line-through; opacity: 0.5;' : ''}">${todo.text}</span>
      <button hx-patch="/todos/${todo.id}/toggle" hx-target="#todo-${todo.id}" hx-swap="outerHTML">
        ${todo.done ? 'Undo' : 'Done'}
      </button>
      <button hx-delete="/todos/${todo.id}" hx-target="#todo-${todo.id}" hx-swap="outerHTML">
        Delete
      </button>
    </li>
  `).join('')
  res.send(html)
})

// CREATE a todo
app.post('/todos', (req, res) => {
  const todo = { id: idCounter++, text: req.body.text, done: false }
  todos.push(todo)
  res.send(`
    <li id="todo-${todo.id}" style="margin: 8px 0;">
      <span>${todo.text}</span>
      <button hx-patch="/todos/${todo.id}/toggle" hx-target="#todo-${todo.id}" hx-swap="outerHTML">Done</button>
      <button hx-delete="/todos/${todo.id}" hx-target="#todo-${todo.id}" hx-swap="outerHTML">Delete</button>
    </li>
  `)
})

// TOGGLE done
app.patch('/todos/:id/toggle', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id))
  todo.done = !todo.done
  res.send(`
    <li id="todo-${todo.id}" style="margin: 8px 0;">
      <span style="${todo.done ? 'text-decoration: line-through; opacity: 0.5;' : ''}">${todo.text}</span>
      <button hx-patch="/todos/${todo.id}/toggle" hx-target="#todo-${todo.id}" hx-swap="outerHTML">
        ${todo.done ? 'Undo' : 'Done'}
      </button>
      <button hx-delete="/todos/${todo.id}" hx-target="#todo-${todo.id}" hx-swap="outerHTML">Delete</button>
    </li>
  `)
})

// DELETE a todo
app.delete('/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id !== parseInt(req.params.id))
  res.send('')
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))