var sendInternalServerError = function(res, er, userMessage = "Unable to process your request") {
    res.status(500).json({
        error: true,
        userMessage,
        errorMessage: er.message
    });
};

var sendError =

    module.exports = router