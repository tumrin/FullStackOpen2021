const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const mongoUrl = require('./utils/config')
const usersRouter = require('./controllers/users')


mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

const errorHandler = (error, request, response, next) => {
    if(error.name === 'ValidationError'){
        return response.status(400).json({ error: error.message })
    }
    next(error)
}
app.use(errorHandler)

module.exports = app