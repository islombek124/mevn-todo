require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// 
const app = express();

// configure project
app.use(cors());
app.use(bodyParser.json())

// connect to the database
mongoose.connect(process.env.MONGO_URI)

app.get('/', async (req, res) => {
  res.json({
    'View all todos': 'GET: /todos',
    'View a todo with ID': 'GET: /todos/:id',
    'Save a todo': 'POST: /todos/new',
    'Delete a todo with ID': 'DELETE: /todos/:id',
    'Update a todo with ID': 'PUT: /todos/:id',
  })
})

// configure routes
const TodoRoutes = require('./routes/TodoRoutes.js')
app.use('/todos', TodoRoutes)

// start server
app.listen(3001)
