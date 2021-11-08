const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token,  process.env.JWT_KEY, function(err, user) {
        if (err) {
            return reject(err)
            }
        
        return resolve(user)
       });
    })
    
}

module.exports = async (req, res, next) => {
    
    const bearerToken = req?.headers?.authorization;

    if (!bearerToken) {
        return res.status(400).json({ status: "error", message: "you did not send authorization headers" });
    }

    const token = bearerToken.split(" ")[1];

    console.log(token);
    try {
        let userId = await verifyToken(token);
        let user = await User.findOne({ _id: userId.id }).exec();

        console.log("userrrr", user);
        req.user = user;
        return next();
    }
    catch (err) {
        return res.status(400).json(err.message);
    }
}