const mongoose = require('mongoose');
const { collection } = require('./userModel');
const Schema = mongoose.Schema;
const userMedInfo = new Schema(
    {
        username : {type : "string", required : true},
        age : {type : "number", required : true},
        symptoms : {type : "string", required : true},
        numberOfDays : {type : "number", required : true},
        gender : {type : "string", required : true, },
        location : {type : "string", required : true},
        medicalHistory : {
            previousDisease : { type : "string"},
            symptoms : { type : "string"}
        },
        ancestralDisease : {
            disease : { type : "string"},
        },
        medicalStaff : {type : "boolean"}
    },{
        collection : 'userDatas'
    }
)
const model = mongoose.model('UserMedInfo', userMedInfo);
module.exports = model;