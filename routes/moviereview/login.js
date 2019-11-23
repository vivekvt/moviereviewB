var router = require('express').Router();
var Utils = require("../../utils/utils");
var MovieUser = require("../../db/models/moviereview/user").MovieUser;
var Auth = require('../../utils/auth');



router.get("/", function(req, res) {
    MovieUser.find().then(function(x) {
        res.json(x);
    }).catch(function(er) {
        sendInternalServerError(res, er);
    });
});



router.get("/:id", function(req, res) {
    MovieUser.find({ _id: req.params.id }).limit(1).then(x => {
        res.json(x)
    }).catch(err => {
        sendInternalServerError(res, err);
    });
});

router.post("/login", async(req, resp) => {
    try {
        var user = await MovieUser.findOne({ email: req.body.email });
        if (user) {
            if (user.validatePassword(req.body.password)) {
                token = Auth.generateToken({
                    id: user._id,
                    email: user.email
                });
                return resp.send({
                    message: 'Logined Sucessfully!',
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isAdmin: user.isAdmin,
                    token
                })
            } else {
                e = new Error("Invalid password please try again");
                e.status = 401;
                e.mes = "Incorrect Email";
                throw e;
            }
        } else {
            e = new Error("invalid email  does nto exits");
            e.status = 401;
            e.mes = "No User Found";
            throw e;
        }
    } catch (e) {
        resp.send(e);
    }
});


router.post("/signup", function(req, res) {
    user = new MovieUser();
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    if (req.body.isAdmin) {
        user.isAdmin = req.body.isAdmin;
    }
    user.setPassword(req.body.password);
    user.save().then(function(x) {
        res.send(x.toJSON());
    }).catch(er => {
        res.send(er);
    });
});

router.put("/update/:id", async(req, res) => {
    console.log("this route was call");
    try {
        updatedUserResp = await MovieUser.updateOne({ _id: req.params.id }, req.body);
        updatedUser = await MovieUser.findOne({ _id: req.params.id });
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