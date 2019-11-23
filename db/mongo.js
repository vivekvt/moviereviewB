require("dotenv").config();
var mongoose = require('mongoose');
mongoose.connect(process.env.DB_HOST);

//, { useNewUrlParser: true }

var db = mongoose.connection;
db.once("open", function callback() {
    console.log("Connected to Mongo DB");
});

module.exports = mongoose;