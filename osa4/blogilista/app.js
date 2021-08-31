const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const mongoUrl = require('./utils/config')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const {
    tokenExtractor,
    userExtractor,
    errorHandler,
} = require('./utils/middleware')

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)

module.exports = app
