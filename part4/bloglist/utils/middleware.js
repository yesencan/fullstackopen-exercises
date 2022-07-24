const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    request.token = auth.substring(7)
  }
  next()
}

const userExtractor = (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (decodedToken) {
    request.user = {
      username: decodedToken.username,
      id: decodedToken.id
    }
  }
  next()
}

module.exports = {
  tokenExtractor,
  userExtractor
}
