const axios = require('axios')
const {validators} = require('../helpers/validators')
const redis = require('../redis')

exports.allPlayers = async (req, res) => {
  const currentSeasonOnly = validators.booleanNumeric(req.query.currentSeasonOnly, res, 'currentSeasonOnly', 1)
  const season = validators.season(req.query.season, res)
  const leagueID = validators.leagueID(req.query.leagueID, res)
  return redis.client.get(`allPlayers${JSON.stringify(req.query)}`, async (err, result) => {
    if (err) {
      throw new Error(err)
    }
    if (result) {
      const resultJSON = JSON.parse(result)
      return res.json(resultJSON)
    } else {
      const url = `http://stats.nba.com/stats/commonallplayers?IsOnlyCurrentSeason=${currentSeasonOnly}&Season=${season}&LeagueID=${leagueID}`
      const response = await axios.get(url)
      const data = response.data
      redis.client.setex(`allPlayers${JSON.stringify(req.query)}`, 3600, JSON.stringify({source: 'redis cache', data}))
      return res.json({source: 'nba.stats remote api', data})
    }
  })
}
exports.playerImage = async (req, res) => {
  const playerID = validators.playerID(req.query.playerID, res)
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
  const playerID = validators.playerID(req.query.playerID, res)
  const url = `http://stats.nba.com/stats/commonplayerinfo?PlayerID=${playerID}`
  const response = await axios(url)
  return res.json(response.data)
}
exports.playerCareerInfo = async (req, res) => {
  const playerID = validators.playerID(req.query.playerID, res)
  const perMode = validators.perMode(req.query.perMode, res)
  const url = `http://stats.nba.com/stats/playercareerstats?PlayerID=${playerID}&PerMode=${perMode}`
  const response = await axios.get(url)
  return res.json(response.data)
}
exports.playersLeagueLeaders = async (req, res) => {
  const season = validators.season(req.query.season, res)
  const url = `https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=Totals&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=${season}&SeasonSegment=&SeasonType=Playoffs&ShotClockRange=&StarterBench=&TeamID=0&VsConference=&VsDivision=&Weight=`
  const response = await axios.get(url)
  return res.json(response.data)
}
exports.playerYearOverYear = async (req, res) => {
  const playerID = validators.playerID(req.query.playerID, res)
  const season = validators.season(req.query.season, res)
  const leagueID = validators.leagueID(req.query.leagueID, res)
  const paceAdjust = validators.booleanLiteral(req.query.paceAdjust, res, 'paceAdjust')
  const plusMinus = validators.booleanLiteral(req.query.plusMinus, res, 'plusMinus')
  const rank = validators.booleanLiteral(req.query.rank, res, 'rank')
  const perMode = validators.perMode(req.query.perMode, res)
  const seasonType = validators.seasonType(req.query.seasonType, res)
  const measureType = validators.measureType(req.query.measureType, res)
  const opponentTeamID = validators.opponentTeamID(req.query.opponentTeamID, res, 'opponentTeamID')

  const url = `https://stats.nba.com/stats/playerdashboardbyyearoveryear?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=${leagueID}&Location=&MeasureType=${measureType}&Month=0&OpponentTeamID=${opponentTeamID}&Outcome=&PORound=0&PaceAdjust=${paceAdjust}&PerMode=${perMode}&Period=0&PlayerID=${playerID}&PlusMinus=${plusMinus}&Rank=${rank}&Season=${season}&SeasonSegment=&SeasonType=${seasonType}&ShotClockRange=&Split=yoy&VsConference=&VsDivision=`
  const response = await axios.get(url)
  return res.json(response.data)
}
exports.playerShotChart = async (req, res) => {
  const playerID = validators.playerID(req.query.playerID, res)
  const season = validators.season(req.query.season, res)
  const seasonType = validators.seasonType(req.query.seasonType, res)
  const url = `http://stats.nba.com/stats/shotchartdetail?CFID=33&CFPARAMS=${season}&ContextFilter=&ContextMeasure=FGA&DateFrom=&DateTo=&GameID=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerID=${playerID}&PlusMinus=N&Position=&Rank=N&RookieYear=&Season=${season}&SeasonSegment=&SeasonType=${seasonType}&TeamID=0&VsConference=&VsDivision=&mode=Advanced&showDetails=0&showShots=1&showZones=0&PlayerPosition=`
  const response = await axios.get(url)
  return res.json(response.data)
}
