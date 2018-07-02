const axios = require('axios')
const teams = require('../constants/teams')
const {validators} = require('../helpers/validators')

exports.allTeams = (req, res) => {
  return res.json(teams)
}
exports.teamDetails = async (req, res) => {
  const teamID = validators.teamID(req, res)
  const url = `https://stats.nba.com/stats/teamdetails?teamID=${teamID}`
  const response = await axios.get(url)
  return res.json(response.data)
}
exports.teamRoster = async (req, res) => {
  const teamID = validators.teamID(req, res)
  const season = req.query.season ? validators.season(req, res) : '2017-18'
  const url = `http://stats.nba.com/stats/commonteamroster?Season=${season}&TeamID=${teamID}`
  const response = await axios.get(url)
  return res.json(response.data)
}
exports.teamAllTimeLeaders = async (req, res) => {
  const teamID = validators.teamID(req, res)
  const url = `https://stats.nba.com/stats/franchiseleaders?teamID=${teamID}`
  const response = await axios.get(url)
  return res.json(response.data)
}
exports.teamLogos = async (req, res) => {
  if (!req.query.teamABR) {
    return res.json('team name abbreviation (teamABR) is required')
  }
  const teamABR = req.query.teamABR ? req.query.teamABR : ''
  // If teamABR parameter exists in our teams array continue, otherwise give error message
  if (teams.find(team => team.abr === teamABR)) {
    const url = `http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${teamABR}.png`
    const response = await axios({
      method: 'GET',
      url,
      responseType: 'arraybuffer'
    })
    res.set('Content-Type', 'image/png')
    return res.send(response.data)
  } else {
    return res.status(400).json('Wrong team abbreviation')
  }
}
