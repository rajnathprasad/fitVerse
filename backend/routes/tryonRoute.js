import express from 'express'
import tryOn from '../controllers/tryonController.js'
import authUser from '../middleware/auth.js'

const tryonRouter = express.Router();

tryonRouter.post('/tryon', authUser, tryOn);

export default tryonRouter;