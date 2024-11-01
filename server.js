const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require('express-session');

const authController = require("./controllers/auth.js");

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const usersController = require('./controllers/users.js');

const adventuresController = require('./controllers/adventures.js');

const port = process.env.PORT ? process.env.PORT : "3000";

const path = require('path');

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }
    })
  );

app.use(passUserToView); 

app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect(`/users/${req.session.user._id}/adventures`);
  } else {
    res.render('index.ejs');
  }
});
  
app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/adventures', adventuresController);
app.use('/users', usersController); 


app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
