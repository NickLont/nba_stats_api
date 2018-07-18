const express = require('express')
const router = express.Router()
const teamsStatsController = require('../controllers/teamsStatsController')
const {catchErrors} = require('../handlers/errorHandlers')
const {verifyToken} = require('../helpers/index')

/**
 * @swagger
 * /stats/teams/allTeams:
 *   get:
 *     tags:
 *       - Teams
 *     security:
 *       - JWT: []
 *     description: All teams with their ID and abbreviation
 *     produces:
 *       - application/json
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
router.get('/allTeams', verifyToken, teamsStatsController.allTeams)

/**
 * @swagger
 * /stats/teams/teamDetails:
 *   get:
 *     tags:
 *       - Teams
 *     security:
 *       - JWT: []
 *     description: Detailed info of TeamID
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/definitions/parameters/teamID'
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
router.get('/teamDetails', verifyToken, catchErrors(teamsStatsController.teamDetails))

/**
 * @swagger
 * /stats/teams/teamRoster:
 *   get:
 *     tags:
 *       - Teams
 *     security:
 *       - JWT: []
 *     description: Roster of TeamID in season selected
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/definitions/parameters/teamID'
 *       - $ref: '#/definitions/parameters/season'
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
router.get('/teamRoster', verifyToken, catchErrors(teamsStatsController.teamRoster))

/**
 * @swagger
 * /stats/teams/teamAllTimeLeaders:
 *   get:
 *     tags:
 *       - Teams
 *     security:
 *       - JWT: []
 *     description: TeamID all time leaders
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/definitions/parameters/teamID'
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
router.get('/teamAllTimeLeaders', verifyToken, catchErrors(teamsStatsController.teamAllTimeLeaders))

/**
 * @swagger
 * /stats/teams/teamLogos:
 *   get:
 *     tags:
 *       - Teams
 *     security:
 *       - JWT: []
 *     description: TeamID all time leaders
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/definitions/parameters/teamID'
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
router.get('/teamLogos', verifyToken, catchErrors(teamsStatsController.teamLogos))

module.exports = router
