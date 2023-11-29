import User from '../Backend/Models/UserModel.js'
import asyncHandler from 'express-async-handler'

const AdminLogin = asyncHandler(async(req, res)=>{
    const {email, password} = req.body
    const Admin = await User.findOne({email}, {isAdmin:true})

    if(Admin && (await User.passwordMatch(password)))
    {
        console.log("admin found and password matched")
        res.status(200).json({})
    }
})
