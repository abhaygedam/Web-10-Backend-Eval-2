const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_photo_url: { type: String, required: true },
    roles: [{ type: String, required: true }]
}, {
    versionKey: false,
    timestamps: true,
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    console.log("before pass", this.password);
    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    console.log("after pass", this.password);
    return next();
});

userSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("user", userSchema);