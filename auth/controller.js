const bcrypt=require('bcryptjs');
const userSchema=require('../models/userModel.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwtkey = 'dontreact@15^-202'
const url="mongodb+srv://dontreact:harivasudevan@cluster0.oa6nyed.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS : 5000 });
mongoose.connection.on("error", function(error) {
  console.log(error);
});
mongoose.connection.on("open", function() {
    console.log("Connected to MongoDB database.");
  });

register = async (req, res) => {
  info=JSON.parse(req.body);
  try {
    //const cryptedPassword = await bcrypt.hash(req.body.password, 10);
   await userSchema.create({
      username: info.username,
      email: info.email,
      password: "cryptedPassword",
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Duplicate error" });
  }
};

login = async(req,res) => {
    {
        const user = await userSchema.findOne({
                username : req.body.username,
            });
        if(!user){
            return { status : 'error', error : 'Invalid Login'};
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if(isPasswordValid){
            const token = jwt.sign({email : user.email,}, jwtkey);
            return res.json({status : 'ok', user : token});
        }else{
            return res.json({status: 'error', user : false});
        }
    
    }
}

module.exports={ register, login }
