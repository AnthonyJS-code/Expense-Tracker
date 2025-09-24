module.exports = async (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err)=>{
        if(err){
            return next(err)
        }
        res.clearCookie("Session")
        res.redirect("/api/login")
    })
  });
};
