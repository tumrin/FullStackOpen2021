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
    const [blog, setBlog] = useState({ title: '', author: '', url: '' })

    useEffect(() => {
        blogService.getAllUser(user).then((blogs) => setBlogs(blogs))
    }, [user, blog])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    return (
        <div>
            {user === null ? (
                loginForm(username, setUsername, password, setPassword, setUser)
            ) : (
                <div>
                    {user.name} logged in
                    <button
                        onClick={() => {
                            window.localStorage.removeItem('loggedBlogUser')
                            setUser(null)
                        }}
                    >
                        logout
                    </button>
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
