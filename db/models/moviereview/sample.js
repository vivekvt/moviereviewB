var mongoose = require("mongoose");


var SampleSchema = new mongoose.Schema({
    name: {
        require: true,
        type: String
    },
    email: {
        require: true,
        type: String
    }
}, { timestamps: true });

SampleSchema.methods.toJSON = function() {
    return {
        "id": this._id,
        "email": this.email,
        "name": this.name
    };
};

exports.Sample = mongoose.model("Sample", SampleSchema);