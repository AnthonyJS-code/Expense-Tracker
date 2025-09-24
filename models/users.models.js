const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema(
    {
       email:{
        type:String,
        required:true,
        unique:true
       },
       password:{
        type:String,
        required:true
       }
    },
    {
        timestamps: true,
    }
)


const Users = mongoose.model("User",UsersSchema);
module.exports = Users