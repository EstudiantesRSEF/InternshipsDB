import db from '@/utils/db/firebase-admin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, approved , emailUserLogged} = req.body;

    try {
       if (email == emailUserLogged) {
        return res.status(404).json({ error: 'No puedes denegarte a ti mismo' });
      }

      const userRef = db.collection('users').doc(email); 
      await userRef.update({ approved });                 

      if (approved) {
        // Aquí puedes enviar notificación al admin si lo deseas
      }

      return res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
      console.error('Error al aprobar usuario:', error);
      return res.status(500).json({ error: 'Error del servidor' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}