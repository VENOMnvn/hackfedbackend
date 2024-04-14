const { model, Schema } = require("mongoose");
const mongoose = require('mongoose');

const USER = new Schema ({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    hospital:{
        type:String,
        default:"NA"
    },
    organs:{
        type:Array
    },
    email: {
        type: String,
        default: null
    },
    password: {
        type: String
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    profilePicture: {
        type: String,
        // default: "http://res.cloudinary.com/dcnvvzsdh/image/upload/v1701096607/venomcode/ay07lxp5mxbsiciluo2m.jpg"
    },
    illness: {
        type: [String]
    },
    following: {
        type:[String]
    },
    followers: {
        type:[String]
    },
    state: {
        type: String,
    },
    city: {
        type: String,
        default:"Not Set"
    },
    country:{
        type:String,
        default:"India"
    }, 
    bloodGroup:{
        type:String
    },
    googleUser:{
        type:Boolean,
        default:false
    },
    need:{
        type:String
    },
    referral:{
        type:String
    }

},{timestamps:true});

const User = mongoose.model("User",USER);
module.exports = User;
