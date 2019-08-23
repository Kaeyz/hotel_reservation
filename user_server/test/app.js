process.env.NODE_ENV = "test";

const expect = require("chai").expect;
const request = require('supertest');

const app = require("../server");
const database = require("../config/database");

(async function () {
  await database.connect();
}())

describe("App is starting up properly", async () => {
  after(() => {
    setTimeout(async (done) => {
      await database.delete();
      done();
    }, 5000);
  });

  it("has a module", (done) => {
    expect(app).to.exist;
    done();
  });

  it("app is listening for request", (done) => {
    request(app).get("/").then(res => {
      expect(res.text).equal("Welcome to room reservation backend")
      expect(res.statusCode).equal(200);
      expect(res.status).equal(200);
      expect(res.error).equal(false);
      done();
    }).catch(err => done(err));
  })

  it("must return an admin", (done) => {
      request(app).get("/user/return-admin")
        .then(res => {
          const { body, statusCode } = res;
          expect(body.username).equal("admin")
          expect(body.role).equal("ADMIN")
          expect(statusCode).equal(200)
          done();
        }).catch(err => done(err));
  }).timeout(8000);
});