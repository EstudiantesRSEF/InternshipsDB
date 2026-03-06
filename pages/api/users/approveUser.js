import db from '@/utils/db/firebase-admin';
import { verifyToken } from '@/lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const token = req.cookies?.token;
  const decoded = token ? verifyToken(token) : null;
  if (!decoded || decoded.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado' });
  }

  const { email, approved } = req.body;

  if (!email || approved === undefined) {
    return res.status(400).json({ error: 'Faltan campos' });
  }

  if (typeof approved !== 'boolean') {
    return res.status(400).json({ error: 'Campos incorrectos' });
  }

  if (email === decoded.email) {
    return res.status(400).json({ error: 'No puedes hacer eso' });
  }

  try {
    const userRef = db.collection('users').doc(email);
    const userSnap = await userRef.get();
    if (!userSnap.exists) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await userRef.update({ approved });

    return res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error al aprobar usuario:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
}