exports.decodeBase64 = function(data) {
    return new Buffer(data, "base64").toString();
}