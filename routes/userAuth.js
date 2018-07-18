const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const {catchErrors} = require('../handlers/errorHandlers')

/**
 * @swagger
 * definitions:
 *   NewUser:
 *     type: object
 *     required:
 *       - username
 *       - password
 *       - email
 *     properties:
 *       username:
 *         type: string
 *         example: Nick
 *       password:
 *         type: string
 *         format: password
 *         example: 1234
 *       email:
 *         type: string
 *         format: email
 *         example: nick@touchtribe.nl
 *   User:
 *     type: object
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *         example: Nick
 *       password:
 *         type: string
 *         format: password
 *         example: "1234"
 *   Token:
 *     type: object
 *     properties:
 *       success:
 *         type: string
 *         example: JWT Authorized
 *       token:
 *         type: string
 *         example: Token
 */

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
 *           $ref: '#/definitions/NewUser'
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
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: JWT Authorized
 *         schema:
 *           $ref: '#/definitions/Token'
 *       400:
 *         description: Unauthorized access
 *       401:
 *         description: User not found
 */
router.post('/signin', catchErrors(authController.signin))

module.exports = router
