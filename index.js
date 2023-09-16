const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
/*
const userSchema = require("./models/userModel.js");
const mongoose = require("mongoose");*/

const app = express();
app.use(cors());
app.use(express.json());

const port = 3001;

const { register, login, LimSkip, postUserMedInfo, postPredictionData, getPredictionData,getSymptomsList } = require("./auth/controller");

app.listen(port, () => console.log(`app is listening on ${port}`));

app.post("/api/register", register);

app.post("/api/login", login);

app.get("/api/userMedInfo", async (req, res) => {
  try {
    userData = await LimSkip(req.query.limit, req.query.skip);
    if(userData == null){
        return res.status(500).json({error:"Bad Request"});
    }
    return res.status(200).json(userData);
  } catch {
    res.status(400).json({ error: "Error" });
  }
});

app.post('/api/userMedInfo',postUserMedInfo);

app.post('/api/predictionData',postPredictionData);

app.get('/api/predictionData',getPredictionData);

app.get('/api/symptoms',getSymptomsList);
