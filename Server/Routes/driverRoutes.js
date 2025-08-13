import express from 'express';
import prisma from '../Config/DbConfig.js';

const Driverrouter = express.Router();


Driverrouter.post('/registerDriver', async (req, res) => {
  const { email, password } = req.body;
  try {
    const driver = await prisma.driver.create({
      data: { email, password },
    });
    res.json(driver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


Driverrouter.post('/driverLogin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const driver = await prisma.driver.findUnique({
      where: { email },
    });

    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    if (driver.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', driver });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default Driverrouter;
