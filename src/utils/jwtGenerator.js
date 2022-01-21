const jwt = require('jsonwebtoken');
require('dotenv').config;

function jwtGenerator(id) {
    const payload = {
        user: id
    }

    return jwt.sign(payload, "cat123", {expiresIn: "12hr"});
}

module.exports = jwtGenerator;