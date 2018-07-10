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
 *       password:
 *         type: string
 *         format: password
 *       email:
 *         type: string
 *         format: email
 *   User:
 *     type: object
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     tags:
 *       - users
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
 *       - users
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
 *         description: JWT Authorized
 *       400:
 *         description: Unauthorized access
 */
router.post('/signin', catchErrors(authController.signin))

module.exports = router
