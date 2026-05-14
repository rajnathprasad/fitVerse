import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log("DB Connected"));
    await mongoose.connect(`${process.env.MONGODB_URI}/fitverse`, {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 30000,
        maxPoolSize: 10
    });
};

export default connectDB;