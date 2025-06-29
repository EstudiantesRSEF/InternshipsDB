import db from '@/utils/db/firebase-admin';
import { doc, updateDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, role } = req.body; // Se espera que pase un email y el estado de aprobación

    try {
      const userRef = doc(db, 'users', email); // Accede al documento del usuario por su email
      await updateDoc(userRef, { role }); // Actualiza el estado de aprobación en Firestore

      return res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
      console.error('Error al aprobar usuario:', error);
      return res.status(500).json({ error: 'Error del servidor' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}