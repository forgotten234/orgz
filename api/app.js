var mongoose = require('mongoose')
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var gradesRouter = require("./routes/grades");
var todosRouter = require("./routes/todos");
var eventsRouter = require("./routes/events");
var workloadRouter = require("./routes/workloads");
var registrationRouter = require("./routes/registration")
var userRouter = require("./routes/users")
var loginRouter = require("./routes/login")
var app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/orgzDB", { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
      console.log("DB connected!")
    });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/todos", todosRouter);
app.use("/events", eventsRouter);
app.use("/grades", gradesRouter);
app.use("/workloads", workloadRouter);
app.use("/registration", registrationRouter);
app.use("/users", userRouter);
app.use("/login", loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
