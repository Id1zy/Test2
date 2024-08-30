// pages/api/register.js
import mongoose from 'mongoose';
import { hash } from 'bcrypt';
import Usuario from '/src/models/user';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      await connectToDatabase();

      const usuario = await Usuario.findOne({ email });

      if (!usuario) {
        return res.status(401).json({ message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, usuario.contraseña);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Autenticación exitosa
      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Internal server error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

