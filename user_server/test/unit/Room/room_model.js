process.env.NODE_ENV = "test";

const expect = require("chai").expect;

const database = require("../../../config/database");

const Room = require("../../../components/Rooms/Room");


describe("Room model test", () => {
  before(() => {
    setTimeout(async (done) => {
      await database.connect();
      Room.remove({});
      done();
    }, 5000);
  });

  afterEach(done => {
    Room.remove({});
    done();
  });

  after(() => {
    setTimeout(async (done) =>  {
      await database.delete();
      done();
    }, 7000);
  });

  it("has a module", (done) => {
    expect(Room).to.exist;
    done();
  });

  describe("get room", (done) => {

    it("saves a room with given parameters", () => {
      setTimeout(async () => {
        const room = new Room({ name: "myRoom", required_points: 200, available_amount: 10 });
        await room.save();
        const findRoom = await Room.findOne({ name: "myRoom" });
        expect(findRoom.name).to.equal("myRoom");
        expect(findRoom.available_amount).to.equal(10);
        expect(findRoom.required_points).to.equal(200);
        done();
      }, 5000);
    })

    it("saves a room with default parameters", () => {
      setTimeout(async () => {
        const room = new Room({ name: "room" });
        await room.save();
        const findRoom = await Room.findOne({ name: "room" })
        expect(findRoom.name).to.equal("room")
        expect(findRoom.available_amount).to.equal(1);
        expect(findRoom.required_points).to.equal(250);
        done();
      });
    });
  });

  describe("update room", (done) => {

    it("updates a room with given parameters", () => {
      setTimeout(async () => {
        let room = new Room({ name: "foo" });
        room = await room.save();
        room.available_amount = 6;
        room.required_points = 300;
        await room.save();
        const findRoom = await Room.findOne({ name: "foo" });
        expect(findRoom.name).to.equal("foo");
        expect(findRoom.available_amount).to.equal(6);
        expect(findRoom.required_points).to.equal(300);
        done();
      }, 5000);
    });
  });
})