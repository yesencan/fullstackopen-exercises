const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
  const { name, username, password } = request.body

  if (await User.exists({ username: username })) {
    return response.status(400).json({ error: "username exists" })
  } else if (password.length < 3) {
    return response.status(400).json({ error: "invalid password" })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const newUser = new User({
    name,
    username,
    passwordHash
  })

  const savedUser = await newUser.save()
  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  response.json(await User.find({}).populate('blogs', { url:1, title: 1, author: 1 }))
})
module.exports = usersRouter