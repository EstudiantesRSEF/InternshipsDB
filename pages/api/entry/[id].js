import db from '@/utils/db/firebase-admin'
import {verifyToken} from '@/lib/auth'

export default async (req, res) => {
  const {id} = req.query

  const token = req.cookies?.token
  const decoded = token ? verifyToken(token) : null

  if (req.method !== 'GET' && !decoded) {
    return res.status(403).json({error: 'acceso denegado'})
  }

  try {
    if (req.method === 'PUT') {
      const {approved: _ignored, ...safeBody} = req.body
      await db
        .collection('entries')
        .doc(id)
        .update({
          ...safeBody,
          updated: new Date().toISOString(),
        })
      return res.status(200).end()
    } else if (req.method === 'GET') {
      const snap = await db.collection('entries').doc(id).get()
      if (!snap.exists) {
        return res.status(404).end()
      }
      return res.status(200).json(snap.data())
    } else if (req.method === 'DELETE') {
      await db.collection('entries').doc(id).delete()
      return res.status(200).end()
    }
    return res.status(405).json({error: 'método no permitido'})
  } catch (e) {
    res.status(400).end()
  }
}
