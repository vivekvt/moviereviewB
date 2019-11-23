var router = require("express").Router();
var Utils = require("../utils/utils");
var User = require("../db/models/user").User;

router.use(async(req, resp, next) => {

    try {
        authToken = req.headers.authorization;
        if (authToken) {
            encodedToken = authToken.replace("Basic ", "");
            decodedToken = Utils.decodeBase64(encodedToken);
            credentialTuple = decodedToken.split(":");

            if (credentialTuple.length === 2) {
                
                email = credentialTuple.shift();
                password = credentialTuple.shift();

                user = await User.findOne({ email: email });
                if (user) {
                    if (user.validatePassword(password)) {
                        req.user = user;
                        next();
                    } else {
                        e = new Error("incorrect password");
                        throw e;
                    }
                } else {
                    e = new Error("Invalid email no user found");
                    throw e;
                }




                // user = await new User().validateUser(credentialTuple.shift(), credentialTuple.shift());
                // console.log("ifhwrwhf", user);
                // req.user = user;
                // next();




            } else {
                e = new Error("auth details missing username or password");
                throw e;
            }
        } else {
            e = new Error("auth details missing in header");
            e.status = 401;
            throw e;
        }
    } catch (e) {
        resp.send(e.message);
    }
});

module.exports = router;