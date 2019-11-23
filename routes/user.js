var router = require('express').Router();
var validationResult = require('express-validator/check').validationResult;
var validator = require('express-validator/check');
var User = require('../db/models/user').User;
var GetUser = require("../utils/requestUtils").genericGet;
var Auth = require('../utils/auth');

var rules = [
    validator
    .body("email")
    .isEmail()
    .normalizeEmail(),
    validator
    .body("password")
    .not()
    .isEmpty()
];


router.post("/login", rules, async(req, resp) => {

    try {
        // var errors = validationResult(req);
        // if (!error.isEmpty()) {
        //     console.log("This ucesfulsl send");
        //     return res.status(400).json({ errors: errors.array() });
        // }
        var user = await User.findOne({ email: req.body.email });
        if (user) {
            if (user.validatePassword(req.body.password)) {
                token = Auth.generateToken({
                    id: user._id,
                    email: user.email
                });
                return resp.send({
                    username: user.username,
                    token
                })
            } else {
                e = new Error("Invalid password please try again");
                e.status = 401;
                throw e;
            }
        } else {
            e = new Error("invalid email  does nto exits");
            e.status = 401;
            throw e;
        }
    } catch (e) {
        resp.send(e.message);
    }
});

module.exports = router;