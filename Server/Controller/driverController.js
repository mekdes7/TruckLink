import Driver from '../Model/driverModel.js';
import bcrypt from 'bcrypt';

export const registerDriver = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await Driver.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newDriver = new Driver({ email, password: hashedPassword });
    await newDriver.save();

    res.status(201).json({ message: 'Driver registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};
export const driverLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const driver = await Driver.findOne({ email });
    if (!driver) {
      return res.status(404).json({ message: 'Manager not found' });
    }

    const isMatch = await bcrypt.compare(password, driver.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', driver: { email: driver.email } });

  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};
