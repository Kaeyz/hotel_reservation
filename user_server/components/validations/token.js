const jwt = require("jsonwebtoken");
const crypto = require("crypto");


const keys = require("../../config/keys");


const tokenGenerator = {};

/**
 * @description generates sign in token for logged in users
 * @requires payload
 * @returns jwt token
 */
tokenGenerator.loginToken = (payload) => {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, keys.secretOrKey, { expiresIn: 7200 }, (err, token) => {
			if (err) {
				return reject(err);
			}
			token = `Bearer ${token}`;
			return resolve(token);
		});
	});
};

/**
 * @description generates random token
 * @requires size : Number
 * @returns token
 */
tokenGenerator.getRandomToken = (size) => {
	return crypto.randomBytes(size).toString("hex");
};

module.exports = tokenGenerator;