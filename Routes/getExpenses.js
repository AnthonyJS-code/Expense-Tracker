const expenses = require("../models/expense.models");
const users = require("../models/users.models");
module.exports = async (req, res) => {
  let person = await users.findOne({ email: req.session.passport.user });
  let id = person._id.toString();
  let data = await expenses
    .find({ user: id })
    .select("-__v,-updatedAt -createdAt");
  res.json({ data: data });
};
