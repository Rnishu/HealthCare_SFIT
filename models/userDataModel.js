const mongoose = require('mongoose');
const { collection } = require('./userModel');
const Schema = mongoose.Schema;
const userData = new Schema(
    {
        age : {type : "integer", required : true},
        symptoms : {type : "string", required : true},
        numberOfDays : {type : "integer", required : true},
        gender : {type : "string", required : true, },
        location : {type : "string", required : true},
        medicalHistory : {
            previousDisease : { type : "string"},
            symptoms : { type : "string"}
        },
        ancestralDisease : {
            disease : { type : "string"},
        }
    },{
        collection : 'userData'
    }
)