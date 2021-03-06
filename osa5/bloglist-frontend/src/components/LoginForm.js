import React, { useState } from 'react'
import loginService from '../services/login'
import blogsService from '../services/blogs'

const handleLogin = async (event, username, password, setUser, setMessage) => {
  event.preventDefault()
  try {
    const user = await loginService.login({
      username,
      password,
    })
    window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
    blogsService.setToken(user.token)
    setUser(user)
  } catch (exeption) {
    setMessage(true)
  }
}

const LoginForm = ({ setUser, setMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return (
    <form
      onSubmit={async (event) =>
        await handleLogin(event, username, password, setUser, setMessage)
      }
    >
      <div>
        username
        <input
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='loginButton' type='submit'>
        login
      </button>
    </form>
  )
}

export default LoginForm
