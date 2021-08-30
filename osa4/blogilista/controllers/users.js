const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (Request, response) => {
    const users = await User.find({}).populate('blogs', {
        url: 1,
        title: 1,
        author: 1,
    })

    response.json(users.map((u) => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
    const body = request.body

    const saltRounds = 10

    if (body.password === undefined) {
        return response.status(400).json({ error: 'Password missing' })
    }
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User({
        blogs: [],
        username: body.username,
        name: body.name,
        passwordHash,
    })

    try {
        const savedUser = await user.save()
        response.json(savedUser)
    } catch (error) {
        next(error)
    }
})

module.exports = usersRouter
