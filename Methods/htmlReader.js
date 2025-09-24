const fs = require("fs").promises
const path = require("path")


module.exports = async (stuff)=>{
    fileD = path.resolve(__dirname,"..")
    filePath = path.join(fileD,"html",`${stuff}.html`)
    try{
        data = await fs.readFile(filePath,"utf8")
    }catch(err){
        console.log(err)
    }
    return data
}