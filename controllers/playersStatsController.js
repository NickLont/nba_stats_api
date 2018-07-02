const axios = require('axios')
const {validators} = require('../helpers/index')

exports.allPlayers = async (req, res) => {
  const currentSeasonOnly = req.query.currentSeasonOnly ? req.query.currentSeasonOnly : '1'
  const season = req.query.season ? validators.season(req, res) : '2017-18'
  const leagueID = req.query.leagueID ? req.query.leagueID : '00'
  const url = `http://stats.nba.com/stats/commonallplayers?IsOnlyCurrentSeason=${currentSeasonOnly}&Season=${season}&LeagueID=${leagueID}`
  const response = await axios.get(url)

  return res.json(response.data)
}
exports.playerImage = async (req, res) => {
  const playerID = validators.playerID(req, res)
  const url = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerID}.png`
  const response = await axios({
    method: 'GET',
    url,
    responseType: 'arraybuffer'
  })

  res.set('Content-Type', 'image/png')
  res.send(response.data)
}
exports.playerPersonalInfo = async (req, res) => {
  const playerID = validators.playerID(req, res)
  const url = `http://stats.nba.com/stats/commonplayerinfo?PlayerID=${playerID}`
  const response = await axios(url)
  return res.json(response.data)
}
exports.playerCareerInfo = async (req, res) => {
  const playerID = validators.playerID(req, res)
  const perMode = req.query.perMode ? req.query.perMode : 'Totals'
  const url = `http://stats.nba.com/stats/playercareerstats?PlayerID=${playerID}&PerMode=${perMode}`
  const response = await axios.get(url)
  return res.json(response.data)
}
exports.playersLeagueLeaders = async (req, res) => {
  const season = req.query.season ? validators.season(req, res) : '2017-18'
  const url = `https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=Totals&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=${season}&SeasonSegment=&SeasonType=Playoffs&ShotClockRange=&StarterBench=&TeamID=0&VsConference=&VsDivision=&Weight=`
  const response = await axios.get(url)
  return res.json(response.data)
}
exports.playerYearOverYear = async (req, res) => {
  const playerID = validators.playerID(req, res)
  const season = req.query.season ? validators.season(req, res) : '2017-18'
  const measureType = req.query.measureType ? req.query.measureType : 'Base'
  const leagueID = req.query.leagueID ? req.query.leagueID : '00'
  const paceAdjust = req.query.paceAdjust ? req.query.paceAdjust : 'N'
  const opponentTeamID = req.query.opponentTeamID ? req.query.opponentTeamID : '0'
  const plusMinus = req.query.plusMinus ? req.query.plusMinus : 'N'
  const rank = req.query.rank ? req.query.rank : 'N'
  const perMode = req.query.perMode ? req.query.perMode : 'PerGame'
  const period = req.query.period ? req.query.period : '0'
  const seasonType = req.query.seasonType ? req.query.seasonType : 'Regular Season'
  const vsConference = req.query.vsConference ? req.query.vsConferance : ''
  const vsDivision = req.query.vsDivision ? req.query.vsDivision : ''

  const url =
    `
      https://stats.nba.com/stats/playerdashboardbyyearoveryear?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=${leagueID}&Location=&MeasureType=${measureType}&Month=0&OpponentTeamID=${opponentTeamID}&Outcome=&PORound=0&PaceAdjust=${paceAdjust}&PerMode=${perMode}&Period=${period}&PlayerID=${playerID}&PlusMinus=${plusMinus}&Rank=${rank}&Season=${season}&SeasonSegment=&SeasonType=${seasonType}&ShotClockRange=&Split=yoy&VsConference=${vsConference}&VsDivision=${vsDivision}
    `
  const response = await axios.get(url)
  return res.json(response.data)
}
exports.playerShotChart = async (req, res) => {
  const playerID = validators.playerID(req, res)
  const season = req.query.season ? validators.season(req, res) : '2017-18'
  const url = `http://stats.nba.com/stats/shotchartdetail?CFID=33&CFPARAMS=${season}&ContextFilter=&ContextMeasure=FGA&DateFrom=&DateTo=&GameID=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerID=${playerID}&PlusMinus=N&Position=&Rank=N&RookieYear=&Season=${season}&SeasonSegment=&SeasonType=Regular+Season&TeamID=0&VsConference=&VsDivision=&mode=Advanced&showDetails=0&showShots=1&showZones=0&PlayerPosition=`
  const response = await axios.get(url)
  return res.json(response.data)
}
