import Manager from '../Model/managerModel.js';
import bcrypt from 'bcrypt';

export const registerManager = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await Manager.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newManager = new Manager({ email, password: hashedPassword });
    await newManager.save();

    res.status(201).json({ message: 'Manager registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};
export const managerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const manager = await Manager.findOne({ email });
    if (!manager) {
      return res.status(404).json({ message: 'Manager not found' });
    }

    const isMatch = await bcrypt.compare(password, manager.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', manager: { email: manager.email } });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

