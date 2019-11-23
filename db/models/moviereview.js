var mongoose = require('mongoose');
var moment = require('moment');

var MovieReviewSchema = new mongoose.Schema({
    movieId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String
    }
    // image: {
    //     data: Buffer,
    //     contentType: String
    // }

}, { timestamps: true });

MovieReviewSchema.methods.toJSON = function() {
    return {
        "id": this._id,
        movieId: this.movieId,
        userId: this.userId,
        rating: this.rating,
        review: this.review,
        isPresent: true,
        "createdAt": moment(this.createdAt).format("DD/MM/YYYY HH:mm:ss"),
        "updatedAt": moment(this.updatedAt).format("DD/MM/YYYY HH:mm:ss")
    };
};

exports.MovieReview = mongoose.model("MovieReview", MovieReviewSchema);