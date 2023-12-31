const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')

const logger = require('./middleware/logger')
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')


// Load env vars
dotenv.config({ path: './config/config.env' })
const MONGO_URI = process.env.MONGO_URI

connectDB()

// Route files
const bootcamps = require('./routes/bootcamps')

const app = express()

// Body parser
app.use(express.json())

// Dev logging
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// app.use(logger)

// Mount routers
app.use('/api/v1/bootcamps', bootcamps)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`)
    // Close server & exit process
    server.close(() => process.exit(1))
})