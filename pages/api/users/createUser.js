import db from '@/utils/db/firebase-admin';
import bcrypt from 'bcrypt';
import { FieldValue } from 'firebase-admin/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { email, password, name, secondsurname, firstsurname } = req.body;

  if (!email || !password || !name || !secondsurname || !firstsurname) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    const userRef = db.collection('users').doc(email);
    const userSnap = await userRef.get();

    if (userSnap.exists) {
      return res.status(409).json({ error: 'Este email ya está registrado' });
    }

    await userRef.set({
      email,
      name,
      firstsurname,
      secondsurname,
      password : await bcrypt.hash(password, 10),
      role: 'user',
      approved: false,
      createdAt: FieldValue.serverTimestamp(),  // Usar el timestamp de Firebase
    });

    return res.status(201).json({ message: 'Usuario registrado correctamente. Esperando aprobación por parte de los administradores.' });
  } catch (error) {
    console.error('Error al registrar:', error);
    return res.status(500).json({ error: 'Error del servidor', details: error.message });
  }
}
