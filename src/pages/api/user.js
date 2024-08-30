import connectToDatabase from '/lib/mongodb';
import Usuario from '/src/models/user';

export default async function handler(req, res) {
  await connectToDatabase();

  try {
    const usuarios = await Usuario.find({}); // Extrae todos los usuarios
    console.log("Usuarios encontrados:", usuarios);
    res.status(200).json({ success: true, data: usuarios });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}
