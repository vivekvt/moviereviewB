var router = require('express').Router();
var User = require("../../db/models/user").User;
var GetUser = require("../../utils/requestUtils").genericGet;



router.get("/", function(req, res) {
    // GetUser(req, User)
    User.find().then(function(x) {
        res.json(x);
    }).catch(function(er) {
        sendInternalServerError(res, er);
    });
});



router.get("/:id", function(req, res) {
    User.find({ _id: req.params.id }).limit(1).then(x => {
        res.json(x)
    }).catch(err => {
        sendInternalServerError(res, err);
    });
});


router.post("/", function(req, res) {
    user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    if (req.body.isAdmin) {
        user.isAdmin = req.body.isAdmin;
    }
    user.setPassword(req.body.password);
    console.log('user crated is', user);
    user.save().then(function(x) {
        res.send(x.toJSON());
    }).catch(er => {
        res.send(er);
    });
});

router.put("/:id", async(req, res) => {
    try {
        updatedUserResp = await User.updateOne({ _id: req.params.id }, req.body);
        updatedUser = await User.findOne({ _id: req.params.id });
        res.send(updatedUser);
    } catch (err) {
        sendInternalServerError(res, err);
    }
});

router.delete("/:id", async(req, res) => {
    try {
        deleteResp = await User.deleteOne({ _id: req.params.id });
        // user = User.find();
        res.send(deleteResp);
    } catch (err) {
        sendInternalServerError(res, err);
    }
});

module.exports = router;