var C = require('../constant/constant');
var getOffset = function() {
    offset = parseInt(req.query.offset);
    if (offset) {
        return offset;
    } else {
        return C.DEFAULT_OFFSET;
    }
};

var getLimit = function() {
    limit = parseInt(req.query.limit);
    if (limit && !isNaN(limit)) {
        if (limit > C.DEFAULT_LIMIT) {
            return 100;
        } else {
            return C.DEFAULT_LIMIT;
        }
    } else {
        return C.DEFAULT_LIMIT;
    }
};

var genericGet = function(req, Model) {
    resp = Model.find().limit(getLimit(req)).skip(getOffset(req));
    return resp;
};

exports.getOffset = getOffset;
exports.getLimit = getLimit;
exports.genericGet = genericGet;
// module.exports = getLimit, getOffset, generic;