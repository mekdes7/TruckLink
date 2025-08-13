import express from 'express';
import prisma from '../Config/DbConfig.js';

const Managerrouter = express.Router();

Managerrouter.post('/registerManager', async (req, res) => {
    const { email, password } = req.body;
    try {

        const manager = await prisma.manager.create({
            data: { email, password },
        });
        res.json(manager);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


Managerrouter.post('/managerLogin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const manager = await prisma.manager.findUnique({
            where: { email },
        });

        if (!manager) {
            return res.status(404).json({ error: 'Driver not found' });
        }

        if (manager.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful', manager });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



export default Managerrouter;
