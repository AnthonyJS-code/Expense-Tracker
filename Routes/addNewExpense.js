const expenses = require("../models/expense.models");
const users = require("../models/users.models");

module.exports = async (req, res) => {
  try {
    let person = await users.findOne({ email: req.session.passport.user });
    let id = person._id.toString();
    const { expense, expenseAmount, category } = req.body;
    const newExpense = new expenses({
      expense: expense,
      expenseAmount: expenseAmount,
      user: id,
      category: category,
    });
    await newExpense.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};
