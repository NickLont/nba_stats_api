import test from 'ava'
import request from 'supertest'
import MongodbMemoryServer from 'mongodb-memory-server'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import app from '../app'
import User from '../models/user'

require('dotenv').config()

const mongoServer = new MongodbMemoryServer()

test.before(async () => {
  const uri = await mongoServer.getConnectionString()
  await mongoose.connect(uri, { useNewUrlParser: true })
})

test.beforeEach(async () => {
  const hashedPassword = bcrypt.hashSync('123456', 12)
  const user = new User({
    username: 'Nick',
    password: hashedPassword,
    email: 'nick@touchtribe.nl'
  })
  await user.save()
})

test.afterEach.always(() => User.remove())
test.after.always(async () => {
  mongoose.disconnect()
  mongoServer.stop()
})

test('sign in user', async t => {
  const res = await request(app)
    .post('/user/signup')
    .send({
      'username': 'Nick2',
      'password': '123456',
      'email': 'nick2@touchtribe.nl'
    })
  t.is(res.status, 200)
  t.is(res.body.success, 'New user succesfully created')
})
test('log in user', async t => {
  const res = await request(app)
    .post('/user/signin')
    .send({
      'username': 'Nick',
      'password': '123456'
    })
  t.is(res.status, 200)
  t.is(res.body.success, 'JWT Authorized')
  t.truthy(res.body.token)
})

// test('foo', t => {
//   t.pass()
// })
//
// test('bar', async t => {
//   const bar = Promise.resolve('bar')
//
//   t.is(await bar, 'bar')
// })
