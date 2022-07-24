const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  const correctPassword = user === null
    ? false
    : bcrypt.compare(password, user.passwordHash)

  if (!(user && correctPassword)) {
    return response.status(401).json({ error: 'Invalid username or password' })
  }

  const userForToken = {
    username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)
  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter