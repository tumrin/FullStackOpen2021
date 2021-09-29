import React, { useState } from 'react'
const Blog = ({ blog, blogService, setBlogs, blogs }) => {
    const [detail, showDetail] = useState(false)
    const [likes, setLikes] = useState(blog.likes)
    if (detail) {
        return (
            <div style={{ borderStyle: 'solid', marginBottom: 10, padding: 2 }}>
                {blog.title} {blog.author}{' '}
                <button onClick={() => showDetail(false)}>hide</button>
                <br />
                {blog.url}
                <br />
                {likes}{' '}
                <button
                    onClick={() => {
                        setLikes(++blog.likes)
                        blogService.update(blog.id, {
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
