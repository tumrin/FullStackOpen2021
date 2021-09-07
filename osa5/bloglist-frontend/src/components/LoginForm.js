import React, { useState } from 'react'
import loginService from '../services/login'

const handleLogin = async (event, username, password, setUser) => {
    event.preventDefault()
    try {
        const user = await loginService.login({
            username,
            password,
        })
        await setUser(user)
    } catch (exeption) {}
}

const LoginForm = (username, setUsername, password, setPassword, setUser) => {
    return (
        <form
            onSubmit={async (event) =>
                await handleLogin(event, username, password, setUser)
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
