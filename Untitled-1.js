var jwt = require('jsonwebtoken');

var signingkey = "somerandomvalue";
var expiry = '1m';

var payload = {
    username: "vivekvt",
    password: "supersecurepasswordr"
}
signedToken = jwt.sign(payload, signingkey, {
    expiresIn: expiry
});

signedToken;

verify = jwt.verify(signedToken, signingkey);
console.log(verify)
var vt = "vtvt";