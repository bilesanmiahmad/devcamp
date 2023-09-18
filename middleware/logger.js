const logger = (req, re, next) => {
    req.hello = 'Hello World'
    console.log('Middleware ran')
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`)
    next()
}

module.exports = logger