process.env.NODE_ENV = "test";

const expect = require("chai").expect;
const database = require("../../../config/database");


const User = require("../../../components/User/User");


describe("User model test", () => {
  before(() => {
    setTimeout(async (done) => {
      await database.connect();
      User.remove({});
      done();
    }, 5000);
  });

  afterEach(done => {
    User.remove({});
    done();
  });

  after(() => {
    setTimeout(async (done) => {
      await database.delete();
      done();
    }, 5000)
  });

  it("has a module", (done) => {
    expect(User).to.exist;
    done();
  });

  describe("get user", (done) => {

    it("saves a user with given parameters", () => {
      setTimeout(async () => {
        const user = new User({ username: "foo", role: "USER", points: 200 });
        await user.save();
        const findUser = await User.findOne({ username: "foo" });
        expect(findUser.username).to.equal("foo");
        expect(findUser.role).to.equal("USER");
        expect(findUser.points).to.equal(200);
        done();
      }, 5000);
    })

    it("saves a user with default parameters", () => {
      setTimeout(async () => {
        const user = new User({ username: "fooo" });
        await user.save();
        const findUser = await User.findOne({ username: "fooo" })
        expect(findUser.username).to.equal("fooo")
        expect(findUser.role).to.equal("USER");
        expect(findUser.points).to.equal(250);
        done();
      });
    });
  });

  describe("update user", (done) => {

    it("updates a user with given parameters", () => {
      setTimeout(async () => {
        let user = new User({ username: "foo", role: "USER", points: 200 });
        user = await user.save();
        user.name = "foo";
        user.role = "ADMIN";
        await user.save();
        const findUser = await User.findOne({ username: "fooo" });
        expect(findUser.username).to.equal("fooo");
        expect(findUser.role).to.equal("ADMIN");
        expect(findUser.points).to.equal(200);
        done();
      }, 5000);
    });
  });
})