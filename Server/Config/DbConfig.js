import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient()
  try{
   console.log("Database connected successfully");
       
    } catch (error) {
      console.error("Database connection failed:", error);
      process.exit(1);
    }
export default prisma;
