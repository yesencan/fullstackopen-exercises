const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, current) => total += current.likes, 0)
}

const favoriteBlog = (blogs) => {
  const blogLikes = blogs.map(blog => blog.likes)
  const favorite = blogs[blogLikes.indexOf(Math.max(...blogLikes))]

  return favorite === undefined
    ? {}
    : {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes,
    }
}

const mostBlogs = (blogs) => {
  const part = _.groupBy(blogs, b => b.author)
  const keys = Object.keys(part)
  const counts = keys.map(key => part[key].length)
  const most = part[keys[counts.indexOf(Math.max(...counts))]]

  return most === undefined
    ? {}
    : {
      author: most[0].author,
      blogs: most.length
    }
}

const mostLikes = (blogs) => {
  const part = _.groupBy(blogs, b => b.author)
  const keys = Object.keys(part)
  const likes = keys.map(key => part[key].reduce((total, curr) => total += curr.likes, 0))
  const most = keys[likes.indexOf(Math.max(...likes))]

  return most === undefined
    ? {}
    : {
      author: most,
      likes: Math.max(...likes)
    }
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}