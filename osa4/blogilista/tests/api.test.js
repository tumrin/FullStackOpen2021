const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlog = [
    {
        title: "?",
        author: "Testi Henkilö",
        url: "String",
        likes: 1
    }
]
beforeEach(async () => {  await Blog.deleteMany({})  
let blog = new Blog(initialBlog)  
await blog.save() 
})

test('one blog', async () => {
    const response = await api.get('/api/blogs')
    
    expect(response.body).toHaveLength(1)
    expect(response.type).toBe('application/json')
  })
  
  afterAll(() => {
    mongoose.connection.close()
  })