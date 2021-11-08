const express = require("express");
let jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const newToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_KEY);
}

const checkPassword = function (password, storePass) {
    return bcrypt.compareSync(password, storePass);
}

const register = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email }).lean().exec();

        if (user) {
            const match = checkPassword(req.body.password, user.password);

            if (!match) {
                return res.status(400).json({ status: "error", message: "Wrong Password" });
            }

            const token = newToken(user);
            
            return res.status(201).json({ user, token });
        }

        user = await User.create(req.body);

        const token = newToken(req.body);

        return res.status(201).json({ user, token });
    } catch (err) {
        return res.status(400).send(err.message);
    }
}

module.exports = register;