const express = require('express')
const router = express.Router()
const teamsStatsController = require('../controllers/teamsStatsController')
const {catchErrors} = require('../handlers/errorHandlers')
// const verifyToken = require('../helpers/index')

/**
 * @swagger
 * teams:
 *   definitions:
 *     responses:
 *       200:
 *         description: Request Successful
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Failed to authenticate token
 *       403:
 *         description: No token provided
 *     parameters:
 *       teamID:
 *         in: query
 *         name: teamID
 *         schema:
 *           type: string
 *         default: "1610612764"
 *         required: true
 *         description: ID of all NBA teams
 */

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
 *         $ref: '#/teams/definitions/responses/200'
 *       400:
 *         $ref: '#/teams/definitions/responses/400'
 *       401:
 *         $ref: '#/teams/definitions/responses/401'
 *       403:
 *         $ref: '#/teams/definitions/responses/403'
 */
router.get('/allteams', catchErrors(teamsStatsController.allTeams))
router.get('/teamdetails', catchErrors(teamsStatsController.teamDetails))
router.get('/teamroster', catchErrors(teamsStatsController.teamRoster))
router.get('/teamalltimeleaders', catchErrors(teamsStatsController.teamAllTimeLeaders))
router.get('/teamlogos', catchErrors(teamsStatsController.teamLogos))

module.exports = router
