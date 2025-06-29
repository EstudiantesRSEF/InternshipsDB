import db from '@/utils/db/firebase-admin';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';


const generatePassword = () => {
  return Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-5);
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Falta el email' });

  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email).get();

    if (snapshot.empty) return res.status(404).json({ error: 'Usuario no encontrado' });

    const newPass = generatePassword();
    const hashed = await bcrypt.hash(newPass, 10);

    const userDoc = snapshot.docs[0];
    await userDoc.ref.update({ password: hashed });

    // Enviar email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Tu nueva contraseña',
      text: `Tu nueva contraseña es: ${newPass}`,
    });

    res.status(200).json({ message: 'Se envió una nueva contraseña al correo (Revisa tu bandeja y el correo spam).' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
