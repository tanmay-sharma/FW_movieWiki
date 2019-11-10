const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const engine = require("ejs-mate");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const mainRoutes = require("./routes/main");
const secret = require("./config/secret");

// Instantiate express
const app = express();

//middleware
//keep track of operations in the application
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

//configure logger
app.use(morgan("dev"));

// Configure app to user bodyParser
//complex algo for parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride("_method"));
app.use(cookieParser());

//middleware run for every single route
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
app.engine("ejs", engine);
app.set("view engine", "ejs");

// Register our routes in app
app.use("/moviewiki", mainRoutes);

// Start our server
app.listen(secret.port, function(err) {
  if (err) throw err;
  console.log("Server is running");
});

// Export our app for testing purposes
module.exports = app;
