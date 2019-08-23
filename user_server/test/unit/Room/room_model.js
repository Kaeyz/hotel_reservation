process.env.NODE_ENV = "test";

const expect = require("chai").expect;

const database = require("../../../config/database");

const Room = require("../../../components/Rooms/Room");


describe("Room model test", () => {
  before((done) => {
      database.connect();
      Room.deleteMany({});
      done();
  });

  afterEach(done => {
    Room.deleteMany({});
    done();
  });

  after((done) => {
      database.delete();
      done();
  });

  it("has a module", (done) => {
    expect(Room).to.exist;
    done();
  });

  describe("get room", () => {

    it("saves a room with given parameters", async () => {
        const room = new Room({ name: "myRoom", required_points: 200, available_amount: 10 });
        await room.save();
        const findRoom = await Room.findOne({ name: "myRoom" });
        expect(findRoom.name).to.equal("myRoom");
        expect(findRoom.available_amount).to.equal(10);
        expect(findRoom.required_points).to.equal(200);
    })

    it("saves a room with default parameters", async () => {
        const room = new Room({ name: "room" });
        await room.save();
        const findRoom = await Room.findOne({ name: "room" })
        expect(findRoom.name).to.equal("room")
        expect(findRoom.available_amount).to.equal(1);
        expect(findRoom.required_points).to.equal(250);
    });
  });

  describe("update room", () => {

    it("updates a room with given parameters", async () => {
        let room = new Room({ name: "foo" });
        room = await room.save();
        room.available_amount = 6;
        room.required_points = 300;
        await room.save();
        const findRoom = await Room.findOne({ name: "foo" });
        expect(findRoom.name).to.equal("foo");
        expect(findRoom.available_amount).to.equal(6);
        expect(findRoom.required_points).to.equal(300);
    });
  });
})