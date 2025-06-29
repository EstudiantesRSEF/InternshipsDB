import db from '@/utils/db/firebase-admin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, role } = req.body;

    try {
      const userRef = db.collection('users').doc(email);  // Admin SDK
      await userRef.update({ role });                      // Admin SDK update

      return res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
      console.error('Error al aprobar usuario:', error);
      return res.status(500).json({ error: 'Error del servidor' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}
