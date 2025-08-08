import express from 'express';
import dotenv from 'dotenv';
import dbConfig from './Config/DbConfig.js';
import cors from 'cors';
import Managerrouter from './Routes/managerRouter.js';
import Driverrouter from './Routes/driverRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 2000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../Client/dist')));


app.use('/api/manager', Managerrouter);
app.use('/api/driver', Driverrouter);


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/dist/index.html'));
});


dbConfig.connect();
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(middleware.route.path);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
