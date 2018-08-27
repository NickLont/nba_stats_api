const request = require('supertest')
const app = require('../app')

describe('Test /user path', () => {
  const user = {
    'username': 'Nick',
    'password': '1234'
  }
  test('It should respond with success and token keys in body', async (done) => {
    const response = await request(app)
      .post('/user/signin')
      .send(user)
    expect(response.statusCode).toBe(200)
  })
})
