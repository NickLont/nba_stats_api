## **NBA Stats Api**
> An API with statistics about current and retired NBA players and teamsr

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://GitHub.com/NickLont/)
[![GitHub stars](https://img.shields.io/github/stars/NickLont/nba_stats_api.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/NickLont/nba_stats_api/stargazers/)


### Introduction

This API serves as an abstraction on top of the Official NBA Statistics API ([http://stats.nba.com/stats/](http://stats.nba.com/stats/)), which is still undocumented.

### Setup instructions
If you have Docker Engine installed locally, you can run the following composer command in your shell regardless of which operating system you are using.
```
git clone https://github.com/NickLont/nba_stats_api.git
cd nba_stats_api
docker-compose build
docker-compose up
```

If not install from: [https://docs.docker.com/install/](https://docs.docker.com/install/)

`.env.sample` file needs to be renamed to `.env` and be given valid values

Run tests using
`yarn test`
or
`npm run test`

Run test coverage using `yarn cover` or `npm run cover`

### Usage

Opening the browser to `localhost:3011/swagger/` will give access
to the swagger interface.
The endpoints are separated in three categories: `Users`, `Players` and `Teams`.
Every endpoint has an example that can be run by pressing the `Try it out` button and then the `Execute` button.
The result will appear right below, with details about the call.<br />
Here, the user can also see the expected response codes and messages of each endpoint and also change/set the query parameters.<br />
The API uses JWT authentication, so only valid logged in users can access the `Players` and `Teams` endpoint groups.
This is visible from the lock icon on the right side of these endpoints and if the user tries to execute the call a `403: "failed": "No token provided"` answer will be returned.

To authenticate, a user must use the `/user/signin` end point with the example or another valid User. This will return an answer in the form of:
```
{
  "success": "JWT Authorized",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY2tAdG91Y2h0cmliZS5ubCIsIl9pZCI6IjViMzI1ODZkY2Y1MjNiZmI5NzZkNjk4NiIsImlhdCI6MTUzNTYyNjYxMiwiZXhwIjoxNTM1NjMzODEyfQ.gBZGkzJq_upJK06oN5ZsztQwQd9nrR5atwXbCVZqajQ"
}
```
Then, copy the `token` value, press the green `Authorize` button at the top right corner, paste it at the Value input field, press Authorize and finally Close.<br />
The lock icon should now appear locked and the user should have access to all of the protected endpoints.
<br />
<br />
 ![Example](http://recordit.co/2nqMzIUitH.gif)
<br />
<br />
To use the endpoints programmatically, the token returned from the `/user/signin` endpoint should be placed the Authorization header, with a value of either Bearer + Token (`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY2tAdG91Y2h0cmliZS5ubCIsIl9pZCI6IjViMzI1ODZkY2Y1MjNiZmI5NzZkNjk4NiIsImlhdCI6MTUzNTYyOTcxNywiZXhwIjoxNTM1NjM2OTE3fQ.anuW3jv8i84SuHVm-2T5ITgini_e_LntAWF9Bp5zU2s`)
 OR just the token (`Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY2tAdG91Y2h0cmliZS5ubCIsIl9pZCI6IjViMzI1ODZkY2Y1MjNiZmI5NzZkNjk4NiIsImlhdCI6MTUzNTYyOTcxNywiZXhwIjoxNTM1NjM2OTE3fQ.anuW3jv8i84SuHVm-2T5ITgini_e_LntAWF9Bp5zU2s`)

### Technologies used / features

[Node v10.8.0](https://github.com/nodejs/node) with [express](https://github.com/expressjs/express) and [npm 6.4.0](https://www.npmjs.com/) / [yarn 1.9.4](https://github.com/yarnpkg/yarn ) for development <br />
MongoDB database hosted in [https://mlab.com/](https://mlab.com/) with [mongoose](https://github.com/Automattic/mongoose) for ORM<br/>
[axios](https://github.com/axios/axios) as HTTP client <br />
[bcrypt](https://github.com/kelektiv/node.bcrypt.js/) for password hashing <br />
[joi](https://github.com/hapijs/joi) for schema validations <br/>
[swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) for swagger interface <br/>
[ava](https://github.com/avajs/ava) as async, concurrent test runner <br/>
[supertest](https://github.com/visionmedia/supertest) for integration testing / assertions <br/>
[nyc](https://github.com/istanbuljs/nyc) for coverage reports <br/>
[redis 4.0.11](https://redis.io/) for in-memory data caching <br/>
[nginx 1.15.2](https://www.nginx.com/) as a reverse-proxy <br/>
[Docker 18.06.0](https://www.docker.com/) to isolate the different parts of the application to containers and Compose to run them

### Licence
This project is licensed under the MIT License

### Contributing

1. Fork it (<https://github.com/NickLont/nba_stats_api/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
