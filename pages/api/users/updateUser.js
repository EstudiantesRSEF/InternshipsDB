import db from '@/utils/db/firebase-admin';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { email, password, name, secondsurname, firstsurname } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email es obligatorio' });
    }

    const userRef = db.collection('users').doc(email);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      return res.status(404).json({ error: 'El usuario no existe' });
    }

    const updatedData = {};

    if (typeof name === 'string' && name.trim()) {
      updatedData.name = name.trim();
    }

    if (typeof firstsurname === 'string' && firstsurname.trim()) {
      updatedData.firstsurname = firstsurname.trim();
    }

    if (typeof secondsurname === 'string' && secondsurname.trim()) {
      updatedData.secondsurname = secondsurname.trim();
    }

    if (password) {
      if (typeof password !== 'string' || !password.trim()) {
        return res.status(400).json({ error: 'Contraseña inválida' });
      }
      updatedData.password = await bcrypt.hash(password, 10);
    }

    await userRef.update(updatedData);
    return res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
