const swaggerJSDoc = require('swagger-jsdoc')

const swagger = (app) => {
  // Swagger Definition
  const swaggerDefinition = {
    info: {
      title: 'NBA Stats Api',
      version: '1.0.0',
      description: 'NBA Stats Api'
    },
    host: `localhost:3010`,
    basePath: '/',
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        description: 'JWT authorization of an API',
        name: 'Authorization',
        in: 'header'
      }
    }
  }
  // Swagger options
  const options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./routes/userAuth.js', './routes/playersStats.js', './routes/teamsStats.js', './swaggerDefinitions.js']
  }
  // swagger-jsdoc init
  const swaggerSpec = swaggerJSDoc(options)

  // serve swagger
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.send(swaggerSpec)
  })
}

module.exports = swagger
