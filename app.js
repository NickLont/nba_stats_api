// Express configuration

const express = require('express')
const path = require('path')
const fs = require('fs')
const swagger = require('./swagger')
const responseTime = require('response-time')

const app = express()

const userAuthRoutes = require('./routes/userAuth')
const playersStatsRoutes = require('./routes/playersStats')
const teamsStatsRoutes = require('./routes/teamsStats')
const bodyParser = require('body-parser')
const bearerToken = require('express-bearer-token')

// Registration of middleware for express configuration

// Logger for timestamp and method whenever we get an API call if in development environment
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    const now = new Date().toString()
    const colouredLog = `\x1b[36mTimestamp\x1b[0m: ${now} \n\x1b[31mMethod\x1b[0m: ${req.method} \n\x1b[34mPATH\x1b[0m: ${req.url}\n\x1b[36mIP\x1b[0m: ${req.ip}\n`
    console.log(colouredLog)
    const log = `\nTimestamp: ${now.toString()} \nMethod: ${req.method} \nPATH: ${req.url}\nIP: ${req.ip}\n`
    fs.appendFile('server.log', log, (err) => {
      if (err) {
        console.log('Unable to append to server.log')
      }
    })
    next()
  })
}
// Maintenance html serve
app.use((req, res, next) => {
  if (process.env.MAINTENANCE === 'true') {
    res.sendFile(path.resolve('./views/maintenance.html'))
  } else {
    next()
  }
})
app.use(express.static(path.resolve(__dirname, 'public'))) // set the static directory for our public files
// Take token from header Authentication: Bearer :token and put it in req.token
app.use(bearerToken())
// Body parser to validate req. object
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Enable Swagger
// Access swagger definition at /swagger.json and swagger itself at /swagger
swagger(app)

// use response-time middleware
app.use(responseTime())

// add headers to responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/user', userAuthRoutes)
app.use('/stats/players', playersStatsRoutes)
app.use('/stats/teams', teamsStatsRoutes)
module.exports = app
