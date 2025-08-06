import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();
const DriverSchema = new mongoose.Schema({
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
   
});
const Driver = mongoose.model('Driver', DriverSchema);
export default Driver;