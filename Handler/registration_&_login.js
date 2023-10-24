const mongoose = require('mongoose');
const models = require('../Model/registration_&_login');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = "Suvidha";

const registration = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const model = models.registration;
        const User = await model.find({ email: email });

        if (User.length) {
            res.send(`User Already Exist.`);
        }
        else if (validator.isStrongPassword(password)) {

            encryptPassword = await bcrypt.hash(password, 10);

            const result = model.create({ 'name': name, 'email': email, 'password': encryptPassword });

            const token = jwt.sign({ email: (await result).email, id: (await result)._id }, key);

            return res.status(201).json({ user: result, token: token });

        }
        else {
            res.send('Password Is Week');
        }
    }
    catch (err) {
        console.log(`error occur at in registration module : ${err}`);
        return res.status(500);
    }

};


const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const model = models.login;
        const User = await model.find({ email: email });

        if (User.length == 0) {
            return res.status(404).json({ message: "User Not Found" });
        }

        const decryptPassword = await bcrypt.compare(password, User[0].password);

        if (!decryptPassword) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ email: User.email, id: User._id }, key);

        return res.status(201).json({ user: User, token: token });

    }
    catch (err) {
        console.log(`error occur at in login module : ${err}`);
        return res.status(500);
    }
};

module.exports = { registration, login };