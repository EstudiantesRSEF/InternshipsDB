import db from '@/utils/db/firebase-admin'
import {verifyToken} from '@/lib/auth'

export default async (req, res) => {
  const token = req.cookies?.token
  const decoded = token ? verifyToken(token) : null
  if (!decoded) {
    return res.status(403).json({error: 'acceso denegado'})
  }

  try {
    const {id} = await db.collection('entries').add({
      ...req.body,
      approved: false,
      created: new Date().toISOString(),
    })
    res.status(200).json({id})
  } catch (e) {
    res.status(400).send({message: 'error al crear la entrada'})
  }
}
