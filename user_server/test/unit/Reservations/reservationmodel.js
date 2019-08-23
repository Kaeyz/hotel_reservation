process.env.NODE_ENV = "test";

const expect = require("chai").expect;

const database = require("../../../config/database");

const Reservation = require("../../../components/Reservations/Reservation");
const User = require("../../../components/User/User");
const Room = require("../../../components/Rooms/Room");


describe("Reservation model test", () => {
  before(async () => {
    await database.connect();
    await Reservation.deleteMany({});
    await Room.deleteMany({});
    await User.deleteMany({});
  });

  afterEach(async () => {
    await Reservation.deleteMany({});
    await Room.deleteMany({});
    await User.deleteMany({});
  });

  after((done) => {
      database.delete();
      done();
  });

  it("has a module", (done) => {
    expect(Reservation).to.exist;
    expect(Room).to.exist;
    expect(User).to.exist;
    done();
  });

  describe("get reservation", () => {

    it("saves a reservation with given parameters", async () => {
      const user = new User({ username: "foo" });
      await user.save();
      const room = new Room({ name: "new_room" });
      room.save();
      const reservation = new Reservation({ user: user.id, room: room.id, status: "RESERVED" });
      await reservation.save();
      const foundUser = await User.find({ username: "foo" });
      const foundRoom = await Room.find({ name: "new_room" });
      const foundReservation = await Reservation.find({ user: user.id });
      expect(foundReservation.user).to.equal(foundUser.id);
      expect(foundReservation.room).to.equal(foundRoom.id);
      expect(foundReservation[0].status).to.equal("RESERVED");
      expect(foundReservation[0].createdAt).to.exist;
    });

    it("saves a reservation with default parameters", async () => {
      const user = new User({ username: "foo" });
      await user.save();
      const room = new Room({ name: "new_room" });
      room.save();
      const reservation = new Reservation({ user: user.id, room: room.id});
      await reservation.save();
      const foundUser = await User.find({ username: "foo" });
      const foundRoom = await Room.find({ name: "new_room" });
      const foundReservation = await Reservation.find({ user: user.id });
      expect(foundReservation.user).to.equal(foundUser.id);
      expect(foundReservation.room).to.equal(foundRoom.id);
      expect(foundReservation[0].status).to.equal("PENDING_APPROVAL");
      expect(foundReservation[0].createdAt).to.exist;
    });
  });

  describe("update Reservation", () => {

    it("updates a reservation with given parameters", async () => {
      const user = new User({ username: "foo" });
      await user.save();
      const room = new Room({ name: "new_room" });
      room.save();
      const reservation = new Reservation({ user: user.id, room: room.id, status: "RESERVED" });
      await reservation.save();
      reservation.status = "PENDING_APPROVAL";
      await reservation.save();
      const foundUser = await User.find({ username: "foo" });
      const foundRoom = await Room.find({ name: "new_room" });
      const foundReservation = await Reservation.find({ user: user.id });
      expect(foundReservation.user).to.equal(foundUser.id);
      expect(foundReservation.room).to.equal(foundRoom.id);
      expect(foundReservation[0].status).to.equal("PENDING_APPROVAL");
      expect(foundReservation[0].createdAt).to.exist;
    });
  });
})