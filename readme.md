This a project is my solution to trivago code test for Nodejs backend developer.

Language: JavaScript
Stack : NODEJS, Express, Mongodb, Docker.
Test: Mocha, supertest, Chai.

Features added

As a Guest User
1. Register an account.
2. Login to account

As a Logged In User
1. Reserve a room with points

As an admin
1. Increase or decrease user points.
3. Add new rooms.

To start up application with docker:
from root directory run 'docker-compose up'

To start up application in development
run the following commands:
  'npm install'
 'cd user_server'
  'npm run dev'

To start up application in production
run the following commands:
 'cd user_server'
  'npm install'
  'npm run start'

To run test:
  'cd user_server'
  'npm install'
  'npm run test'
