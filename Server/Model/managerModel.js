import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const ManagerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
   
})
    const Manager = mongoose.model('Manager', ManagerSchema);
export default Manager;