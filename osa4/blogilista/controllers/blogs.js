const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {
        username: 1,
        name: 1
    })
    response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
    if (!request.body.likes) {
        request.body.likes = 0
    }
    if (!request.body.url || !request.body.title) {
        response.status(400).end()
    } else {
        const blog = new Blog(request.body)
        blog.user = request.user._id
        const result = await blog.save()
        request.user.blogs = request.user.blogs.concat(result._id)
        await request.user.save()
        response.status(204).json(result.toJSON)
    }
})
blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (blog.user.toString() === request.user._id.toString()) {
            await Blog.deleteOne(blog)
            response.status(204).end()
        } else {
            return response
                .status(401)
                .json({ error: 'You are not authorized to remove this blog' })
        }
    } catch (error) {
        next(error)
    }
})
blogsRouter.patch('/:id', async (request, response) => {
    await Blog.findByIdAndUpdate(request.params.id, request.body)
    response.status(204).end()
})

module.exports = blogsRouter
