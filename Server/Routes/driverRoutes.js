import express from 'express';
import { driverLogin, registerDriver } from '../Controller/driverController.js';


const Driverrouter = express.Router();

Driverrouter.post('/registerDriver', registerDriver);
Driverrouter.post('/driverLogin',driverLogin);

export default Driverrouter;
