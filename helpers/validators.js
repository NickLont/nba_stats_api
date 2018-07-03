const Joi = require('joi')
const ValidationError = require('../handlers/error')

const _Validate = (value, schema, name, res) => {
  Joi.validate(value, schema, (error) => {
    if (error) {
      throw new ValidationError(error.details[0].message, name, res)
    }
  })
  return value
}

const teamIDSchema = Joi.string().length(10).required()
const teamID = (teamID, res) => _Validate(teamID, teamIDSchema, 'teamID', res)

const playerIDSchema = Joi.string().min(1).required()
const playerID = (playerID, res) => _Validate(playerID, playerIDSchema, 'playerID', res)

const seasonSchema = Joi.string().regex(/^\d{4}-\d{2}$/)
const season = (season, res) => {
  if (!season) {
    return '2017-18'
  } else return _Validate(season, seasonSchema, 'season', res)
}

const leagueIDSchema = Joi.string().valid('00', '01').required()
const leagueID = (leagueID, res) => {
  if (!leagueID) {
    return '00'
  } else {
    return _Validate(leagueID, leagueIDSchema, 'leagueID', res)
  }
}

const perModeSchema = Joi.string().valid('Totals', 'PerGame', 'MinutesPer', 'Per48', 'Per40', 'Per36', 'PerMinute', 'PerPossession', 'PerPlay', 'Per100Possessions', 'Per100Plays').required()
const perMode = (perMode, res) => {
  if (!perMode) {
    return 'PerGame'
  } else {
    return _Validate(perMode, perModeSchema, 'perMode', res)
  }
}

const booleanLiteralSchema = Joi.string().valid('Y', 'N').required()
const booleanLiteral = (booleanLiteral, res, name) => {
  if (!booleanLiteral) {
    return 'N'
  } else {
    return _Validate(booleanLiteral, booleanLiteralSchema, name, res)
  }
}

const seasonTypeSchema = Joi.string().valid('Regular Season', 'Pre Season', 'Playoffs').required()
const seasonType = (seasonType, res) => {
  if (!seasonType) {
    return 'Reguler Season'
  } else {
    return _Validate(seasonType, seasonTypeSchema, 'seasonType', res)
  }
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
