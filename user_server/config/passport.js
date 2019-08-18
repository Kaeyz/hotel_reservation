const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const userRepository = require("../components/User/userRepository");
const keys = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
	passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
		userRepository
			.findAccountById(jwt_payload.id)
			.then(account => {
				if (account) {
					return done(null, account);
				}
				return done(null, false);
			})
			.catch(err => console.log(err));
	}));
};