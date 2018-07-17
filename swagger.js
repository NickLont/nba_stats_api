const swaggerJSDoc = require('swagger-jsdoc')

const swagger = (app) => {
  // Swagger Definition
  const swaggerDefinition = {
    info: {
      title: 'NBA Stats Api',
      version: '1.0.0',
      description: 'NBA Stats Api'
    },
    host: `localhost:${process.env.PORT || 3001}`,
    basePath: '/',
    schemes: ['http']
  }
  // Swagger options
  const options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./routes/playersStats.js', './routes/userAuth.js', './routes/teamsStats.js']
  }
  // swagger-jsdoc init
  const swaggerSpec = swaggerJSDoc(options)

  // serve swagger
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}

module.exports = swagger
