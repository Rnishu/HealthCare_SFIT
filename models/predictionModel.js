const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const predictionData = new Schema(
    {
        username : {type : "string"},
        disease : {type : "array"},
        symptoms : {type : "array"},
        urgency : { type : "number"}
    }
)
const model = mongoose.model('Prediction', predictionData);
module.exports = model;