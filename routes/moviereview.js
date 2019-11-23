var router = require('express').Router();
var MovieReview = require("../db/models/moviereview").MovieReview;
var MovieDB = require("../db/models/moviereview/moviedb.js").MovieDB;
var GetUser = require("../utils/requestUtils").genericGet;
var fs = require('fs');

router.get("/", function(req, res) {
    console.log("hello was called");
    MovieReview.find().limit(50).skip(0).then(function(x) {
        res.json(x);
    }).catch(function(er) {
        sendInternalServerError(res, er);
    });
});


router.get("/byID/:id", function(req, res) {
    MovieReview.find({ movieId: req.params.id }).then(function(x) {
        res.json(x);
    }).catch(function(er) {
        res.send(er)
    });
});

router.get("/user/:movieId/:id", function(req, res) {
    MovieReview.findOne({ userId: req.params.id, movieId: req.params.movieId }).then(function(x) {
        if (x === null) {
            res.json({ isPresent: false });
        } else {
            res.json(x);
        }
    }).catch(function(er) {
        res.send("error")
    });
});

router.get("/byID/avg/:id", function(req, res) {
    MovieReview.aggregate(
        [
            { $match: { movieId: req.params.id } },

            {
                $group: {
                    _id: "$movieId",
                    avgQuantity: { $avg: "$rating" }
                }
            }
        ]
    ).then(xx => console.log(xx)).catch(eer => console.log(eer));
});

router.get("/movie/:id", function(req, res) {
    MovieReview.find({ _id: req.params.id }).then(function(x) {
        res.json(x);
    }).catch(function(er) {
        res.send(er);
    });
});

router.get("/tvshow", function(req, res) {
    MovieReview.find({ whichtype: 'tvshow' }).then(function(x) {
        res.json(x);
    }).catch(function(er) {
        sendInternalServerError(res, er);
    });
});

router.get("/tvshow/:id", function(req, res) {
    MovieReview.find({ _id: req.params.id }).then(function(x) {
        res.json(x);
    }).catch(function(er) {
        sendInternalServerError(res, er);
    });
});

// router.post("/", function(req, res) {
//     review = new MovieReview();
//     review.movieId = req.body.movieId;
//     review.userId = req.body.userId;
//     review.rating = req.body.rating;
//     review.review = req.body.review;
//     review.save().then(function(x) {
//         res.send(x.toJSON());
//     }).catch(er => {
//         res.send(er);
//     });
// });

router.post("/", async function(req, res) {
    review = new MovieReview();
    review.movieId = req.body.movieId;
    review.userId = req.body.userId;
    review.rating = req.body.rating;
    review.review = req.body.review;
    rev = await review.save();
    av = await MovieReview.aggregate(
        [
            { $match: { movieId: req.body.movieId } },

            {
                $group: {
                    _id: "$movieId",
                    avg: { $avg: "$rating" }
                }
            }
        ]
    );
    let avgRating = av[0].avg;
    updatedMovieResp = await MovieDB.updateOne({ _id: req.body.movieId }, {
        avgRating: avgRating
    });
});

router.put("/user/:movieId/:id", async(req, res) => {
    try {
        updatedChatResp = await MovieReview.updateOne({ userId: req.params.id, movieId: req.params.movieId }, req.body);
        updatedChat = await MovieReview.findOne({ userId: req.params.id, movieId: req.params.movieId });
        res.send(updatedChat);
        //movie avg rating
        av = await MovieReview.aggregate(
            [
                { $match: { movieId: req.params.movieId } },
                {
                    $group: {
                        _id: "$movieId",
                        avg: { $avg: "$rating" }
                    }
                }
            ]
        );
        let avgRating = av[0].avg;
        updatedMovieResp = await MovieDB.updateOne({ _id: req.params.movieId }, {
            avgRating: avgRating
        });

    } catch (err) {
        sendInternalServerError(res, err);
    }
});

router.delete("/user/:movieId/:id", async(req, res) => {
    try {
        deleteChat = await MovieReview.deleteOne({ userId: req.params.id, movieId: req.params.movieId });
        res.send(deleteChat);

        //movie avg rating
        av = await MovieReview.aggregate(
            [
                { $match: { movieId: req.params.movieId } },
                {
                    $group: {
                        _id: "$movieId",
                        avg: { $avg: "$rating" }
                    }
                }
            ]
        );
        let avgRating = av[0].avg;
        updatedMovieResp = await MovieDB.updateOne({ _id: req.params.movieId }, {
            avgRating: avgRating
        });

    } catch (err) {
        sendInternalServerError(res, err);
    }
});

module.exports = router;