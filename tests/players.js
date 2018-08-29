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
    email: 'nick@touchtribe.nl'
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
test('all players', async t => {
  const res = await request(app)
    .get('/stats/players/allplayers')
    .set('Authorization', `Bearer ${token}`)
  t.is(res.status, 200)
  t.truthy(res.body)
})
test('player images', async t => {
  const res = await request(app)
    .get('/stats/players/playerImage?playerID=101187')
    .set('Authorization', `Bearer ${token}`)
  t.is(res.status, 200)
  t.truthy(res.body)
})
test('player personal info', async t => {
  const res = await request(app)
    .get('/stats/players/playerPersonalInfo?playerID=101187')
    .set('Authorization', `Bearer ${token}`)
  t.is(res.status, 200)
  t.truthy(res.body)
})
test('player career info', async t => {
  const res = await request(app)
    .get('/stats/players/playerCareerInfo?playerID=101187')
    .set('Authorization', `Bearer ${token}`)
  t.is(res.status, 200)
  t.truthy(res.body)
})
test('player league leaders', async t => {
  const res = await request(app)
    .get('/stats/players/playerLeagueLeaders?season=2017-18')
    .set('Authorization', `Bearer ${token}`)
  t.is(res.status, 200)
  t.truthy(res.body)
})
test('player year over year', async t => {
  const res = await request(app)
    .get('/stats/players/playerYearOverYear?playerID=101187')
    .set('Authorization', `Bearer ${token}`)
  t.is(res.status, 200)
  t.truthy(res.body)
})
test('player year shot chart', async t => {
  const res = await request(app)
    .get('/stats/players/playerShotChart?playerID=101187&season=2017-18')
    .set('Authorization', `Bearer ${token}`)
  t.is(res.status, 200)
  t.truthy(res.body)
})
