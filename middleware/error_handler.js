var router = require("express").Router();

router.use((err, _req, res, _next) => {
    console.log("This error handler was executed");
    res.status = 400;
    res.send(err);
})

module.exports = router;