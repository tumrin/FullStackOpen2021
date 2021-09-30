import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ type, blog }) => {
  return (
    <div>
      {type === 'login'
        ? 'Username or password incorrect'
        : `${blog.title} by ${blog.author} added`}
    </div>
  )
}

Message.propTypes = {
  type: PropTypes.string.isRequired,
}

export default Message
