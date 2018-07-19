
/**
 * @swagger
 * definitions:
 *   defaultResponses:
 *     200:
 *       description: Request Successful
 *     400:
 *       description: Bad Request
 *     401:
 *       description: Failed to authenticate token
 *     403:
 *       description: No token provided
 *   parameters:
 *     NewUser:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - email
 *       properties:
 *         username:
 *           type: string
 *           example: Nick
 *         password:
 *           type: string
 *           format: password
 *           example: 1234
 *         email:
 *           type: string
 *           format: email
 *           example: nick@touchtribe.nl
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           example: Nick
 *         password:
 *           type: string
 *           format: password
 *           example: "1234"
 *     Token:
 *       type: object
 *       properties:
 *         success:
 *           type: string
 *           example: JWT Authorized
 *         token:
 *           type: string
 *           example: Token
 *     leagueID:
 *       in: query
 *       name: leagueID
 *       schema:
 *         type: string
 *       default: "00"
 *       required: false
 *       description: 00 for NBA 01 for ABA
 *     season:
 *       in: query
 *       name: season
 *       schema:
 *         type: string
 *       default: "2017-18"
 *       required: false
 *       description: Season required, format "2017-18"
 *     teamID:
 *       in: query
 *       name: teamID
 *       schema:
 *         type: string
 *       default: "1610612764"
 *       required: true
 *       description: ID of the NBA team
 *     season-required:
 *       in: query
 *       name: season
 *       schema:
 *         type: string
 *       default: "2017-18"
 *       required: true
 *       description: Season required, format "2017-18"
 *     currentSeasonOnly:
 *       in: query
 *       name: currentSeasonOnly
 *       schema:
 *         type: string
 *       default: "1"
 *       required: false
 *       description: Return players only from current season, 1 for yes 0 for no
 *     playerID:
 *       in: query
 *       name: playerID
 *       schema:
 *         type: string
 *       default: "101187"
 *       required: false
 *       description: The id of the player
 *     playerID-required:
 *       in: query
 *       name: playerID
 *       schema:
 *         type: string
 *       default: "101187"
 *       required: true
 *       description: The id of the player
 *     perMode:
 *       in: query
 *       name: perMode
 *       schema:
 *         type: string
 *       default: "PerGame"
 *       description: One of [Totals, PerGame, MinutesPer, Per48, Per40, Per36, PerMinute, PerPossession, PerPlay, Per100Possessions, Per100Plays]
 *     paceAdjust:
 *       in: query
 *       name: paceAdjust
 *       schema:
 *         type: string
 *       required: false
 *       default: "N"
 *       description: One of [Y, N]
 *     rank:
 *       in: query
 *       name: rank
 *       schema:
 *         type: string
 *         required: false
 *       default: "N"
 *       description: One of [Y, N]
 *     seasonType:
 *       in: query
 *       name: seasonType
 *       schema:
 *         type: string
 *       default: "Regular Season"
 *       description: One of [Regular Season, Pre Season, Playoffs]
 *     period:
 *       in: query
 *       name: period
 *       schema:
 *         type: string
 *       default: "0"
 *       description: Specify period of game
 *     measureType:
 *       in: query
 *       name: measureType
 *       schema:
 *         type: string
 *       default: "Base"
 *       description: One of [Base, Advanced, Misc, Four Factors, Scoring, Opponent, Usage, Defense]
 *     opponentTeamID:
 *       in: query
 *       name: opponentTeamID
 *       schema:
 *         type: string
 *       description: TeamID of opposing team
 */
