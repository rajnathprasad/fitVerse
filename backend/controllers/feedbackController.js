import feedbackModel from "../models/feedbackModel.js";
import userModel from "../models/userModel.js";


const sendFeedback =async (req, res)=>{
    try {
        const {userId, feedbackMessage} = req.body;
        const userData = await userModel.findById(userId);
        if(!userData){
            res.json({success:false,message: 'user not found'})
        }else{
            const feedbackData={
                name : userData.name,
                email : userData.email,
                message : feedbackMessage
            }
            const newFeedback = new feedbackModel(feedbackData)
            await newFeedback.save();
            res.json({success:true, message : "feedback sent"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message : error.message})
    }
}

export default sendFeedback;