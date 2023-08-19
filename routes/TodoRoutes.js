const express = require('express')
const router = express.Router()
const Todo = require('../models/TodoSchema')

// Get all todos
router.get('/', async (req, res) => {
  const todos = await Todo.find({})
  res.json(todos)
})

// Save todo a todo
router.post('/new', async (req, res) => {
  // Create a new todo
  const newTodo = await Todo.create(req.body)
  // Save a todo
  const savedTodo = await newTodo.save()
  // Redirect to the new todo
  res.json(savedTodo)
})

// Get todo by ID
router.get('/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id)
  res.json(todo)
})

// Delete todo by ID
router.delete('/:id', async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id)
  res.json(todo)
})

// Update todo by ID
router.put('/:id', async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body)
  res.json(todo)
})

module.exports = router
