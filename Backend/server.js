import express from "express";
import dotenv from 'dotenv'
import connectDB from './Config/db.js'
import cookieParser from "cookie-parser";


connectDB()

dotenv.config()
import {router} from '../Routes/UserRoutes.js'
import {notFound, errorHandler} from './Middleware/ErrorMiddleware.js'

const port = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

app.use(express.static('Backend/Public/'))

app.use('/api/user', router)

// app.use('/api/admin')

app.get('/',(req, res)=> res.send('server is running'))

app.use(notFound)
app.use(errorHandler)

app.listen(port,()=> console.log(`server running on ${port}`))