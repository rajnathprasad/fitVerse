import express from 'express'
import upload from '../middleware/multer.js'
import { registerUser, adminLogin, loginUser, updateUser, getUser} from '../controllers/userController.js'
import authUser from '../middleware/auth.js'

const userRouter = express.Router();

userRouter.post('/register',upload.single('image'),registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/update',  upload.single('image'),authUser, updateUser);
userRouter.post('/admin',adminLogin);
userRouter.post('/get', authUser, getUser);


export default userRouter;