const mongoose = require('mongoose');
const validator = require('validator');

const registration = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },

        email: {
            type: String,
            validator(emailId) {
                if (!validator.isEmail(emailId)) {
                    throw new Error("Invalid Email");
                }
            },
            require: true
        },

        password: {
            type: String,
            require: true,
        }
    }
);

const login = new mongoose.Schema(
    {
        email: {
            type: String,
            validate(emailId) {
                if (!validator.isEmail(emailId)) {
                    throw new Error("Invalid Email");
                }
            },
            require: true
        },

        password: {
            type: String,
            require: true
        }
    }
);


module.exports = {
    "registration": mongoose.model('Registration', registration),
    "login": mongoose.model('Registrations', registration)
};