import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";
import Driverrouter from "./Routes/driverRoutes.js";
import Managerrouter from "./Routes/managerRouter.js";


dotenv.config();

const prisma = new PrismaClient();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 2000;

app.use(cors());
app.use(express.json());

app.use("/api/driver", Driverrouter);
app.use("/api/manager", Managerrouter);

app.use(express.static(path.join(__dirname, "../Client/dist")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { prisma };
