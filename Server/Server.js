import express from 'express';
import dotenv from 'dotenv';
import dbConfig from './Config/DbConfig.js';
import cors from 'cors';
import Managerrouter from './Routes/managerRouter.js';
import Driverrouter from './Routes/driverRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 2000;
app.use(cors());
app.use(express.json());
app.use(express.static("Client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "Client", "build", "index.tsx"));
});


app.use('/api/manager',Managerrouter);
app.use('/api/driver',Driverrouter);
dbConfig.connect();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

