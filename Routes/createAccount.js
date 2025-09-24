const users = require("../models/users.models");
const bcrypt = require("bcrypt");
const validator = require("validator");

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = validator.isEmail(email);
    if (result) {
      let present = await users.findOne({ email: email });
      if (present) {
        res.redirect("/api/login");
      } else {
        let passwordHash = await bcrypt.hash(password, 10);
        let user = new users({
          email: email,
          password: passwordHash,
        });
        await user.save();
        res.redirect("/");
      }
    } else {
      res.redirect("/api/create-account");
    }
  } catch (err) {
    console.log(err);
  }
};
