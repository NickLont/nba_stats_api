const axios = require('axios')

exports.allplayers = async (req, res) => {
  const currentSeasonOnly = req.query.currentSeasonOnly ? req.query.currentSeasonOnly : '1'
  const season = req.query.season ? req.query.season : ''
  const leagueID = req.query.leagueID ? req.query.leagueID : '00'
  const url = `http://stats.nba.com/stats/commonallplayers?IsOnlyCurrentSeason=${currentSeasonOnly}&Season=${season}&LeagueID=${leagueID}`
  const response = await axios.get(url)

  res.json(response.data.resultSets[0].rowSet.length)
}
exports.playerImage = async (req, res) => {
  const playedID = req.query.playerID ? req.query.playerID : ''
  const url = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playedID}.png`
  const response = await axios({
    method: 'GET',
    url,
    responseType: 'arraybuffer'
  })

  res.set('Content-Type', 'image/png')
  res.send(response.data)
}
exports.playerPersonalInfo = async (req, res) => {
  console.log('queries are: ', req.query)
  const playedID = req.query.playerID ? req.query.playerID : ''
  const url = `http://stats.nba.com/stats/commonplayerinfo?PlayerID=${playedID}`
  const response = await axios(url)
  res.json(response.data)
}
exports.playerCareerInfo = async (req, res) => {
  const playedID = req.query.playerID ? req.query.playerID : ''
  const perMode = req.query.perMode ? req.query.perMode : 'Totals'
  const url = `http://stats.nba.com/stats/playercareerstats?PlayerID=${playedID}&PerMode=${perMode}`
  const response = await axios.get(url)
  res.json(response.data)
}
exports.playersLeagueLeaders = async (req, res) => {
  const season = req.query.season ? req.query.season : '2017-18'
  const url = `https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=Totals&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=${season}&SeasonSegment=&SeasonType=Playoffs&ShotClockRange=&StarterBench=&TeamID=0&VsConference=&VsDivision=&Weight=`
  const response = await axios.get(url)
  res.json(response.data)
}
