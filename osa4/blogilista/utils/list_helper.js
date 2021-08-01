let lodash = require('lodash');

const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0) || 0
}

const favoriteBlog = (blogs) => {
  let favBlog = blogs[0]

  blogs.forEach(element => {
    if(element.likes > favBlog.likes){
      favBlog = element
    }
  });

  return favBlog || null
}

const mostBlogs= (blogs) => {
  let blogCounts = Object.entries(lodash.countBy(blogs, 'author'))
  let mostBlogs = lodash.maxBy(blogCounts, (blog) => blog[1])
  mostBlogs = mostBlogs?{author: mostBlogs[0], blogs: mostBlogs[1]}:undefined
  return mostBlogs || null
}

const mostLikes = (blogs) => {
  let authorLikes = {};
  blogs.forEach(blog => authorLikes[blog.author] = 0)
  blogs.forEach(blog => authorLikes[blog.author] += blog.likes)
  authorLikes = Object.entries(authorLikes)
  let mostLikes = lodash.maxBy(authorLikes, (blog) => blog[1])
  mostLikes = mostLikes?{author: mostLikes[0], likes: mostLikes[1]}:undefined
  return mostLikes || null
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }