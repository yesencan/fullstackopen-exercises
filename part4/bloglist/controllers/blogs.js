const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  response.json(await Blog.find({}))
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog({
    ...request.body,
    likes: request.body.likes || 0
  })
  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch {
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const newBlog = {
    ...request.body
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true, runValidators: true })
  response.json(updatedBlog)
})
module.exports = blogsRouter