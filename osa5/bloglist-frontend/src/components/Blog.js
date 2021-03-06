import React, { useState } from 'react'
const Blog = ({ blog, blogService, setBlogs, blogs, user }) => {
  const [detail, showDetail] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  if (detail) {
    return (
      <div
        className='blog'
        style={{ borderStyle: 'solid', marginBottom: 10, padding: 2 }}
      >
        {blog.title} {blog.author}{' '}
        <button onClick={() => showDetail(false)}>hide</button>
        <br />
        {blog.url}
        <br />
        <span id='likes'>{likes}</span>
        <button
          id='likeButton'
          onClick={() => {
            setLikes(++blog.likes)
            blogService?.update(blog.id, {
              user: blog.user.id,
              likes: blog.likes,
              author: blog.author,
              title: blog.title,
              url: blog.url,
            })
            let newBlogs = [...blogs]
            newBlogs[blogs.indexOf(blog)] = blog
            setBlogs(newBlogs)
          }}
        >
          like
        </button>
        <br />
        {blog.user.name}
        <br />
        {blog.user.username === user.username ? (
          <button
            id='removeButton'
            onClick={() => {
              let result = window.confirm(`Remove ${blog.title}?`)
              if (result) {
                blogService.remove(blog.id)
                setBlogs(blogs.filter((e, i) => i !== blogs.indexOf(blog)))
              }
            }}
          >
            remove
          </button>
        ) : (
          ''
        )}
      </div>
    )
  } else {
    return (
      <div className='blog'>
        {blog.title} {blog.author}
        <button id='showButton' onClick={() => showDetail(true)}>
          show
        </button>
      </div>
    )
  }
}

export default Blog
