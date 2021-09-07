import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginForm from './components/LoginForm'
import blogForm from './components/BlogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [blog, setBlog] = useState('')

    useEffect(() => {
        blogService.getAllUser(user).then((blogs) => setBlogs(blogs))
    }, [user])

    return (
        <div>
            {user === null ? (
                loginForm(username, setUsername, password, setPassword, setUser)
            ) : (
                <div>
                    <p>{user.name} logged in</p>
                    {blogForm(blog, setBlog)}
                    <h2>blogs</h2>
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default App
