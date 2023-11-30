import asyncHandler from 'express-async-handler'
import User from '../Backend/Models/UserModel.js'
import generateToken from '../Backend/Utils/JWToken.js'



const authUser = asyncHandler(async(req, res)=>{
    const {email, password}= req.body

    const user = await User.findOne({email})
    
    if(user && (await user.matchPassword(password)))
    {
        
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    }
    else
    {
        res.status(400);
        throw new Error("Invalid email or password")
    }
    
})


const RegisterUser = asyncHandler(async(req, res)=>{
    
    const {name, email, password} = req.body
    
    const userExist = await User.findOne({email})

    if(userExist)
    {
        res.status(400);
        throw new Error('User already exist')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user)
    {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }
    else
    {
        res.status(400);
        throw new Error("Invalid user data")
    }

})


const Logout = asyncHandler((req, res)=>{
    res.cookie('jwt', '', {
        httpOnly:true,
        expires: new Date(0)
    })
    res.status(200).json({message:"Logged Out"})
})

const userProfile = asyncHandler(async(req, res)=>{
    const user = {
        _id: req.user._id,
        name:req.user.name,
        email:req.user.email,
        profilePic: req.file.filename
    }
    res.status(200).json({user:user})
})

const updateProfile = asyncHandler(async(req, res)=>{

    console.log("file :", req.file.filename)
    console.log("name :",req.body.name)
    const user = await User.findById(req.user._id);
    
    if(user)
    {
        user.name = req.body.name|| user.name;
        user.email = req.body.email || user.email;
        if (req.file && req.file.filename) {
            user.profilePic = req.file.filename;
        }

        if(req.body.password)
        {
            user.password = req.body.password
        }

       const updated =  await user.save()
       if(updated)
       {
        res.status(200).json({message:"Updated profile",
         name     : updated.name,
         email    : updated.email,
         profilePic: updated.profilePic,
         password : updated.password})
       }
       else
       {
        res.status(200).json({message:"Can't update the user"})
       }
        
    }
    else
    {
        res.status(404)
        throw new Error("User not found")
    }

    
})

export {RegisterUser, authUser, Logout, userProfile, updateProfile,}