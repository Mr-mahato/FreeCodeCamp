const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    username:String,
    description:String,
    duration:Number,
    date:String,
})

const userSchema = new mongoose.Schema({
    username:String
})

const logSchema = new mongoose.Schema({
    username:String,
    count:Number,
    log:[{
        description:String,
        duration:Number,
        date:String
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