const jwt = require('jsonwebtoken');

const authorization = async(req, res, next) => {
    try {
        const jwtToken = req.header("token");

        if (!jwtToken) {
            return res.status(403).json({
                status: "failed",
                message: "Unauthorize"
            });
        }

        const payload = jwt.verify(jwtToken, "cat123");

        req.user = payload.user;

    } catch (err) {
        console.error(err.message);
        return res.status(403).json({
            status: "failed",
            message: "Unauthorize"
        });
    }

    next();
}

module.exports = authorization;