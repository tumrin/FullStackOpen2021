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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }