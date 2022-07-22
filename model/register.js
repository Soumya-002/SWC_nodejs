const mongoose = require('mongoose');

const registerSchema =new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    }
})

const register =new mongoose.model('register',registerSchema);
module.exports = register;