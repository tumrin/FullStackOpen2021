import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Message from './components/Message'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'

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

const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(false)
  const [lastAdded, setLastAdded] = useState({})
  const blogFormRef = useRef()

  useEffect(() => {
    if (message === true) {
      let id = setInterval(() => {
        setMessage(false)
        clearInterval(id)
      }, 2000)
    }
  }, [message, user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        {message ? <Message type='login' /> : ''}
        <LoginForm setUser={setUser} setMessage={setMessage} />
      </div>
    )
  } else {
    return (
      <div>
        {message ? <Message type='blog' blog={lastAdded} /> : ''}
        {user.name} logged in
        <button
          onClick={() => {
            window.localStorage.removeItem('loggedBlogUser')
            setUser(null)
          }}
        >
          logout
        </button>
        <Togglable buttonLabel='New blog' ref={blogFormRef}>
          <BlogForm
            setMessage={setMessage}
            setLastAdded={setLastAdded}
            toggleRef={blogFormRef}
            creationHandler={creationHandler}
          />
        </Togglable>
        <BlogList blogService={blogService} user={user} />
      </div>
    )
  }
}

export default App
