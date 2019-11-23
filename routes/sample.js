var router = require("express").Router();
var Sample = require("../db/models/moviereview/sample").Sample;

router.get("/", function(req, res) {
    Sample.find().then(function(x) {
        res.json(x);
    });
});

router.post("/", async function(req, res) {
    user = new Sample();
    user.name = req.body.name;
    user.email = req.body.email;
    save = user.save();
    res.send("oject added");
});

module.exports = router;