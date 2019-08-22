const expect = require("chai").expect;
const database = require("../../../config/database");


const User = require("../../../components/User/User");


describe("User model connected sending and receiving data from the database", () => {
  before((done) => {
    database.connect();
    done();
  });



  after((done) => {
    database.disconnect();
    done();
  });
})