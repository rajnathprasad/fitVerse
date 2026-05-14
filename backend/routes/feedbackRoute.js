import express from 'express'
import sendFeedback from '../controllers/feedbackController.js'
import auth from '../middleware/auth.js'
const feedbackRouter = express.Router();

feedbackRouter.post('/send',auth,sendFeedback)

export default feedbackRouter;