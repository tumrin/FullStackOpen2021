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
  let blog = new Blog(initialBlog)
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

afterAll(() => {
  mongoose.connection.close()
})
