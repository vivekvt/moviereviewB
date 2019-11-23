console.log("Running Test.js");


vat jwt = require('jsonwebtoken');

var signingkey = "somerandomvalue";
var expiry = '1 minute';

var payload = {
    username: "vivekvt",
    password: "supersecurepassword"
}
signedToken = jwt.sign(payload, signingkey, {
    expiresIn: expiry
});

signedToken;

console.log(signedToken);

var vt = "vtvt"

var username = 'vivekvt';
var password = 'thalavt';

function encode(username, password) {
    var encoded = Buffer.from(username + ':' + password).toString('base64');
    return {
        auth: "Basic " + encoded
    }
}

var vt = encode(username, password);

console.log(vt.auth);


function decode(token) {
    var encodedData = token.replace('Basic ', '');
    console.log(encodedData);
    var decoded = new Buffer(encodedData, 'base64').toString().split(':');
    console.log(decoded);
    return {
        username: decoded.shift(),
        password: decoded.shift()
    };
};

var d = decode('Basic dml2ZWt2dDp0aGFsYXZ0');

console.log(d.username);

console.log('test is closing')