const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { post } = require('../controllers/blogs')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlog = [
    {
        title: '?',
        author: 'Testi Henkilö',
        url: 'String',
        likes: 1,
    },
]
const initialUser = {
    username: 'testiH',
    name: 'Testi Henkilö',
    password: '1224',
}

let token = ''

beforeEach(async () => {
    await User.deleteMany({})
    await api.post('/api/users').send(initialUser)
    token = await (await api.post('/api/login').send(initialUser)).body.token

    await Blog.deleteMany({})
    await api
        .post('/api/blogs')
        .send(initialBlog[0])
        .set({ Authorization: `bearer ${token}` })
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
        likes: 11,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: `bearer ${token}` })

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
})
test('post blog without token', async () => {
    const newBlog = {
        title: 'Title1',
        author: 'Author1',
        url: 'String',
        likes: 11,
    }

    await api.post('/api/blogs').send(newBlog).expect(401)
})
test('Default likes === 0', async () => {
    const newBlog = {
        title: 'Title1',
        author: 'Author1',
        url: 'String',
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: `bearer ${token}` })
    const response = await api.get('/api/blogs')
    expect(response.body[1].likes).toBe(0)
})
test('Title and url required', async () => {
    const newBlog = {
        author: 'Author1',
        likes: 11,
    }
    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: `bearer ${token}` })
    expect(response.statusCode).toBe(400)
})
test('Remove by id', async () => {
    const blogs = await api.get('/api/blogs')
    blogs.body[0].user = initialUser.id

    await api
        .delete(`/api/blogs/${blogs.body[0].id}`)
        .set({ Authorization: `bearer ${token}` })
        .expect(204)

    const blogsEnd = await api.get('/api/blogs')

    expect(blogsEnd.body).toHaveLength(initialBlog.length - 1)
})
test('Update by id', async () => {
    const blogs = await api.get('/api/blogs')
    const updatedBlog = {
        url: 'String2',
        likes: 2,
    }

    await api.patch(`/api/blogs/${blogs.body[0].id}`).send(updatedBlog)

    const blogsEnd = await api.get(`/api/blogs`)

    expect(blogsEnd.body[0].likes).toBe(2)
    expect(blogsEnd.body[0].url).toBe('String2')
})

afterAll(() => {
    mongoose.connection.close()
})
