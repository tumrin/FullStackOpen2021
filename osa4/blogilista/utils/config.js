require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV ==='test'
? process.env.TEST_URL
: process.env.URL

module.exports = MONGODB_URI