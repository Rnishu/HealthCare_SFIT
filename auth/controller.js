const bcrypt = require("bcryptjs");
const userSchema = require("../models/userModel.js");
const userMedInfoSchema = require("../models/userMedInfoModel.js");
const predictionSchema = require("../models/predictionModel.js");
const symptoms = require("../models/symptoms.js");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwtkey = "dontreact@15^-202";
const url =
  "mongodb+srv://dontreact:harivasudevan@cluster0.oa6nyed.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
});
mongoose.connection.on("error", function (error) {
  console.log(error);
});
mongoose.connection.on("open", function () {
  console.log("Connected to MongoDB database.");
});

const register = async (req, res) => {
  if (!req) {
    return res.status(400).json({ error: "Bad Request" });
  }
  try {
    const cryptedPassword = await bcrypt.hash(req.body.password, 10);
    await userSchema.create({
      username: req.body.username,
      email: req.body.email,
      password: cryptedPassword,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Duplicate error" });
  }
};

const login = async (req, res) => {
  {
    const user = await userSchema.findOne({
      username: req.body.username,
    });
    if (!user) {
      return { status: "error", error: "Invalid Login" };
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isPasswordValid) {
      const token = jwt.sign({ email: user.email }, jwtkey);
      return res.json({ status: "ok", user: token });
    } else {
      return res.json({ status: "error", user: false });
    }
  }
};

const postUserMedInfo = async (req, res) => {
  if (!req) {
    return res.status(400).json({ error: "Bad Request" });
  }
  try {
    await userMedInfoSchema.create({
      username: req.body.username,
      age: req.body.age,
      symptoms: req.body.symptoms,
      numberOfDays: req.body.numberOfDays,
      gender: req.body.gender,
      location: req.body.location,
      medicalHistory: req.body.medicalHistory,
      ancestralDisease: req.body.ancestralDisease,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Server Error" });
  }
};

const postPredictionData = async (req, res) => {
  if (!req) {
    return res.status(400).json({ error: "Bad Request" });
  }
  try {
    await predictionSchema.create({
      username: req.body.username,
      disease: req.body.disease,
      symptoms: req.body.symptoms,
      urgency: req.body.urgency,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Server Error" });
  }
};

const getPredictionData = async (req, res) => {
  try{
    const predData=await predictionSchema.find();
    return predData;
  }
  catch{
    return null;
  }
}

const LimSkip = async (limit, skip) => {
  skip = skip || 0;
  limit = limit || 30;
  try {
    const userData = await userMedInfoSchema.find().skip(skip).limit(limit);
    return userData;
  } catch {
    return null;
  }
};

const getSymptomsList = async (req, res) =>{
  try{
    const symptomsList = await symptoms.find()
    return symptomsList;
  }catch {
    return null;
  }
}

module.exports = {
  register,
  login,
  LimSkip,
  postUserMedInfo,
  postPredictionData,
  getPredictionData,
  getSymptomsList
};
