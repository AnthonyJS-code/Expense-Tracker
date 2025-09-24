const htmlReader = require("../Methods/htmlReader")

module.exports = async(req,res)=>{
    let data = await htmlReader('createAccount') 
    res.send(data)
}