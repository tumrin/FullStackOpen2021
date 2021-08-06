const listHelper = require('../utils/list_helper')

const noBlogs = []
const oneBlog = [
  {
    title: 'Testi',
    author: 'Testi henkilö',
    url: 'Unknown',
    likes: 1
  }
]
const multipleBlogs = [
  {
    title: 'Testi',
    author: 'Testi henkilö',
    url: 'Unknown',
    likes: 1
  },
  {
    title: 'Testi1',
    author: 'Testi henkilö1',
    url: 'Unknown',
    likes: 2
  },
  {
    title: 'Testi2',
    author: 'Testi henkilö2',
    url: 'Unknown',
    likes: 3
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

////TOTAL LIKES//////////////////////////////////////
describe('Total likes', () => {
  test('Empty list', () => {
    expect(listHelper.totalLikes(noBlogs)).toBe(0)
  })

  test('List has 1 blog', () => {
    expect(listHelper.totalLikes(oneBlog)).toBe(1)
  })

  test('Has multiple blogs', () => {
    expect(listHelper.totalLikes(multipleBlogs)).toBe(6)
  })
})
////TOTAL LIKES//////////////////////////////////////

////FAVORITE BLOG//////////////////////////////////////
describe('Favorite blog', () => {
  test('Empty list', () => {
    expect(listHelper.favoriteBlog(noBlogs)).toEqual(null)
  })

  test('One blog', () => {
    expect(listHelper.favoriteBlog(oneBlog)).toEqual({
      title: 'Testi',
      author: 'Testi henkilö',
      url: 'Unknown',
      likes: 1
    })
  })

  test('Has multiple blogs', () => {
    expect(listHelper.favoriteBlog(multipleBlogs)).toEqual({
      title: 'Testi2',
      author: 'Testi henkilö2',
      url: 'Unknown',
      likes: 3
    })
  })
})
////FAVORITE BLOG//////////////////////////////////////

////MOST BLOGS//////////////////////////////////////
describe('Most blogs', () => {
  const multipleBlogs = [
    {
      title: 'Testi',
      author: 'Testi henkilö1',
      url: 'Unknown',
      likes: 1
    },
    {
      title: 'Testi1',
      author: 'Testi henkilö1',
      url: 'Unknown',
      likes: 2
    },
    {
      title: 'Testi2',
      author: 'Testi henkilö2',
      url: 'Unknown',
      likes: 3
    }
  ]
  const multipleMostBlogs = [
    {
      title: 'Testi',
      author: 'Testi henkilö1',
      url: 'Unknown',
      likes: 1
    },
    {
      title: 'Testi1',
      author: 'Testi henkilö1',
      url: 'Unknown',
      likes: 2
    },
    {
      title: 'Testi2',
      author: 'Testi henkilö2',
      url: 'Unknown',
      likes: 3
    },
    {
      title: 'Testi3',
      author: 'Testi henkilö2',
      url: 'Unknown',
      likes: 3
    }
  ]

  test('Empty list', () => {
    expect(listHelper.mostBlogs(noBlogs)).toEqual(null)
  })

  test('One blog', () => {
    expect(listHelper.mostBlogs(oneBlog)).toEqual({
      author: 'Testi henkilö',
      blogs: 1
    })
  })

  test('Has multiple blogs', () => {
    expect(listHelper.mostBlogs(multipleBlogs)).toEqual({
      author: 'Testi henkilö1',
      blogs: 2
    })
  })

  test('Multiple most blogs', () => {
    expect(listHelper.mostBlogs(multipleMostBlogs)).toEqual({
      author: 'Testi henkilö1',
      blogs: 2
    })
  })
})
////MOST BLOGS//////////////////////////////////////

////MOST LIKES//////////////////////////////////////
describe('Most Likes', () => {
  const multipleBlogs = [
    {
      title: 'Testi',
      author: 'Testi henkilö1',
      url: 'Unknown',
      likes: 1
    },
    {
      title: 'Testi1',
      author: 'Testi henkilö1',
      url: 'Unknown',
      likes: 2
    },
    {
      title: 'Testi2',
      author: 'Testi henkilö2',
      url: 'Unknown',
      likes: 3
    }
  ]
  const multipleMostLikes = [
    {
      title: 'Testi',
      author: 'Testi henkilö1',
      url: 'Unknown',
      likes: 3
    },
    {
      title: 'Testi1',
      author: 'Testi henkilö1',
      url: 'Unknown',
      likes: 3
    },
    {
      title: 'Testi2',
      author: 'Testi henkilö2',
      url: 'Unknown',
      likes: 3
    },
    {
      title: 'Testi3',
      author: 'Testi henkilö2',
      url: 'Unknown',
      likes: 3
    }
  ]
  test('Empty list', () => {
    expect(listHelper.mostLikes(noBlogs)).toEqual(null)
  })

  test('One blog', () => {
    expect(listHelper.mostLikes(oneBlog)).toEqual({
      author: 'Testi henkilö',
      likes: 1
    })
  })

  test('Has multiple blogs', () => {
    expect(listHelper.mostLikes(multipleBlogs)).toEqual({
      author: 'Testi henkilö1',
      likes: 3
    })
  })
  test('Multiple most Likes', () => {
    expect(listHelper.mostLikes(multipleMostLikes)).toEqual({
      author: 'Testi henkilö1',
      likes: 6
    })
  })
})
////MOST LIKES//////////////////////////////////////