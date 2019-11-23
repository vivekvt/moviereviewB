var router = require('express').Router();
var ChatHistory = require("../db/models/chat_history").ChatHistory;
var GetUser = require("../utils/requestUtils").genericGet;


router.get("/", function(req, res) {
    // GetUser(req, User)
    ChatHistory.find().then(function(x) {
        res.json(x);
    }).catch(function(er) {
        sendInternalServerError(res, er);
    });
});



router.get("/:fromUser/to/:toUser", function(req, res) {
    ChatHistory.find({ fromUser: req.params.fromUser, toUser: req.params.toUser }).sort({ createdAt: 'desc' }).then(x => {
        res.json(x)
    }).catch(err => {
        sendInternalServerError(res, err);
    });
});


router.post("/", function(req, res) {
    chat = new ChatHistory();
    chat.fromUser = req.body.fromUser;
    chat.toUser = req.body.toUser;
    chat.message = req.body.message;
    chat.save().then(function(x) {
        res.send(x.toJSON());
    }).catch(er => {
        sendInternalServerError(res, er);
    });
});

router.put("/:id", async(req, res) => {
    try {
        // user = await User.findOne({ _id: req.params.id });
        // updatedParams = {};
        // if (req.body.firstName) updatedParams.firstName = req.body.firstName;
        // if (req.body.lastName) updatedParams.lastName = req.body.lastName;
        updatedChatResp = await ChatHistory.updateOne({ _id: req.params.id }, req.body);
        console.log(updatedChatResp);
        updatedChat = await ChatHistory.findOne({ _id: req.params.id });
        res.send(updatedChat);
    } catch (err) {
        sendInternalServerError(res, err);
    }
});

router.delete("/:id", async(req, res) => {
    try {
        deleteChat = await ChatHistory.deleteOne({ _id: req.params.id });
        // user = User.find();
        res.send(deleteChat);
    } catch (err) {
        sendInternalServerError(res, err);
    }
});

module.exports = router;