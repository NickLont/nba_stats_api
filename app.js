// Express configuration

const express = require('express')
const path = require('path')
const fs = require('fs')
const swaggerJSDoc = require('swagger-jsdoc')

const app = express()
const router = express.Router()

const userAuthRoutes = require('./routes/userAuth')
const playersStatsRoutes = require('./routes/playersStats')
const teamsStatsRoutes = require('./routes/teamsStats')
const bodyParser = require('body-parser')
const bearerToken = require('express-bearer-token')

// Registration of middleware for express configuration

// Swagger Definition
const swaggerDefinition = {
  info: {
    title: 'NBA Stats Api',
    version: '1.0.0',
    description: 'NBA Stats Api'
  },
  host: `localhost:${process.env.PORT || 3001}`,
  basePath: '/'
}
// Swagger options
const options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./routes/playersStats.js', './routes/userAuth.js', './routes/teamsStats.js']
}
// swagger-jsdoc init
const swaggerSpec = swaggerJSDoc(options)

// Logger for timestamp and method whenever we get an API call
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
app.use(express.static(path.resolve(__dirname, 'public'))) // set the static directory for our public files
// Take token from header Authentication: Bearer :token and put it in req.token
app.use(bearerToken())
// Body parser to validate req. object
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Maintenance html serve
// app.use((req, res, next) => {
//   res.sendFile(path.resolve('./views/maintenance.html'))
//   next()
//   // TODO add a check to .env file for maintenance
// })

app.use('/user', userAuthRoutes)
app.use('/stats/players', playersStatsRoutes)
app.use('/stats/teams', teamsStatsRoutes)
app.use('/swagger', router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
}))

module.exports = app
