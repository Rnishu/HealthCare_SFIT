const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const predictionData = new Schema(
    {
        disease : {type : "array"},
        symptoms : {type : "array"},
        urgency : { type : "float"}
    }
)