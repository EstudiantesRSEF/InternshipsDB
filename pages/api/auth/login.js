import db from '@/utils/db/firebase-admin';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
  }

  try {
    const userRef = db.collection('users').doc(email);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const user = userSnap.data();

    if (!user.approved) {
      return res.status(403).json({ error: 'Usuario no aprobado' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'Falta JWT_SECRET en variables de entorno' });
    }

    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Login exitoso',
      token,
      role: user.role,
      name: user.name,
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
}
