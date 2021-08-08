const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlog = [
  {
    title: '?',
    author: 'Testi Henkilö',
    url: 'String',
    likes: 1
  }
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blog = new Blog(initialBlog[0])
  await blog.save()
})

test('one blog', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(1)
  expect(response.type).toBe('application/json')
})
test('check id field', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach((blog) => expect(blog.id).toBeDefined())
})
test('post blog', async () => {
  const newBlog = {
    title: 'Title1',
    author: 'Author1',
    url: 'String',
    likes: 11
  }

  await api.post('/api/blogs').send(newBlog)
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(2)
})
test('Default likes === 0', async () => {
  const newBlog = {
    title: 'Title1',
    author: 'Author1',
    url: 'String',
  }
  await api.post('/api/blogs').send(newBlog)
  const response = await api.get('/api/blogs')
  expect(response.body[1].likes).toBe(0)
})
test('Title and url required', async () => {
  const newBlog = {
    author: 'Author1',
    likes: 11
  }
  const response = await api.post('/api/blogs').send(newBlog)
  expect(response.statusCode).toBe(400)
})
test('Remove by id', async () => {
  const blogs = await api.get('/api/blogs')

  await api
  .delete(`/api/blogs/${blogs.body[0].id}`)
  .expect(204)

  const blogsEnd = await api.get('/api/blogs')

  expect(blogsEnd.body).toHaveLength(
    initialBlog.length - 1
  )
})
test('Update by id', async () => {
  const blogs = await api.get('/api/blogs')
  const updatedBlog = {
    url: 'String2',
    likes: 2
  }

  await api
  .patch(`/api/blogs/${blogs.body[0].id}`).send(updatedBlog)

  const blogsEnd = await api.get(`/api/blogs`)

  expect(blogsEnd.body[0].likes).toBe(2)
  expect(blogsEnd.body[0].url).toBe('String2')
})

afterAll(() => {
  mongoose.connection.close()
})
