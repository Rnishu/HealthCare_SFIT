const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const userSchema = require("./models/userModel.js");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const port = 3001;

const {
  register,
  login,
  LimSkip,
  postUserMedInfo,
  getUserMedInfo,
  postPredictionData,
  getPredictionData,
  getSymptomsList,
  predict
} = require("./auth/controller");

app.listen(port, () => console.log(`app is listening on ${port}`));
//authentification
app.post("/api/register", register);

app.post("/api/login", login);
//accessing user medical information
app.get("/api/userMedInfo", getUserMedInfo);
//posting user medical information
app.post("/api/userMedInfo", postUserMedInfo);

app.post("/api/predictionData", postPredictionData);

app.get("/api/predictionData", getPredictionData);

app.get("/api/symptomsList", getSymptomsList);

app.post("/api/predictionModel", predict);
