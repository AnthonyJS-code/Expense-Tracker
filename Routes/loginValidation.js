const passport = require("passport");

module.exports = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err || !user) {
      return res.status(401).send("Authentication failed");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.session.save((saveErr) => {
        if(saveErr){
            return next(saveErr)
        }
        req.session.authenticated = true;
        res.redirect("/");
      })
    });
  })(req,res,next);
};
