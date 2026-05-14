import mongoose from "mongoose";
const feedbackSchema=new mongoose.Schema({
    name : {type:String,required:true},
    email:{type:String, required:true},
    message:{type:String, required:true}
})
const feedbackModel= mongoose.model.feedbaack || mongoose.model("feedback",feedbackSchema)

export default feedbackModel;