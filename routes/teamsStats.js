const express = require('express')
const router = express.Router()
const teamsStatsController = require('../controllers/teamsStatsController')
const {catchErrors} = require('../handlers/errorHandlers')
// const verifyToken = require('../helpers/index')

router.get('/allteams', catchErrors(teamsStatsController.allTeams))
router.get('/teamdetails', catchErrors(teamsStatsController.teamDetails))
router.get('/teamroster', catchErrors(teamsStatsController.teamRoster))
router.get('/teamalltimeleaders', catchErrors(teamsStatsController.teamAllTimeLeaders))
router.get('/teamlogos', catchErrors(teamsStatsController.teamLogos))

module.exports = router
