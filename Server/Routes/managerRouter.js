import express from 'express';
import { registerManager, managerLogin } from '../Controller/managerController.js';

const Managerrouter = express.Router();

Managerrouter.post('/registerManager', registerManager);
Managerrouter.post('/managerLogin',managerLogin);

export default Managerrouter;
