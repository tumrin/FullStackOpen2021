import React, { useState } from 'react'
const Blog = ({ blog }) => {
    const [detail, showDetail] = useState(false)
    if (detail) {
        return (
            <div style={{ borderStyle: 'solid', marginBottom: 10, padding: 2 }}>
                {blog.title} {blog.author}{' '}
                <button onClick={() => showDetail(false)}>hide</button>
                <br />
                {blog.url}
                <br />
                {blog.likes} <button>like</button>
                <br />
                {blog.user.name}
            </div>
        )
    } else {
        return (
            <div>
                {blog.title} {blog.author}
                <button onClick={() => showDetail(true)}>show</button>
            </div>
        )
    }
}

export default Blog
