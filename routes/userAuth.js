const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const {catchErrors} = require('../handlers/errorHandlers')

/**
 * @swagger
 * /user/signup:
 *   post:
 *     tags:
 *       - Users
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/parameters/NewUser'
 *     responses:
 *       200:
 *         description: New user succesfully created
 *       400:
 *         description: Incorrect Username or email
 *       401:
 *         description: Username already exists || Email already exists
 */
router.post('/signup', catchErrors(authController.signup))

/**
 * @swagger
 * /user/signin:
 *   post:
 *     tags:
 *       - Users
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/parameters/User'
 *     responses:
 *       200:
 *         description: JWT Authorized
 *         schema:
 *           $ref: '#/definitions/parameters/Token'
 *       400:
 *         description: Server unable to process request
 *       401:
 *         description: No such registered username || Wrong password || Unauthorized access
 */
router.post('/signin', catchErrors(authController.signin))

module.exports = router
