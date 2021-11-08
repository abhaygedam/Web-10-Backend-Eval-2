const express = require("express");
const connect = require("./config/db");

const app = new express();
app.use(express.json());

const register = require("./controllers/user.controller");
const lectureController = require("./controllers/lecture.controller");

app.post("/users", register);
app.use("/lectures", lectureController);

app.listen(2350, async () => {
    await connect();
    console.log("listening on port 2350");
})