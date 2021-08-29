const blogsRouter = require('express').Router()
const { response } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {
        username: 1,
        name: 1,
    })
    response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
    if (!request.body.likes) {
        request.body.likes = 0
    }
    if (!request.body.url || !request.body.title) {
        response.status(400).end()
    } else {
        let decodedToken
        try {
            decodedToken = jwt.verify(request.token, process.env.SECRET)
        } catch (error) {
            return next(error)
        }
        if (!request.token || !decodedToken.id) {
            return response
                .status(401)
                .json({ error: 'Token missing or not valid' })
        }
        const user = await User.findById(decodedToken.id)

        const blog = new Blog(request.body)
        blog.user = user._id
        const result = await blog.save()
        user.blogs = user.blogs.concat(result._id)
        await user.save()
        response.status(204).json(result.toJSON)
    }
})
blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})
blogsRouter.patch('/:id', async (request, response) => {
    await Blog.findByIdAndUpdate(request.params.id, request.body)
    response.status(204).end()
})

module.exports = blogsRouter
