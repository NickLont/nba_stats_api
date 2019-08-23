// import environmental variables from our .env file
require('dotenv').config({ path: '.env' })

// MongoDB database connection
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true })
mongoose.Promise = global.Promise // Tell Mongoose to use ES6 promises
mongoose.connection.on('connected', () => {
  console.log('Connected to database')
})
mongoose.connection.on('error', (err) => {
  console.error(`🚫 → ${err.message}`)
})

// Express settings
const app = require('./app')
// Bind app to port
app.set('port', 3010)

// Start app
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`)
})
