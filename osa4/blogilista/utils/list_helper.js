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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  }