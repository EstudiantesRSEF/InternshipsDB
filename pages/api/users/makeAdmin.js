import db from '@/utils/db/firebase-admin'
import {verifyToken} from '@/lib/auth'

const VALID_ROLES = ['admin', 'user', 'editor']

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({error: 'Método no permitido'})
  }

  const token = req.cookies?.token
  const decoded = token ? verifyToken(token) : null
  if (!decoded || decoded.role !== 'admin') {
    return res.status(403).json({error: 'Acceso denegado'})
  }

  const {email, role} = req.body

  if (!email || !role) {
    return res.status(400).json({error: 'Faltan campos'})
  }

  if (!VALID_ROLES.includes(role)) {
    return res.status(400).json({error: 'Rol invalido'})
  }

  try {
    const userRef = db.collection('users').doc(email)
    const userSnap = await userRef.get()
    if (!userSnap.exists) {
      return res.status(404).json({error: 'Usuario no encontrado'})
    }

    await userRef.update({role})

    return res.status(200).json({message: 'Usuario actualizado correctamente'})
  } catch (error) {
    console.error('Error al actualizar rol:', error)
    return res.status(500).json({error: 'Error del servidor'})
  }
}
