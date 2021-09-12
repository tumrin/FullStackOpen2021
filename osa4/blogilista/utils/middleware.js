const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }
    next()
}

const userExtractor = async (request, response, next) => {
    try {
        decodedToken = jwt.verify(request.token, process.env.SECRET)
        const user = await User.findById(decodedToken.id)
        request.user = user
    } catch (error) {
        next(error)
    }
    next()
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'invalid or missing token' })
    } else if (error.name === 'CastError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'VersionError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

module.exports = {
    tokenExtractor,
    userExtractor,
    errorHandler
}
