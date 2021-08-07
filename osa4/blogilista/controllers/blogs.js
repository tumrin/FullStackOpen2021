const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  if (!request.body.likes) {
    request.body.likes = 0
  }
  if(!request.body.url || !request.body.title){
    response.status(400).end()
  }
  else{
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(204).json(result)
  }
})

module.exports = blogsRouter
