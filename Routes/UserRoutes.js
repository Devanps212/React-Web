import express from 'express'
import {upload} from '../Backend/Multer/Multer.js'
const router = express.Router()

import {Logout, RegisterUser, authUser, userProfile, updateProfile} from '../Controllers/UserController.js'
import { protect } from '../Backend/Middleware/AuthMiddleware.js'


router.post('/', RegisterUser)
router.post('/auth', authUser)
router.post('/logout', Logout)
router.route('/profile').get(protect, userProfile).put(protect, upload.single('profilePic'), updateProfile)



export {
    router
}