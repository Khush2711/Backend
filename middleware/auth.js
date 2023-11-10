const jwt = require("jsonwebtoken")
const User = require("../Model/user_model")
exports.isLoggedIn = async(req,res,next)=>{
    //console.log(req.header());
    const token =  req.header("Autherization");
    console.log(token , 1)
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Please login to access resource"
        })
    }
    const userId = jwt.verify(token,process.env.SECRET)
    const user = await User.findById(userId.id)
req.user=user
next()
}