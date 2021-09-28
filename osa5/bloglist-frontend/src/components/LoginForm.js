import React from 'react'
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

const LoginForm = ({
    username,
    setUsername,
    password,
    setPassword,
    setUser,
    setMessage,
}) => {
    return (
        <form
            onSubmit={async (event) =>
                await handleLogin(
                    event,
                    username,
                    password,
                    setUser,
                    setMessage
                )
            }
        >
            <div>
                username
                <input
                    type='text'
                    value={username}
                    name='Username'
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type='password'
                    value={password}
                    name='Password'
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type='submit'>login</button>
        </form>
    )
}

export default LoginForm
