const express= require('express');
const cors=require('cors');
const bcrypt=require('bcryptjs');
const userSchema = require('./models/userModel.js')
const mongoose=require('mongoose');
const app=express();
app.use(cors());
const port = 3000;
const {register,login}=require("./auth/controller");
app.listen(port,()=>console.log(`app is listening on ${port}`));
app.post('/api/register',register);
app.post('/api/login',login);

