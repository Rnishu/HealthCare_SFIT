const { register, login } = require('./controller.js');
const express = require('express');
const app=require('../index.js');

app.post('/api/register',register);
app.post('/api/login',login);