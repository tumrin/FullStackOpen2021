import React, { useEffect, useState } from 'react'
import Blog from './Blog'

const BlogList = ({ blogService, user }) => {
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [blogService, user])
  blogs.sort((a, b) => b.likes - a.likes)
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogService={blogService}
          setBlogs={setBlogs}
          blogs={blogs}
          user={user}
        />
      ))}
    </div>
  )
}

export default BlogList
