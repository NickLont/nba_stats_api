const Joi = require('joi')

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

const leagueIDSchema = Joi.string().valid('00', '01').required()
const leagueID = (req, res) => {
  Joi.validate(req.query.leagueID, leagueIDSchema, (error) => {
    if (error) {
      res.status(400).json(error.details[0].message.replace(/"/g, '').replace('value', 'LeagueID'))
      throw new Error(error)
    }
  })
  return req.query.leagueID
}

const perModeSchema = Joi.string().valid('Totals', 'PerGame', 'MinutesPer', 'Per48', 'Per40', 'Per36', 'PerMinute', 'PerPossession', 'PerPlay', 'Per100Possessions', 'Per100Plays').required()
const perMode = (req, res) => {
  Joi.validate(req.query.perMode, perModeSchema, (error) => {
    if (error) {
      res.status(400).json(error.details[0].message.replace(/"/g, '').replace('value', 'perMode'))
      throw new Error(error)
    }
  })
  return req.query.perMode
}

const booleanLiteralSchema = Joi.string().valid('Y', 'N').required()
const booleanLiteral = (req, res, query) => {
  Joi.validate(req.query[query].toUpperCase(), booleanLiteralSchema, (error) => {
    if (error) {
      res.status(400).json(error.details[0].message.replace(/"/g, '').replace('value', query))
      throw new Error(error)
    }
  })
  return req.query[query].toUpperCase()
}

const seasonTypeSchema = Joi.string().valid('Regular Season', 'Pre Season', 'Playoffs').required()
const seasonType = (req, res) => {
  Joi.validate(req.query.seasonType, seasonTypeSchema, (error) => {
    if (error) {
      res.status(400).json(error.details[0].message.replace(/"/g, '').replace('value', 'seasonType'))
      throw new Error(error)
    }
  })
  return req.query.seasonType
}

module.exports = {
  validators: {
    playerID,
    teamID,
    season,
    leagueID,
    perMode,
    booleanLiteral,
    seasonType
  }
}
