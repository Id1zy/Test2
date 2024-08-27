// src/pages/api/login.js
import bcrypt from 'bcrypt';
import Usuario from '/src/models/user';
import connectToDatabase from '/lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      await connectToDatabase();

      // Buscar el usuario por email
      const usuario = await Usuario.findOne({ email });

      if (!usuario) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Comparar contraseñas
      const isMatch = await bcrypt.compare(password, usuario.contraseña);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Autenticación exitosa
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
