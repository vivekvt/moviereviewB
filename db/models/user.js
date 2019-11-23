var mongoose = require('mongoose');
var moment = require('moment');
var crypto = require('crypto');
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true

    },
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


UserSchema.methods.setPassword = function(password) {
    this.password = encrypt(password);
    return this.password;
};

UserSchema.methods.validatePassword = function(password) {
    return this.password === encrypt(password);
};


UserSchema.methods.validateUser = async(email, password) => {
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

UserSchema.methods.toJSON = function() {
    return {
        "id": this._id,
        "username": this.username,
        "email": this.email,
        "firstName": this.firstName,
        "lastName": this.lastName,
        "password": this.password,
        "createdAt": moment(this.createdAt).format("DD/MM/YYYY HH:mm:ss"),
        "updatedAt": moment(this.updatedAt).format("DD/MM/YYYY HH:mm:ss")
    }
}

exports.User = mongoose.model("User", UserSchema);