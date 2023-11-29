import mongoose, { mongo} from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async()=>{
    try
    {
      const conn = await mongoose.connect(process.env.MONGO_CONNECT)
      console.log(`connected to : ${conn.connection.host} `)
      console.log(`Connected to database: ${conn.connection.name}`);
    }
    catch(error)
    {
      console.log(error.message)
      process.exit(1)        
    }
}

export default connectDB