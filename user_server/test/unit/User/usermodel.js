process.env.NODE_ENV = "test";

const expect = require("chai").expect;
const database = require("../../../config/database");


const User = require("../../../components/User/User");


describe("User model test", () => {
  before((done) => {
      database.connect();
      User.deleteMany({});
      done();
  });

  afterEach(done => {
    User.deleteMany({});
    done();
  });

  after((done) => {
      database.delete();
      done();
  });

  it("has a module", (done) => {
    expect(User).to.exist;
    done();
  });

  describe("get user", () => {

    it("saves a user with given parameters", async () => {
        const user = new User({ username: "foo", role: "USER", points: 200 });
        await user.save();
        const findUser = await User.findOne({ username: "foo" });
        expect(findUser.username).to.equal("foo");
        expect(findUser.role).to.equal("USER");
        expect(findUser.points).to.equal(200);
    })

    it("saves a user with default parameters", async () => {
        const user = new User({ username: "fooo" });
        await user.save();
        const findUser = await User.findOne({ username: "fooo" })
        expect(findUser.username).to.equal("fooo")
        expect(findUser.role).to.equal("USER");
        expect(findUser.points).to.equal(250);
      });
    });
  });

  describe("update user", () => {

    it("updates a user with given parameters", async () => {
        let user = new User({ username: "foo", role: "USER", points: 200 });
        user = await user.save();
        user.username = "fooo";
        user.role = "ADMIN";
        await user.save();
        const findUser = await User.findOne({ username: "fooo" });
        expect(findUser.username).to.equal("fooo");
        expect(findUser.role).to.equal("ADMIN");
        expect(findUser.points).to.equal(200);
  });
})