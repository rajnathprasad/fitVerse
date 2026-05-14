import mongoose from 'mongoose'

const tryonSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    userImage: { type: String, required: true },
    productImage: { type: String, required: true },
    resultImage: { type: String, required: true },
    date: { type: Number, default: Date.now }
})

const tryonModel = mongoose.models.tryon || mongoose.model('tryon', tryonSchema)

export default tryonModel