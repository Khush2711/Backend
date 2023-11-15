const mongoose = require('mongoose');
const validator = require('validator');

const internsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required:[true,"Please enter user name"],
        },

        email: {
            type: String,
            required:[true,"Please Enter your Email"],
            validate:[validator.isEmail,"Please enter a valid Email"],
        },

        role: {
            type: String,
            required:[true,"Please enter intern role "],
        },

        work: {
            type: String,
            required:[true,"Please enter intern work"],
        },

        duration: {
            type: String,
            required:[true,"Please enter intern work-duration "],
        },
        from: {
            type: String,
            required:[true,"Please enter intern starting-Date"],
        },
        to: {
            type: String,
            required:[true,"Please enter intern end-Date"],
        },
        createdAt:{
            type:Date,
            default:Date.now
    
        },
        sendBy_id:{
            type:mongoose.Schema.ObjectId,
            ref:'users',
            required:true
        }  
    }
);

module.exports = mongoose.model("interns" ,internsSchema );