const mongoose= require ('mongoose');
const uuid1= require('uuid/v1');

const UserSchema= mongoose.Schema({
    firstname: {
        type:String,
        trim: true,
        required: true
    },
    lastname:{
        type: String,
        trim: true,
        required: true
    },
    username: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    image: String,
    date: {
        type: Date,
        default: Date.now
     },
    //id: { type: String, default: uuidv1() },

}, {strict: false});

module.exports= mongoose.model('User', UserSchema);
