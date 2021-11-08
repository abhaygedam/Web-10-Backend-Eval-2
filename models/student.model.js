const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    roll_number: {type: Number, required: true},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_photo_url: { type: String, required: true },
    roles: [{ type: String, required: true }],
    batch: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model("student", studentSchema);