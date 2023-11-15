const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
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

        password: {
            type: String,
            required:[true,"Please enter your Password"],
            require: true,
        }
    }
);

module.exports = mongoose.model("users" , userSchema);