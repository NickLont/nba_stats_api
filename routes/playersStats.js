const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const playersStatsController = require('../controllers/playersStatsController')
const {catchErrors} = require('../handlers/errorHandlers')
const {verifyToken} = require('../helpers/index')

router.get('/', verifyToken, authController.homePage)
router.get('/allplayers', catchErrors(playersStatsController.allPlayers))
router.get('/playerImage', catchErrors(playersStatsController.playerImage))
router.get('/playerPersonalInfo', verifyToken, catchErrors(playersStatsController.playerPersonalInfo))
router.get('/playerCareerInfo', catchErrors(playersStatsController.playerCareerInfo))
router.get('/playerLeagueLeaders', verifyToken, catchErrors(playersStatsController.playersLeagueLeaders))
router.get('/playerYearOverYear', catchErrors(playersStatsController.playerYearOverYear))
router.get('/playerShotChart', catchErrors(playersStatsController.playerShotChart))

module.exports = router
