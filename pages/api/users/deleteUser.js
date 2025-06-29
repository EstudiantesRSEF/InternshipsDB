import db from '@/utils/db/firebase-admin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, emailUserLogged } = req.body;


    try {

       if (email == emailUserLogged) {
        return res.status(404).json({ error: 'No puedes borrarte a ti mismo' });
      }


      const userRef = db.collection('users').doc(email); 
      const userSnap = await userRef.get(); 


      if (!userSnap.exists) {
        return res.status(404).json({ error: 'El usuario no existe' });
      }



     await userRef.delete(); 

      return res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      return res.status(500).json({ error: 'Error del servidor' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}