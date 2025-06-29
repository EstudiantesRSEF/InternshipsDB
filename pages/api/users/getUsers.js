import db from '@/utils/db/firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const db = getFirestore(); // Usa el Firestore Admin

    const snapshot = await db.collection("users").get();

    if (snapshot.empty) {
      return res.status(404).json({ error: "No hay usuarios encontrados" });
    }

    const users = snapshot.docs.map(doc => {
      const data = doc.data();
      delete data.password; // Elimina la contraseña del resultado
      return data;
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
}