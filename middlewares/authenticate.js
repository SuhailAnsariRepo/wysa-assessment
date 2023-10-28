const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.JWT_SECRET || "secret";

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers['token'];
        if (!token) {
            return res.status(401).json('Access token is required.');
        }

        try {
            let jwtPayload = await jwt.verify(token, accessTokenSecret);
            if (!jwtPayload || !jwtPayload.nickname) {
                throw Error;
            }
            let user = await User.findOne({ nickname: jwtPayload.nickname });
            if (!user) {
                return res.status(403).json('Invalid access token, user not found.');
            }
            req.user = user;
            next();
        } catch (error) {
            return res.status(403).json('Invalid access token.');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    authenticate
};