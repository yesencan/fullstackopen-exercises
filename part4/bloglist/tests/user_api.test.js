const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('user creation', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('adds a valid user successfully', async () => {
    await User.deleteMany({})
    const user = {
      name: "memt",
      username: "memt123",
      password: "memt123556"
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
  })

  test('gives error when duplicate username is given', async () => {
    const user = {
      name: "new",
      username: "root",
      password: "12345"
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    expect(result.body.error).toContain('username exists')
  })

  test('gives error when invalid password is given', async () => {
    const user = {
      name: "new",
      username: "new",
      password: "12"
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    expect(result.body.error).toContain('invalid password')
  })
})