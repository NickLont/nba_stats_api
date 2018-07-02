const jwt = require('jsonwebtoken')
const Joi = require('joi')

const verifyToken = (req, res, next) => {
  const token = req.token

  if (!token) {
    return res.status(403).json({
      failed: 'No token provided'
    })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({
        failed: 'Failed to authenticate token'
      })
    }
    req.userId = decoded.id
    next()
  })
}

const teamIDSchema = Joi.string().length(10).required()
const teamID = (req, res) => {
  Joi.validate(req.query.teamID, teamIDSchema, (error) => {
    if (error) {
      res.status(400).json(error.details[0].message.replace(/"/g, '').replace('value', 'TeamID'))
      throw new Error(error)
    }
  })
  return req.query.teamID
}

const playerIDSchema = Joi.string().min(1).required()
const playerID = (req, res) => {
  Joi.validate(req.query.playerID, playerIDSchema, (error) => {
    if (error) {
      res.status(400).json(error.details[0].message.replace(/"/g, '').replace('value', 'PlayerID'))
      throw new Error(error)
    }
  })
  return req.query.playerID
}

const seasonIDSchema = Joi.string().regex(/^\d{4}-\d{2}$/)
const season = (req, res) => {
  Joi.validate(req.query.season, seasonIDSchema, (error) => {
    if (error) {
      res.status(400).json(error.details[0].message.replace(/"/g, '').replace('value', 'Season'))
      throw new Error(error)
    }
  })
  return req.query.season
}

module.exports = {
  verifyToken,
  validators: {
    playerID,
    teamID,
    season
  }
}
