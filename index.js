const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const userSchema = require("./models/userModel.js");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;
const { register, login, LimSkip } = require("./auth/controller");
app.listen(port, () => console.log(`app is listening on ${port}`));
app.post("/api/register", register);
app.post("/api/login", login);
app.get("/api/userData", async (req, res) => {
  try {
    userData = await LimSkip(req.query.limit, req.query.skip);
    console.log(userData);
    if(userData == null){
        return res.status(500).json({error:"Bad Request"});
    }
    return res.status(200).json(userData);
  } catch {
    res.status(400).json({ error: "Error" });
  }
});
