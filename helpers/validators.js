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

const teamIDSchema = Joi.number().integer().min(1610612737).max(1610612764).required()
const teamID = (teamID, res) => _Validate(teamID, teamIDSchema, 'teamID', res)

const opponentTeamIDSchema = Joi.number().integer().min(1610612737).max(1610612764)
const opponentTeamID = (opponentTeamID, res) => {
  if (!opponentTeamID) {
    return '0'
  } else {
    return _Validate(opponentTeamID, opponentTeamIDSchema, 'opponentTeamID', res)
  }
}

const playerIDSchema = Joi.number().integer().min(1).required()
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
const booleanLiteral = (booleanLiteral, res, name, defaultValue) => {
  if (!booleanLiteral) {
    return defaultValue || 'N'
  } else {
    return _Validate(booleanLiteral, booleanLiteralSchema, name, res)
  }
}

const booleanNumericSchema = Joi.valid('0', '1', 0, 1).required()
const booleanNumeric = (booleanNumeric, res, name, defaultValue) => {
  if (!booleanNumeric) {
    return defaultValue || '0'
  } else {
    return _Validate(booleanNumeric, booleanNumericSchema, name, res)
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

const measureTypeSchema = Joi.string().valid('Base', 'Advanced', 'Misc', 'Four Factors', 'Scoring', 'Opponent', 'Usage', 'Defense').required()
const measureType = (measureType, res) => {
  if (!measureType) {
    return 'Base'
  } else {
    return _Validate(measureType, measureTypeSchema, 'measureType', res)
  }
}

module.exports = {
  validators: {
    playerID,
    teamID,
    opponentTeamID,
    season,
    leagueID,
    perMode,
    booleanLiteral,
    booleanNumeric,
    seasonType,
    measureType
  }
}
