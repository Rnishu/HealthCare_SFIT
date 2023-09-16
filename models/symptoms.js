const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const list = new Schema(
    {
        symptoms : [
            {
                type : String,
                required : true
            }
        ]
    }
)
const symptomsList = mongoose.model('ListOfSymptoms',list);
module.exports = symptomsList;