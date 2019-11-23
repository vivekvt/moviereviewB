var mongoose = require('mongoose');
var moment = require('moment');

var ChatHistorySchema = new mongoose.Schema({
    fromUser: {
        type: String,
        required: true
    },
    toUser: {
        type: String,
        required: true
    },
    message: String

}, { timestamps: true });

ChatHistorySchema.methods.toJSON = function() {
    return {
        "id": this._id,
        fromUser: this.fromUser,
        toUser: this.toUser,
        message: this.message,
        "createdAt": moment(this.createdAt).format("DD/MM/YYYY HH:mm:ss"),
        "updatedAt": moment(this.updatedAt).format("DD/MM/YYYY HH:mm:ss")
    };
};

exports.ChatHistory = mongoose.model("ChatHistory", ChatHistorySchema);