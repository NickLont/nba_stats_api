const redis = require('redis')
const axios = require('axios')

// Set diferent environment depending if deployment takes place in docker or locally
const host = process.env.DOCKER_ENV === 'true' ? 'redis' : 'localhost'
let client = {}

// Not setting up redis client (so not using caching) when testing
if (process.env.NODE_ENV !== 'testing') {
  client = redis.createClient({
    return_buffers: true,
    host
  })
  client.on('error', (err) => {
    console.log(`Redis Error: ${err}`)
  })
}
// Check if key exists in Redis memory. If yes serve it,
// if not make a new call and store the key/value pair
// The key we create for each call is its name + the query params used in the call
// If environment is testing, don 't use redis and just return the async response
const getResponse = async (req, res, name, url) => {
  try {
    if (process.env.NODE_ENV !== 'testing') {
      return client.get(`${name}${JSON.stringify(req.query)}`, async (err, result) => {
        if (err) {
          throw new Error(err)
        }
        if (result) {
          const resultJSON = JSON.parse(result)
          return res.json(resultJSON)
        } else {
          const response = await axios.get(url)
          const data = response.data
          client.setex(`${name}${JSON.stringify(req.query)}`, 3600, JSON.stringify({source: 'redis cache', data}))
          return res.json({source: 'nba.stats remote api', data})
        }
      })
    } else {
      const response = await axios.get(url)
      const data = response.data
      return res.json({source: 'nba.stats remote api', data})
    }
  } catch (e) {
    throw new Error(e)
  }
}
const getResponseForImages = async (req, res, name, url) => {
  try {
    if (process.env.NODE_ENV !== 'testing') {
      return client.get(`${name}${JSON.stringify(req.query)}`, async (err, result) => {
        if (err) {
          throw new Error(err)
        }
        if (result) {
          res.set('Content-Type', 'image/png')
          res.send(result)
        } else {
          const response = await axios({
            method: 'GET',
            url,
            responseType: 'arraybuffer'
          })
          const data = response.data
          client.setex(`${name}${JSON.stringify(req.query)}`, 3600, data)
          res.set('Content-Type', 'image/png')
          res.send(data)
        }
      })
    } else {
      const response = await axios({
        method: 'GET',
        url,
        responseType: 'arraybuffer'
      })
      const data = response.data
      res.set('Content-Type', 'image/png')
      res.send(data)
    }
  } catch (e) {
    throw new Error(e)
  }
}

module.exports = {client, getResponse, getResponseForImages}
