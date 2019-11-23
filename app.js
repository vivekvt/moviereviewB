require("dotenv").config();
var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var port = process.env.APP_PORT;
var authMiddleware = require("./middleware/authentication_handler");
var basicAuthHandler = require("./middleware/basic_auth_handler");
var User = require('./db/models/user').User;
var userAdminRouter = require('./routes/admin/user');
var userRouter = require('./routes/user');
var chatRouter = require('./routes/chat_history');
var movieRouter = require('./routes/movie_history');
var movieReviewRouter = require('./routes/moviereview');
var sampleRouter = require('./routes/sample');
require("./db/mongo");
var loginRouter = require('./routes/moviereview/login');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/qwerty", sampleRouter);
// app.use("/api/v1/chat", authMiddleware);
// app.use("/api/v1/admin", basicAuthHandler);
app.use("/api", movieRouter);
app.use("/review", movieReviewRouter)
app.use("/api/v1/admin/user", userAdminRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/login", loginRouter);

app.all("/", function(req, res) {
    res.send("Chatter is runing");
});

app.use((err, _req, res, _next) => {
    res.status(err.status).send(err.message);
});

app.listen(port, function() {
    console.log("App listening on port ", port);
});