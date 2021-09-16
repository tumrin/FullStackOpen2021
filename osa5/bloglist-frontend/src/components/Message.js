import React from 'react'

const Message = ({ type, blog }) => {
    return (
        <div>
            {type === 'login'
                ? 'Username or password incorrect'
                : `${blog.title} by ${blog.author} added`}
        </div>
    )
}

export default Message
