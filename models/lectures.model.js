const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
    title: {type: String, required: true},
    batch: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model("lecture", lectureSchema);