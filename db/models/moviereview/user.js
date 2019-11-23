var mongoose = require('mongoose');
var moment = require('moment');
var crypto = require('crypto');
var MovieUserSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    password: {
        required: true,
        type: String
    }
}, { timestamps: true });

var encrypt = function(password) {
    return crypto
        .createHash("sha256")
        .update(password)
        .digest("base64");
};


MovieUserSchema.methods.setPassword = function(password) {
    this.password = encrypt(password);
    return this.password;
};

MovieUserSchema.methods.validatePassword = function(password) {
    return this.password === encrypt(password);
};


MovieUserSchema.methods.validateUser = async(email, password) => {
    user = await this.model("User").findOne({ email });
    if (user) {
        if (user.validatePassword(password)) {
            return user;
        } else {
            throw new Error("incorrect password");
        }
    } else {
        throw Error("Invalid email no user found");
    }
}

MovieUserSchema.methods.toJSON = function() {
    return {
        "id": this._id,
        "email": this.email,
        "firstName": this.firstName,
        "lastName": this.lastName,
        "password": this.password,
        "isAdmin": this.isAdmin,
        "createdAt": moment(this.createdAt).format("DD/MM/YYYY HH:mm:ss"),
        "updatedAt": moment(this.updatedAt).format("DD/MM/YYYY HH:mm:ss")
    }
}

exports.MovieUser = mongoose.model("MovieUser", MovieUserSchema);