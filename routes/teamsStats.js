const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const teamsStatsController = require('../controllers/teamsStatsController')
const {catchErrors} = require('../handlers/errorHandlers')
const verifyToken = require('../helpers/index')

router.get('/',  authController.homePage)
router.get('/allplayers', verifyToken, catchErrors(teamsStatsController))

module.exports = router
