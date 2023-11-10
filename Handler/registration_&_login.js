const mongoose = require('mongoose');
const User = require('../Model/user_model');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('./email');
const Form = require("../Model/form_model")
exports.registration = async (req, res) => {
    const { name, email, password } = req.body;
    var mailformat = "^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$"
    const check1=email.match(mailformat)
    //console.log(req.cookies);
    if(!email || !password || !name){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
           });
    }

    if(!check1){
        return res.status(400).json({
            success: false,
            message: "enter correct email"
           })}
    try {
        const user = await User.findOne({ email: email });

        if (user) {
            return res.status(400).json({
                 success: false,
                 message:"User already Exist"
                });
        }
        else{
        //else if (validator.isStrongPassword(password)) {
            const options= {
                expires : new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
                httpOnly :true,
            }
            encryptPassword = await bcrypt.hash(password, 10);

            const result =await User.create({name,email,password:encryptPassword });
result.password=undefined;
            const token = jwt.sign({id:result._id }, process.env.SECRET ,{expiresIn:process.env.JWT_EXPIRE});

            return res.status(201).cookie("token",token,{
                expires : new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
                httpOnly :true,
                domain: "localhost"
            }).json({ success: true,token, result });

        }
        // else {
        //     return res.status(400).json({
        //         success: false,
        //         message:"Please create a strong Password"
        //        });
        // }
    }
    catch (err) {
        return res.status(400).json({
                 success: false,
                 message: err.message
                });
    }

};


exports.login = async (req, res) => {

    const { email, password } = req.body;
    console.log(email,password)
if(!email || !password){
    return res.status(400).json({
        success: false,
        message: "All fields are required"
       });
}
    try {

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "User Not Found",success : false });
        }



        const decryptPassword = await bcrypt.compare(password, user.password);
        if (!decryptPassword) {
            return res.status(400).json({ message: "Invalid Credentials" , success:false });
        }
 const token = jwt.sign({id:user._id }, process.env.SECRET ,{expiresIn:process.env.JWT_EXPIRE});
 user.password= undefined;
 const options= {
    expires : new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly :true
}
return res.status(201).cookie('token',token,{
    ...options,
    domain: "localhost",
}).json({ success: true,token, user });

    }
    catch (err) {
       return res.status(400).json({
                 success: false,
                 message: err.message
                });
    }
};

exports.form= async(req,res)=>{
const {email,name,role,work,duration,from,to}= req.body;

var mailformat = "^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$"
const check1=email.match(mailformat)
//const check=validator.isEmail(email);
if(!email ||!name ||!role ||!work ||!duration|| !from|| !to){
    return res.status(400).json({
        success: false,
        message: "All fields are required"
       })}

       if(!check1){
        return res.status(400).json({
            success: false,
            message: "enter correct email"
           })}
    

try {
   const e = await sendEmail({email,name,role,work,duration,from,to}) 
   console.log(e)   
} catch (error) {
    console.log(error , 2)
    return res.status(400).json({
        success: false,
        message: error.message
       });
}
// try {
//     const pdf = await generatePDF({email,name,role,work,duration,from,to}) 
//     console.log(pdf);
//     console.log(y);
// } catch (error) {
//     console.log(error.message)
// }
//const y=await genPDF();
//console.log(y , 1);

const form =await Form.create({email,name,role,work,duration,from,to , sendBy_id:req.user.id})

return res.status(200).json({
    success: true,
    message: "Mail send Successfully"
   });
}

exports.logout= async(req,res)=>{
    res.cookie("token" , null ,{
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success:true,
        message:"logged out successfully"
    })
}




