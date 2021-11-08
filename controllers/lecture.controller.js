const express = require("express");
const router = express.Router();

const authanticate = require("../middleware/authanticate");
const authorise = require("../middleware/authorise");

const Lecture = require("../models/lectures.model");


router.post("/", authanticate, authorise(["instructor", "admin"]), async function (req, res) {
    try {
        let lecture = await Lecture.create(req.body);
        
        return res.status(201).send(lecture);
    }
    catch (err) {
        return res.send(400).send(err.message);
    }
});

router.get("/", async function (req, res) {
    try {
        let lecture = await Lecture.find({}).select("-password").lean().exec();
        
        return res.status(201).send(lecture);
    }
    catch (err) {
        return res.send(400).send(err.message);
    }
});

router.patch("/:lecture_id", authanticate, authorise(["instructor", "admin"]), async function (req, res) {
    try {
        console.log(req.params.lecture_id, req.body.title);
        let lecture = await Lecture.findByIdAndUpdate(req.params.lecture_id, {title: req.body.title},{new: true})
        return res.status(201).send(lecture);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
});


router.delete("/:lecture_id", authanticate, authorise(["instructor", "admin"]), async function (req, res) {
    try {
        console.log(req.params.lecture_id, req.body.title);
        let lecture = await Lecture.findByIdAndDelete(req.params.lecture_id)
        return res.status(201).send(lecture);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
});


module.exports = router;