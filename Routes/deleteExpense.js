const expenses = require("../models/expense.models");

module.exports = async(req,res)=>{
    data = req.params.id
    await expenses.findByIdAndDelete(data)
    res.redirect("/")
}