const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crudschema = new Schema({
   name: {type:String,
        required:true
    },
    title: {type:String,
        required:true
    },
   content: {type:String,
        required:true
    }
})
const crud= mongoose.model('crud',crudschema);

module.exports = crud;