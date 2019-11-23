var router = require('express').Router();
var MovieDB = require("../db/models/moviereview/moviedb.js").MovieDB;
var GetUser = require("../utils/requestUtils").genericGet;
var fs = require('fs');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         /*
//           Files will be saved in the 'uploads' directory. Make
//           sure this directory already exists!
//         */
//         cb(null, './uploads');
//     },
//     filename: (req, file, cb) => {
//         /*
//           uuidv4() will generate a random ID that we'll use for the
//           new filename. We use path.extname() to get
//           the extension from the original file name and add that to the new
//           generated ID. These combined will create the file name used
//           to save the file on the server and will be available as
//           req.file.pathname in the router handler.
//         */
//         const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
//         cb(null, newFilename);
//     },
// });
// // create the multer instance that will be used to upload/save the file
// const upload = multer({ storage });

// router.post('/hey', upload.single('selectedFile'), (req, res) => {
//     /*
//       We now have a new req.file object here. At this point the file has been saved
//       and the req.file.filename value will be the name returned by the
//       filename() function defined in the diskStorage configuration. Other form fields
//       are available here in req.body.
//     */
//     console.log(req.file.originalname);
//     console.log(req.file);
//     console.log(req.file.filename);
//     console.log(req.body);
//     movie = new MovieDB();
//     movie.name = req.body.name;
//     movie.description = req.body.description;
//     movie.category = req.body.category;
//     movie.whichtype = req.body.whichtype;
//     movie.fileName = req.file.filename;
//     movie.save().then(function(x) {
//         res.send(x.toJSON());
//     }).catch(er => {
//         res.send(er);
//     });
// });

router.get("/", function(req, res) {
    MovieDB.find().then(function(x) {
        res.json(x);
    }).catch(function(er) {
        sendInternalServerError(res, er);
    });
});

router.get("/movie", function(req, res) {
    MovieDB.find({ whichtype: 'movie' }).then(function(x) {
        res.json(x);
    }).catch(function(er) {
        sendInternalServerError(res, er);
    });
});

router.get("/movie/:id", function(req, res) {
    MovieDB.findOne({ _id: req.params.id }).then(function(x) {
        res.json(x);
    }).catch(function(er) {
        sendInternalServerError(res, er);
    });
});

router.get("/tvshow", function(req, res) {
    MovieDB.find({ whichtype: 'tvshow' }).then(function(x) {
        res.json(x);
    }).catch(function(er) {
        sendInternalServerError(res, er);
    });
});

router.get("/tvshow/:id", function(req, res) {
    MovieDB.find({ _id: req.params.id }).then(function(x) {
        res.json(x);
    }).catch(function(er) {
        sendInternalServerError(res, er);
    });
});




router.get("/:name", function(req, res) {
    MovieDB.find({ name: req.params.name }).then(x => {
        res.json(x)
    }).catch(err => {
        sendInternalServerError(res, err);
    });
});


router.post("/", function(req, res) {
    movie = new MovieDB();
    movie.name = req.body.name;
    movie.description = req.body.description;
    movie.category = req.body.category;
    movie.whichtype = req.body.whichtype;
    movie.fileName = req.body.fileName;
    movie.save().then(function(x) {
        res.send(x.toJSON());
    }).catch(er => {
        res.send(er);
    });
});



router.put("/", async(req, res) => {
    try {
        updatedMovieResp = await MovieDB.updateOne({ _id: req.body.id }, req.body);
        updatedMovie = await MovieDB.findOne({ _id: req.params.id });
        res.send(updatedMovie);
    } catch (err) {
        res.send(err);
    }
});

router.put("/:id", async(req, res) => {
    try {
        updatedMovieResp = await MovieDB.updateOne({ _id: req.params.id }, req.body);
        updatedMovie = await MovieDB.findOne({ _id: req.params.id });
        res.send(updatedMovie);
    } catch (err) {
        res.send(err);
    }
});

router.delete("/", async(req, res) => {
    try {
        deleteChat = await MovieDB.deleteOne({ _id: req.body.id });
        res.send(deleteChat);
    } catch (err) {
        res.send(err);
    }
});

router.delete("/:id", async(req, res) => {
    try {
        deleteChat = await MovieDB.deleteOne({ _id: req.params.id });
        res.send(deleteChat);
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;