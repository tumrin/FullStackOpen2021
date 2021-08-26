const mongoose = require('mongoose')
const User = require('../models/user')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
  })

test('same username', async () => {
    const users = [
        {username: "testiH",
        name: "Testi Henkilö",
        password:"1224"},
        {username: "testiH",
        name: "Testi Henkilö2",
        password:"1224"}
    ]
    await api.post('/api/users').send(users[0])
    const response = await api.post('/api/users').send(users[1])
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toContain('User validation failed:')
  })
  test('password', async () => {
    const user = {
        username: "testiH",
        name: "Testi Henkilö"
    }
    const response = await api.post('/api/users').send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('Password missing')
  })

  afterAll(() => {
    mongoose.connection.close()
  })