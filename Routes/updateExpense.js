const expenses = require("../models/expense.models");

module.exports = async (req, res) => {
  const { expense, expenseAmount, category, id } = req.body;
  currentExpense = await expenses.findById(id);
  currentExpense.expenseAmount = expenseAmount;
  currentExpense.expense = expense;
  currentExpense.category = category;
  await currentExpense.save();
  res.redirect("/");
};
