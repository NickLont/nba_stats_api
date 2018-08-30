import test from 'ava'
import request from 'supertest'
import MongodbMemoryServer from 'mongodb-memory-server'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import app from '../app'
import User from '../models/user'

require('dotenv').config()

// In memory mongo server setup
const mongoServer = new MongodbMemoryServer()

let token = ''

test.before(async () => {
  const uri = await mongoServer.getConnectionString()
  await mongoose.connect(uri, { useNewUrlParser: true })
})

// User entry before each test
test.beforeEach(async () => {
  const hashedPassword = bcrypt.hashSync('123456', 12)
  const user = new User({
    username: 'Nick',
    password: hashedPassword,
    email: 'nick@email.com'
  })
  await user.save()
})
// Get and assign token to variable
test.beforeEach(async () => {
  const res = await request(app)
    .post('/user/signin')
    .send({
      'username': 'Nick',
      'password': '123456'
    })
  token = res.body.token
})
// User removal after tests and teardown
test.afterEach.always(() => User.remove())

test.after.always(async () => {
  mongoose.disconnect()
  mongoServer.stop()
})
test('all teams', async t => {
  const res = await request(app)
    .get('/stats/teams/allTeams')
    .set('Authorization', `Bearer ${token}`)
  t.is(res.status, 200)
  t.truthy(res.body)
})
test('team details', async t => {
  const res = await request(app)
    .get('/stats/teams/teamDetails?teamID=1610612764')
    .set('Authorization', `Bearer ${token}`)
  t.is(res.status, 200)
  t.truthy(res.body)
})
test('team roster', async t => {
  const res = await request(app)
    .get('/stats/teams/teamRoster?teamID=1610612764')
    .set('Authorization', `Bearer ${token}`)
  t.is(res.status, 200)
  t.truthy(res.body)
})
test('team all-time leaders', async t => {
  const res = await request(app)
    .get('/stats/teams/teamAllTimeLeaders?teamID=1610612764')
    .set('Authorization', `Bearer ${token}`)
  t.is(res.status, 200)
  t.truthy(res.body)
})
test('team logos', async t => {
  const res = await request(app)
    .get('/stats/teams/teamLogos?teamID=1610612764')
    .set('Authorization', `Bearer ${token}`)
  t.is(res.status, 200)
  t.truthy(res.body)
})
