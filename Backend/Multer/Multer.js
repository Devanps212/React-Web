import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        return cb(null, "Backend/Public/Images/")
    },
    filename:(req, file , cb)=>{
        console.log(file, "Details of Image");
        cb(null, Date.now() + file.originalname)
    }
})

export const upload = multer({
    storage:storage
})