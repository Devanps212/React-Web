import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique: true},
    password:{type:String, required:true},
    profilePic:{type:String},
    isAdmin:{type:Boolean, default:false}
},{
    timestamps:true
})

UserSchema.pre('save', async function(next){
    if(!this.isModified('password'))
    {
        next()
    }
    else
    {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
})

UserSchema.methods.matchPassword = async function(enteredPasssword)
{
    return await bcrypt.compare(enteredPasssword, this.password)
}

const User = mongoose.model('user', UserSchema)

export default User