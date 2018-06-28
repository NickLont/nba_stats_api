const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const playersStatsController = require('../controllers/playersStatsController')
const {catchErrors} = require('../handlers/errorHandlers')
const verifyToken = require('../helpers/index')

router.get('/', verifyToken, authController.homePage)
router.get('/allplayers', verifyToken, catchErrors(playersStatsController.allplayers))
router.get('/playerImage', verifyToken, catchErrors(playersStatsController.playerImage))
router.get('/playerPersonalInfo', verifyToken, catchErrors(playersStatsController.playerPersonalInfo))
router.get('/playerCareerInfo', verifyToken, catchErrors(playersStatsController.playerCareerInfo))
router.get('/playerLeagueLeaders', verifyToken, catchErrors(playersStatsController.playersLeagueLeaders))

module.exports = router
