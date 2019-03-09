const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  let token
  if (req.token) {
    token = req.token
  } else if (req.get('Authorization')) {
    token = req.get('Authorization')
  }
  if (!token) {
    return res.status(403).json({
      failed: 'No token provided'
    })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    console.log('err, decoded: ', err, decoded)
    if (err) {
      return res.status(401).json({
        failed: 'Failed to authenticate token'
      })
    }
    req.userId = decoded.id
    next()
  })
}

module.exports = {
  verifyToken
}
