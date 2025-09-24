const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema(
    {
       expense:{
        type:String,
        required:true
       },
       expenseAmount:{
        type:Number,
        required:true
       },
       user:{
        type:String,
        required:true
       },
       category:{
        type:String,
       }
    },
    {
        timestamps: true,
    }
)

expenseSchema.index({expense:1,expenseAmount:1,user:1,category:1},{unique:true})

const expenses = mongoose.model("expense",expenseSchema);
module.exports = expenses