const teams = require('../constants/teams')
const {validators} = require('../helpers/validators')
const redis = require('../redis')

exports.allTeams = (req, res) => {
  return res.json(teams)
}
exports.teamDetails = async (req, res) => {
  const teamID = validators.teamID(req.query.teamID, res)
  const url = `https://stats.nba.com/stats/teamdetails?teamID=${teamID}`
  redis.applyRedis(req, res, 'teamDetails', url)
}
exports.teamRoster = async (req, res) => {
  const teamID = validators.teamID(req.query.teamID, res)
  const season = validators.season(req.query.season, res)
  const url = `http://stats.nba.com/stats/commonteamroster?Season=${season}&TeamID=${teamID}`
  redis.applyRedis(req, res, 'teamRoster', url)
}
exports.teamAllTimeLeaders = async (req, res) => {
  const teamID = validators.teamID(req.query.teamID, res)
  const url = `https://stats.nba.com/stats/franchiseleaders?teamID=${teamID}`
  redis.applyRedis(req, res, 'teamAllTimeLeaders', url)
}
exports.teamLogos = async (req, res) => {
  const teamID = validators.teamID(req.query.teamID, res)
  const result = teams.filter(team => team.id === teamID)
  if (result) {
    const url = `http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${result[0].abr}.png`
    redis.applyRedisForImage(req, res, 'teamLogos', url)
  } else {
    return res.status(400).json('Wrong teamID')
  }
}
