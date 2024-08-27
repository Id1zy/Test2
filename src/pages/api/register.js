// pages/api/register.js
import mongoose from 'mongoose';
import { hash } from 'bcrypt';
import Usuario from '/src/models/user';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const existingUser = await Usuario.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await hash(password, 10);

    const user = new Usuario({
      nombre: firstName,
      email,
      contraseña: hashedPassword,
    });

    await user.save();

    return res.status(201).json({ message: 'User created', userId: user._id });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
