const express = require('express')
const router = express.Router()
const playersStatsController = require('../controllers/playersStatsController')
const {catchErrors} = require('../handlers/errorHandlers')
const {verifyToken} = require('../helpers/index')

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
