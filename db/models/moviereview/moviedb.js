var mongoose = require('mongoose');
var moment = require('moment');

var MovieDBSchema = new mongoose.Schema({
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
    },
    avgRating: {
        type: Number,
    }

}, { timestamps: true });

MovieDBSchema.methods.toJSON = function() {
    return {
        "id": this._id,
        name: this.name,
        description: this.description,
        category: this.category,
        whichtype: this.whichtype,
        fileName: this.fileName,
        avgRating: this.avgRating,
        "createdAt": moment(this.createdAt).format("DD/MM/YYYY HH:mm:ss"),
        "updatedAt": moment(this.updatedAt).format("DD/MM/YYYY HH:mm:ss")
    };
};

exports.MovieDB = mongoose.model("MovieDB", MovieDBSchema);