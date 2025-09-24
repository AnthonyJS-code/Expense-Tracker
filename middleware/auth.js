module.exports = (req,res,next)=>{
    if(req.session && req.session.authenticated){
        next()
    }else{
        res.redirect("/api/login")
    }
}