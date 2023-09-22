const bcrypt = require("bcryptjs");
const userSchema = require("../models/userModel.js");
const userMedInfoSchema = require("../models/userMedInfoModel.js");
const predictionSchema = require("../models/predictionModel.js");
const symptoms = require("../models/symptoms.js");
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
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


async function sendEmail(email) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'nishanthravichandran12@gmail.com',
        pass: 'nishanth'
      }
    });

    const mailOptions = {
      from: 'nishanthravichandran12@gmail.com',
      to: email,
      subject: 'You have increased risk of {disease}, please visit your nearest hospital imediatelly',
      text: 'Lorem100'
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}
//user login and register
const register = async (req, res) => {
  if (!req.body) {
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
      vitalSigns: req.body.vitalSigns,
      location: req.body.location,
      medicalHistory: req.body.medicalHistory,
      ancestralDisease: req.body.ancestralDisease,
    });
    prevHistory=await predictionSchema.find().limit(12);
    email=await userSchema.findOne(username=req.body.username).email
    if(prevHistory.length>10){
      sendEmail(email);
    }
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Server Error" });
  }
};
const getUserMedInfo = async (req, res) =>{
  try {
    userData = await LimSkip(req.query.limit, req.query.skip);
    if (userData == null) {
      return res.status(500).json({ error: "Bad Request" });
    }
    return res.status(200).json(userData);
  } catch {
    res.status(400).json({ error: "Error" });
  }
}
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
    return res.status(200).json({symptomsList});
  }catch {
    return res.status(500).json({error:"Error"});
  }
}

const predict= async(req,res)=>{
  const url = 'http://localhost:105/predict';
  const options = {
  method: 'POST',
  headers: {'content-type': 'application/json'},
  body: JSON.stringify(req.body)
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  await predictionSchema.create({
    username:"",
    disease: data.disease,
    symptoms:req.body.symptoms,
    urgency:data.urgency
  }
  );

  return res.status(200).json(data);
} catch (error) {
  return res.status(500).json({error:"Error"});
}
}

module.exports = {
  register,
  login,
  LimSkip,
  postUserMedInfo,
  getUserMedInfo,
  postPredictionData,
  getPredictionData,
  getSymptomsList,
  predict
};
