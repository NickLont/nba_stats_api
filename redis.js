const redis = require('redis')

const client = redis.createClient()
client.on('error', (err) => {
  console.log(`Error: ${err}`)
})
const applyRedis = (name, query, url) => {
  
}

module.exports = {client, applyRedis}
