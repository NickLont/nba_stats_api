const express = require('express')
const router = express.Router()
const teamsStatsController = require('../controllers/teamsStatsController')
const {catchErrors} = require('../handlers/errorHandlers')
// const verifyToken = require('../helpers/index')

/**
 * @swagger
 * /stats/teams/allteams:
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
router.get('/allteams', catchErrors(teamsStatsController.allTeams))

/**
 * @swagger
 * /stats/teams/teamdetails:
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
router.get('/teamdetails', catchErrors(teamsStatsController.teamDetails))

/**
 * @swagger
 * /stats/teams/teamroster:
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
router.get('/teamroster', catchErrors(teamsStatsController.teamRoster))

/**
 * @swagger
 * /stats/teams/teamalltimeleaders:
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
router.get('/teamalltimeleaders', catchErrors(teamsStatsController.teamAllTimeLeaders))

/**
 * @swagger
 * /stats/teams/teamlogos:
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
router.get('/teamlogos', catchErrors(teamsStatsController.teamLogos))

module.exports = router
