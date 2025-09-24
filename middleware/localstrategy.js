const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const users = require("../models/users.models");
const validator = require("validator");

module.exports = new localStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      result = await validator.isEmail(email);
      if (result) {
        const user = await users.findOne({ email: email });
        if (!user) {
          return done(null, false);
        }
        let result = await bcrypt.compare(password, user.password);
        if (result) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err);
    }
  }
);
