import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from './config/mongodb.js'
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import feedbackRouter from "./routes/feedbackRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import tryonRouter from "./routes/tryonRoute.js";

//App config
const port = process.env.PORT || 4000;
const app = express();
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());

// api endpoints

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/feedback',feedbackRouter)
app.use('/api/order', orderRouter)
app.use('/api/tryon', tryonRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>
console.log(`Server runninig at : http://localhost:${port}`))

