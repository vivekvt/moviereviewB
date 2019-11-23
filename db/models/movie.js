var mongoose = require('mongoose');
var moment = require('moment');

var MovieHistorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    whichtype: {
        type: String,
        required: true
    },
    fileName: {
        type: String
    }

}, { timestamps: true });

MovieHistorySchema.methods.toJSON = function() {
    return {
        "id": this._id,
        name: this.name,
        description: this.description,
        category: this.category,
        whichtype: this.whichtype,
        fileName: this.fileName,
        "createdAt": moment(this.createdAt).format("DD/MM/YYYY HH:mm:ss"),
        "updatedAt": moment(this.updatedAt).format("DD/MM/YYYY HH:mm:ss")
    };
};

exports.MovieHistory = mongoose.model("MovieHistory", MovieHistorySchema);