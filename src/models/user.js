// lib/models/Usuario.js

import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contraseña: {
    type: String,
    required: true,
  },
});

let Usuario;

if (mongoose.models.Usuario) {
  Usuario = mongoose.models.Usuario;
} else {
  Usuario = mongoose.model('Usuario', usuarioSchema);
}

export default Usuario;
