import express from 'express'
import {AdminLogin, UserList, deleteUser, editUser, logout} from '../Controllers/AdminController.js'
const AdminRouter = express.Router()


AdminRouter.post('/adminlogin', AdminLogin)
AdminRouter.get('/userList', UserList)
AdminRouter.post('/deleteUser', deleteUser)
AdminRouter.post('/adminlogout', logout)
AdminRouter.post('/editUser', editUser)
export {
    AdminRouter
}