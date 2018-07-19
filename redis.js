const redis = require('redis')
const axios = require('axios')

const client = redis.createClient()
client.on('error', (err) => {
  console.log(`Error: ${err}`)
})
const applyRedis = async (req, res, name, url) => {
  return client.get(`${name}${JSON.stringify(req.query)}`, async (err, result) => {
    console.log('reddis keyis: ', `${name}${JSON.stringify(req.query)}`)
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

module.exports = {client, applyRedis}
