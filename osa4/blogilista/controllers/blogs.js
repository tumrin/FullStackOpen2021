const blogsRouter = require('express').Router()
const { response } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1, name:1})
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  if (!request.body.likes) {
    request.body.likes = 0
  }
  if (!request.body.url || !request.body.title) {
    response.status(400).end()
  } else {
    const user = await User.find({})

    const blog = new Blog(request.body)
    blog.user = user[0]._id
    const result = await blog.save()
    user[0].blogs = user[0].blogs.concat(result._id)
    await user[0].save()
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
