const axios = require('axios')

exports.allplayers = async (req, res) => {
  const currentSeasonOnly = req.query.currentSeasonOnly ? req.query.currentSeasonOnly : '1'
  const season = req.query.season ? req.query.season : ''
  const leagueID = req.query.leagueID ? req.query.leagueID : '00'
  const url = `http://stats.nba.com/stats/commonallplayers?IsOnlyCurrentSeason=${currentSeasonOnly}&Season=${season}&LeagueID=${leagueID}`
  const response = await axios.get(url)

  res.json(response.data.resultSets[0].rowSet.length)
}
