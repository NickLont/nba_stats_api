const express = require('express')
const router = express.Router()
const playersStatsController = require('../controllers/playersStatsController')
const {catchErrors} = require('../handlers/errorHandlers')
const {verifyToken} = require('../helpers/index')

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

/**
 * @swagger
 * /stats/players/allplayers:
 *   get:
 *     tags:
 *       - Players
 *     security:
 *       - JWT: []
 *     description: Returns all players from the selected season and league
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/definitions/parameters/leagueID'
 *       - $ref: '#/definitions/parameters/season'
 *       - $ref: '#/definitions/parameters/currentSeasonOnly'
 *     responses:
 *       200:
 *         $ref: '#/definitions/defaultResponses/200'
 *       400:
 *         $ref: '#/definitions/defaultResponses/400'
 *       401:
 *         $ref: '#/definitions/defaultResponses/401'
 *       403:
 *         $ref: '#/definitions/defaultResponses/403'
 */
router.get('/allplayers', verifyToken, catchErrors(playersStatsController.allPlayers))

/**
 * @swagger
 * /stats/players/playerImage:
 *   get:
 *     tags:
 *       - Players
 *     security:
 *       - JWT: []
 *     description: Returns a players picture
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/definitions/parameters/playerID-required'
 *     responses:
 *       200:
 *         $ref: '#/definitions/defaultResponses/200'
 *       400:
 *         $ref: '#/definitions/defaultResponses/400'
 *       401:
 *         $ref: '#/definitions/defaultResponses/401'
 *       403:
 *         $ref: '#/definitions/defaultResponses/403'
 */
router.get('/playerImage', verifyToken, catchErrors(playersStatsController.playerImage))

/**
 * @swagger
 * /stats/players/playerPersonalInfo:
 *   get:
 *     tags:
 *       - Players
 *     security:
 *       - JWT: []
 *     description: Common player personal information
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/definitions/parameters/playerID-required'
 *     responses:
 *       200:
 *         $ref: '#/definitions/defaultResponses/200'
 *       400:
 *         $ref: '#/definitions/defaultResponses/400'
 *       401:
 *         $ref: '#/definitions/defaultResponses/401'
 *       403:
 *         $ref: '#/definitions/defaultResponses/403'
 */
router.get('/playerPersonalInfo', verifyToken, catchErrors(playersStatsController.playerPersonalInfo))

/**
 * @swagger
 * /stats/players/playerCareerInfo:
 *   get:
 *     tags:
 *       - Players
 *     security:
 *       - JWT: []
 *     description: Player career statistics
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/definitions/parameters/playerID-required'
 *       - $ref: '#/definitions/parameters/perMode'
 *     responses:
 *       200:
 *         $ref: '#/definitions/defaultResponses/200'
 *       400:
 *         $ref: '#/definitions/defaultResponses/400'
 *       401:
 *         $ref: '#/definitions/defaultResponses/401'
 *       403:
 *         $ref: '#/definitions/defaultResponses/403'
 */
router.get('/playerCareerInfo', verifyToken, catchErrors(playersStatsController.playerCareerInfo))

/**
 * @swagger
 * /stats/players/playerLeagueLeaders:
 *   get:
 *     tags:
 *       - Players
 *     security:
 *       - JWT: []
 *     description: League leaders of specified season
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/definitions/parameters/season-required'
 *     responses:
 *       200:
 *         $ref: '#/definitions/defaultResponses/200'
 *       400:
 *         $ref: '#/definitions/defaultResponses/400'
 *       401:
 *         $ref: '#/definitions/defaultResponses/401'
 *       403:
 *         $ref: '#/definitions/defaultResponses/403'
 */
router.get('/playerLeagueLeaders', verifyToken, catchErrors(playersStatsController.playersLeagueLeaders))

/**
 * @swagger
 * /stats/players/playerYearOverYear:
 *   get:
 *     tags:
 *       - Players
 *     security:
 *       - JWT: []
 *     description: Player stats year-over-year
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/definitions/parameters/playerID-required'
 *       - $ref: '#/definitions/parameters/perMode'
 *       - $ref: '#/definitions/parameters/paceAdjust'
 *       - $ref: '#/definitions/parameters/rank'
 *       - $ref: '#/definitions/parameters/period'
 *       - $ref: '#/definitions/parameters/seasonType'
 *       - $ref: '#/definitions/parameters/measureType'
 *       - $ref: '#/definitions/parameters/opponentTeamID'
 *     responses:
 *       200:
 *         $ref: '#/definitions/defaultResponses/200'
 *       400:
 *         $ref: '#/definitions/defaultResponses/400'
 *       401:
 *         $ref: '#/definitions/defaultResponses/401'
 *       403:
 *         $ref: '#/definitions/defaultResponses/403'
 */
router.get('/playerYearOverYear', verifyToken, catchErrors(playersStatsController.playerYearOverYear))

/**
 * @swagger
 * /stats/players/playerShotChart:
 *   get:
 *     tags:
 *       - Players
 *     security:
 *       - JWT: []
 *     description: Player shot chart on the field
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/definitions/parameters/playerID-required'
 *       - $ref: '#/definitions/parameters/season-required'
 *       - $ref: '#/definitions/parameters/seasonType'
 *     responses:
 *       200:
 *         $ref: '#/definitions/defaultResponses/200'
 *       400:
 *         $ref: '#/definitions/defaultResponses/400'
 *       401:
 *         $ref: '#/definitions/defaultResponses/401'
 *       403:
 *         $ref: '#/definitions/defaultResponses/403'
 */
router.get('/playerShotChart', verifyToken, catchErrors(playersStatsController.playerShotChart))

module.exports = router
