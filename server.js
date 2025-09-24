const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db");
const getExpenses = require("./Routes/getExpenses");
const auth = require("./middleware/auth");
const openLoginPage = require("./Routes/openLoginPage");
const openCreateAccountPage = require("./Routes/openCreateAccountPage");
const createAccount = require("./Routes/createAccount");
const loginValidation = require("./Routes/loginValidation");
const localStrategy = require("./middleware/localstrategy");
const passport = require("passport");
const users = require("./models/users.models");
const session = require("express-session");
const openNewExpense = require("./Routes/openNewExpense");
const addNewExpense = require("./Routes/addNewExpense");
const updateExpense = require("./Routes/updateExpense");
const deleteExpense = require("./Routes/deleteExpense");
const logout = require("./Routes/logout");
const PORT = process.env.PORT;

passport.use(localStrategy);
passport.serializeUser((user, done) => {
  if (user && user.email) {
    done(null, user.email);
  }
});

passport.deserializeUser(async (email, done) => {
  try {
    const user = await users.findOne({ email: email });
    done(null, email);
  } catch (err) {
    done(err);
  }
});

app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SUPER_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize())
app.use(passport.session())

app.get("/api/allExpenses", auth, getExpenses);
app.get("/api/login", openLoginPage);
app.get("/api/create-account", openCreateAccountPage);
app.get("/api/newExpense", auth,openNewExpense)

app.post("/api/create-account", createAccount);
app.post("/api/login", loginValidation);
app.post("/api/newExpense", auth,addNewExpense)
app.post("/api/updateExpense",auth,updateExpense)
app.post("/api/logout",auth,logout)


app.delete("/api/deleteExpense/:id",auth,deleteExpense)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server Started at port ${PORT}`);
  });
});
