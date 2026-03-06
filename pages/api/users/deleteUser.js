import db from '@/utils/db/firebase-admin'
import {verifyToken} from '@/lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({error: 'Método no permitido'})
  }

  const token = req.cookies?.token
  const decoded = token ? verifyToken(token) : null
  if (!decoded || decoded.role !== 'admin') {
    return res.status(403).json({error: 'Acceso denegado'})
  }

  const {email} = req.body

  if (!email) {
    return res.status(400).json({error: 'Email es obligatorio'})
  }

  if (email === decoded.email) {
    return res.status(400).json({error: 'No puedes borrarte a ti mismo'})
  }

  try {
    const userRef = db.collection('users').doc(email)
    const userSnap = await userRef.get()

    if (!userSnap.exists) {
      return res.status(404).json({error: 'El usuario no existe'})
    }

    await userRef.delete()

    return res.status(200).json({message: 'Usuario eliminado correctamente'})
  } catch (error) {
    console.error('Error al eliminar usuario:', error)
    return res.status(500).json({error: 'Error del servidor'})
  }
}
