const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    userId:String,
    description:String,
    duration:Number,
    date:Date,
})

// you only have to take username id is created by itself
const userSchema = new mongoose.Schema({
    username:String
})

const logSchema = new mongoose.Schema({
    username:String,
    count:Number,
    log:[{
        description:String,
        duration:Number,
        date:String,
        _id:false
    }]
})
const Exercise = new mongoose.model('Exercise',exerciseSchema);
const user = new mongoose.model('User',userSchema);
const Log = new mongoose.model('Log',logSchema);

module.exports = {
    Exercise,
    user,
    Log
}