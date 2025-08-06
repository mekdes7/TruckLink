import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbConfig = {
  connect: async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL)      
     
      console.log("Database connected successfully");
       
    } catch (error) {
      console.error("Database connection failed:", error);
      process.exit(1);
    }
  }}
export default dbConfig;