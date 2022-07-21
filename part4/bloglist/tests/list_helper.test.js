const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  expect(listHelper.dummy([])).toBe(1)
})

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

describe('totalLikes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
  test('of one blog is its total likes', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(listWithOneBlog[0].likes)
  })
  test('of multiple blogs returns correct number', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})

describe('favoriteBlog', () => {
  test('of empty list returns empty', () => {
    expect(listHelper.favoriteBlog([])).toEqual({})
  })
  test('of one blog is itself', () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual({
      title: listWithOneBlog[0].title,
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes,
    })
  })
  test('of multiple blogs returns correct value', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual({
      title: blogs[2].title,
      author: blogs[2].author,
      likes: blogs[2].likes,
    })
  })
})

describe('mostBlogs', () => {
  test('of empty list returns empty', () => {
    expect(listHelper.mostBlogs([])).toEqual({})
  })
  test('of one blog is itself', () => {
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({
      author: listWithOneBlog[0].author,
      blogs: 1
    })
  })
  test('of multiple blogs returns correct', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    })
  })
})

describe.only('mostLikes', () => {
  test('of empty list returns empty', () => {
    expect(listHelper.mostLikes([])).toEqual({})
  })
  test('of one blog is itself', () => {
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual({
      author: listWithOneBlog[0].author,
      likes: 5
    })
  })
  test('of multiple blogs returns correct', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })
})