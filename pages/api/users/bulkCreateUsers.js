import db from '@/utils/db/firebase-admin';
import bcrypt from 'bcrypt';
import { FieldValue } from 'firebase-admin/firestore';

const isValidEmail = (email) => {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const users = req.body.users;
    const batch = db.batch();
    const validRoles = ['admin', 'user', 'editor'];

    for (const user of users) {
      const { email, name, role, approved, password } = user;

      // Validaciones
      if (!isValidEmail(email)) {
        return res.status(400).json({ error: `Email inválido en usuario: ${JSON.stringify(user)}` });
      }

      if (name && typeof name !== 'string') {
        return res.status(400).json({ error: `Nombre inválido en usuario: ${JSON.stringify(user)}` });
      }

      if (password && typeof password !== 'string') {
        return res.status(400).json({ error: `Contraseña inválida en usuario: ${JSON.stringify(user)}` });
      }

      if (role && !validRoles.includes(role)) {
        return res.status(400).json({ error: `Rol inválido en usuario: ${JSON.stringify(user)}` });
      }

      // Convertir approved a boolean si viene como string
      let approvedBool = approved;
      if (approved !== undefined) {
        approvedBool = approved === 'true' || approved === true;
        if (typeof approvedBool !== 'boolean') {
          return res.status(400).json({ error: `Campo "approved" debe ser booleano en usuario: ${JSON.stringify(user)}` });
        }
      }

      // Preparar objeto para guardar
      const userToSave = {
        ...user,
        approved: approvedBool,
        createdAt: FieldValue.serverTimestamp(),
      };

      if (password) {
        userToSave.password = await bcrypt.hash(password, 10);
      }

      const userRef = db.collection('users').doc(email);
      batch.set(userRef, userToSave);
    }

    await batch.commit();
    res.status(200).json({ message: 'Usuarios cargados correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al cargar usuarios masivamente' });
  }
}