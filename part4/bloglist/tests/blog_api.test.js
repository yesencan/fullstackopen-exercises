const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title:"memt",
    author:"memati",
    url:"memt.com",
    likes:0
  },
  {
    title:"fako",
    author:"sönmez",
    url:"fako.com",
    likes:12
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObj = new Blog(initialBlogs[0])
  await blogObj.save()
  blogObj = new Blog(initialBlogs[1])
  await blogObj.save()
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are correct amount of blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('the first note is by memati', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].author).toBe('memati')
})

test('identifier property is named \'id\'', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('adds blogs correctly', async () => {
  const newBlog = {
    author:"test",
    title:"testtitle",
    url:"test.com",
    likes:32
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(initialBlogs.length + 1)
})

test('default number for likes is 0', async () => {
  const newBlog = {
    author:"test",
    title:"testtitle",
    url:"test.com"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body[response.body.length - 1].likes).toBe(0)
})

test('author and title are required', async () => {
  const newBlog = {}

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('can delete a blog', async () => {
  const response = await api.get('/api/blogs')

  await api
    .delete(`/api/blogs/${response.body[0].id}`)
    .expect(204)
})

test('can update likes', async () => {
  const response = await api.get('/api/blogs')
  const id = response.body[0].id
  const newBlog = {
    ...response.body[0],
    likes: response.body[0].likes + 5
  }

  await api
    .put(`/api/blogs/${id}`)
    .send(newBlog)

  const newBlogs = await api.get('/api/blogs')
  expect(newBlogs.body[0].likes).toBe(response.body[0].likes + 5)
})
afterAll(() => {
  mongoose.connection.close()
})