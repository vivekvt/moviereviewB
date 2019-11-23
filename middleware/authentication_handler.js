var router = require('express').Router();
var AuthUtils = require("../utils/auth");

router.use((req, resp, next) => {
    try {
        authToken = req.headers["x-web-logintoken"];

        if (authToken) {
            decodedAuth = AuthUtils.validateToken(authToken);
            // console.log("this was invoked");
            req.auth = decodedAuth;
            next();
        } else {
            e = new Error("Auth credintial  missing in request");
            e.status = 401;
            throw e;
        }
    } catch (e) {
        resp.send(e.message);
    }

});


module.exports = router;