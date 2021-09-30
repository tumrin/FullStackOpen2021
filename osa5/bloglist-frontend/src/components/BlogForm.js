import React, { useState } from 'react'
import blogService from '../services/blogs'

const creationHandler = async (
  event,
  blog,
  setBlog,
  setMessage,
  setLastAdded,
  toggleRef
) => {
  event.preventDefault()
  await blogService.create(blog)
  setMessage(true)
  setLastAdded(blog)
  toggleRef.current.toggleVisibility()
  setBlog({ title: '', author: '', url: '' })
}

const BlogForm = ({ setMessage, setLastAdded, toggleRef }) => {
  const [blog, setBlog] = useState({ title: '', author: '', url: '' })
  return (
    <form
      onSubmit={(event) =>
        creationHandler(
          event,
          blog,
          setBlog,
          setMessage,
          setLastAdded,
          toggleRef
        )
      }
    >
      <h1>Create new blog</h1>
      <label>Title</label>
      <input
        value={blog.title}
        onChange={(event) => setBlog({ ...blog, title: event.target.value })}
      />
      <br />
      <label>Author</label>
      <input
        value={blog.author}
        onChange={(event) => setBlog({ ...blog, author: event.target.value })}
      />
      <br />
      <label>URL</label>
      <input
        value={blog.url}
        onChange={(event) => setBlog({ ...blog, url: event.target.value })}
      />
      <br />
      <button type='submit'>save</button>
    </form>
  )
}

export default BlogForm
