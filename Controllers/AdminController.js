import User from '../Backend/Models/UserModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../Backend/Utils/JWToken.js'

const AdminLogin = asyncHandler(async(req, res)=>{
    const {email, password} = req.body
    console.log(email, password)
    const Admin = await User.findOne({email: email, isAdmin:true})

    console.log("Admin : ",Admin)
    console.log("Password Match: ", await Admin.matchPassword(password));

    if(Admin && (await Admin.matchPassword(password)))
    {
        console.log("admin found and password matched")
        generateToken(res, Admin._id)
        res.status(200).json({
            _id:Admin._id,
            name:Admin.name,
            email:Admin.email
        })
    }
    else
    {
        console.log("Admin not found")
        res.status(401).json({message:'Invalid email or password '})
    }
})

const UserList = asyncHandler(async (req, res) => {
    const users = await User.find({ isAdmin: false });
    Object.freeze(users);
    res.status(200).json({ data: users });
});




const deleteUser=asyncHandler(async(req,res)=>{
    try {
      console.log("Delete");
      User.findOneAndDelete({createdAt:req.body.id}).lean().then((data)=>{
        console.log(data);
        res.status(200).json({data});
      })
    } catch (err) {
      throw new Error("User Not Found");
    }  
    })

const logout = asyncHandler(async(req, res)=>{
  console.log("reached logout admin")
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
})

const editUser= asyncHandler(async(req, res) => {
    
  console.log("Enter");
  console.log(req.body,'body');
  User.findByIdAndUpdate(req.body._id, {name: req.body.name,email: req.body.email,}).lean().then((data)=>{
  console.log(data,"newData");
      res.status(200).json({
        _id: data._id,
        name:data.name,
        email:data.email,
        profilePic: data.profilePic
      })
     })
})

export {AdminLogin, UserList, deleteUser, logout, editUser}
