const axios = require('axios')
const teams = require('../constants/teams')

exports.allTeams = (req, res) => {
  res.json(teams)
}
exports.teamDetails = async (req, res) => {
  const teamID = req.query.teamID ? req.query.teamID : res.json('teamID is required')
  const url = `https://stats.nba.com/stats/teamdetails?teamID=${teamID}`
  const response = await axios.get(url)
  res.json(response.data)
}
exports.teamRoster = async (req, res) => {
  const teamID = req.query.teamID ? req.query.teamID : res.json('teamID is required')
  const seasonID = req.query.seasonID ? req.query.seasonID : '2017-18'
  const url = `http://stats.nba.com/stats/commonteamroster?Season=${seasonID}&TeamID=${teamID}`
  const response = await axios.get(url)
  res.json(response.data)
}
exports.teamAllTimeLeaders = async (req, res) => {
  const teamID = req.query.teamID ? req.query.teamID : res.json('teamID is required')
  const url = `https://stats.nba.com/stats/franchiseleaders?teamID=${teamID}`
  const response = await axios.get(url)
  res.json(response.data)
}
exports.teamLogos = async (req, res) => {
  const teamABR = req.query.teamABR ? req.query.teamABR : res.json('team name abbreviation (teamABR) is required')
  // If teamABR parameter exists in our teams array continue, otherwise give error message
  if (teams.find(team => team.abr === teamABR)) {
    const url = `http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${teamABR}.png`
    const response = await axios({
      method: 'GET',
      url,
      responseType: 'arraybuffer'
    })
    res.set('Content-Type', 'image/png')
    res.send(response.data)
  } else {
    res.json('Wrong team abbreviation')
  }
}
