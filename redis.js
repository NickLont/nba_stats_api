const redis = require('redis')
const axios = require('axios')

const client = redis.createClient({return_buffers: true})
client.on('error', (err) => {
  console.log(`Error: ${err}`)
})
// Check if key exists in Redis memory. If yes serve it,
// if not make a new call and store the key/value pair
// The key we create for each call is its name + the query params used in the call
const applyRedis = async (req, res, name, url) => {
  return client.get(`${name}${JSON.stringify(req.query)}`, async (err, result) => {
    console.log('reddis key is: ', `${name}${JSON.stringify(req.query)}`)
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
}
const applyRedisForImage = async (req, res, name, url) => {
  return client.get(`${name}${JSON.stringify(req.query)}`, async (err, result) => {
    console.log('reddis key is: ', `${name}${JSON.stringify(req.query)}`)
    if (err) {
      throw new Error(err)
    }
    if (result) {
      // const resultJSON = JSON.parse(result)
      // const i = Buffer.from(result)
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
}

module.exports = {client, applyRedis, applyRedisForImage}
