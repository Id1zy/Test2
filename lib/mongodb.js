"use server";
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

// Conectar a la base de datos usando Mongoose
let cachedClient = null;

if (process.env.NODE_ENV === 'development') {
  // En desarrollo, usa una variable global para evitar la reconexión constante
  if (global._mongooseClient) {
    cachedClient = global._mongooseClient;
  } else {
    cachedClient = global._mongooseClient = mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((client) => client);
  }
} else {
  // En producción, simplemente conecta y guarda la conexión en caché
  cachedClient = mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((client) => client);
}

export async function connectToDatabase() {
  await cachedClient;
  const db = mongoose.connection;
  return { db, client: db };
}

export default connectToDatabase;