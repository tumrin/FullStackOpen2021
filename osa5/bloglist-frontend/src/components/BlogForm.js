import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = (blog, setBlog) => {
    return (
        <form onSubmit={blogService.addBlog()}>
            <input
                value={blog}
                onChange={(event) => setBlog(event.target.value)}
            />
            <button type='submit'>save</button>
        </form>
    )
}

export default BlogForm
