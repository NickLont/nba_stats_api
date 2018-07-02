const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

// user schema to apply limitations to User attributes
const userSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required()
})
exports.homePage = (req, res) => {
  res.send('Home page')
}
exports.signup = async (req, res) => {
  // validate username,password and email against schema and return 401 if error
  Joi.validate(
    {username: req.body.username, password: req.body.password, email: req.body.email},
    userSchema,
    (error) => {
      if (error) {
        res.status(400).json({
          failed: error.details[0].message.replace(/"/g, '')
        })
        throw new Error(error)
      }
    }
  )
  const userName = await User.findOne({username: req.body.username})
  const userEmail = await User.findOne({email: req.body.email})
  if (userName) {
    return res.status(401).json({
      failed: 'Username already exists'
    })
  }
  if (userEmail) {
    return res.status(401).json({
      failed: 'Email already exists'
    })
  }
  bcrypt.hash(req.body.password, 12, async (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      })
    } else {
      const user = new User({
        username: req.body.username,
        password: hash,
        email: req.body.email
      })
      let result = await user.save()
      console.log('user being added is: ', result)
      res.status(200).json({
        success: 'New user succesfully created'
      })
    }
  })
}
exports.signin = async (req, res) => {
  const user = await User.findOne({username: req.body.username}).exec()
  if (user === null) {
    return res.status(401).json({
      failed: 'No such registered username'
    })
  }
  await bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (err) {
      return res.status(401).json({
        failed: 'Unauthorized access'
      })
    }
    if (result) {
      const jwtToken = jwt.sign({
        email: user.email,
        _id: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '2h'
      })
      return res.status(200).json({
        success: 'JWT Authorized',
        token: jwtToken
      })
    }
    return res.status(401).json({
      failed: 'Unauthorized access'
    })
  })
}
