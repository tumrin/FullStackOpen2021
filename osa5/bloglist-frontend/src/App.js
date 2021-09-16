import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Message from './components/Message'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [blog, setBlog] = useState({ title: '', author: '', url: '' })
    const [message, setMessage] = useState(false)
    const [lastAdded, setLastAdded] = useState({})

    useEffect(() => {
        if (message === true) {
            let id = setInterval(() => {
                setMessage(false)
                clearInterval(id)
            }, 2000)
        }
    }, [message])

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
            {message === true && user === null ? <Message type='login' /> : ''}
            {user === null ? (
                <LoginForm
                    username={username}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    password={password}
                    setUser={setUser}
                    setMessage={setMessage}
                />
            ) : (
                <div>
                    {message === true ? (
                        <Message type='blog' blog={lastAdded} />
                    ) : (
                        ''
                    )}
                    {user.name} logged in
                    <button
                        onClick={() => {
                            window.localStorage.removeItem('loggedBlogUser')
                            setUser(null)
                        }}
                    >
                        logout
                    </button>
                    <BlogForm
                        blog={blog}
                        setBlog={setBlog}
                        setMessage={setMessage}
                        setLastAdded={setLastAdded}
                    />
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
