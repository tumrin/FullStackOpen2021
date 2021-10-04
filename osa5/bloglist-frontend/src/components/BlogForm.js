import React, { useState } from 'react'

const BlogForm = ({ setMessage, setLastAdded, toggleRef, creationHandler }) => {
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
        id='title'
        value={blog.title}
        onChange={(event) => setBlog({ ...blog, title: event.target.value })}
      />
      <br />
      <label>Author</label>
      <input
        id='author'
        value={blog.author}
        onChange={(event) => setBlog({ ...blog, author: event.target.value })}
      />
      <br />
      <label>URL</label>
      <input
        id='url'
        value={blog.url}
        onChange={(event) => setBlog({ ...blog, url: event.target.value })}
      />
      <br />
      <button type='submit'>save</button>
    </form>
  )
}

export default BlogForm
