const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
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
 *       default: "2016-17"
 *       required: false
 *       description: Season asked- format "2017-18"
 *     currentSeasonOnly:
 *       in: query
 *       name: currentSeasonOnly
 *       schema:
 *         type: string
 *       default: "1"
 *       required: false
 *       description: Return players only from current season, 1 for yes 0 for no
 */

router.get('/', verifyToken, authController.homePage)

/**
 * @swagger
 * /stats/players/allplayers/:
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
router.get('/playerImage', catchErrors(playersStatsController.playerImage))
router.get('/playerPersonalInfo', verifyToken, catchErrors(playersStatsController.playerPersonalInfo))
router.get('/playerCareerInfo', catchErrors(playersStatsController.playerCareerInfo))
router.get('/playerLeagueLeaders', verifyToken, catchErrors(playersStatsController.playersLeagueLeaders))
router.get('/playerYearOverYear', catchErrors(playersStatsController.playerYearOverYear))
router.get('/playerShotChart', catchErrors(playersStatsController.playerShotChart))

module.exports = router
