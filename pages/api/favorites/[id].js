import db from '@/utils/db/firebase-admin'

export default async function handler(req, res) {
  try {
    const {
      query: { id, email },
      method,
    } = req

    if (!email || !id) {
      return res.status(400).json({ error: 'Missing email or id' })
    }

    const userRef = db.collection('users').doc(email)
    const userSnap = await userRef.get()

   //res.json(method)

    if (!userSnap.exists) {
      return res.status(404).json({ error: 'User not found' })
    }

    const data = userSnap.data()
    const favorites = Array.isArray(data.favorites) ? data.favorites : []

    if (method === 'POST') {
      if (!favorites.includes(id)) {
        const updatedFavorites = [...favorites, id]
        await userRef.update({ favorites: updatedFavorites })
      }
      return res.status(200).json({ success: true })
    }

    if (method === 'DELETE') {

      if (favorites.includes(id)) {
        const updatedFavorites = favorites.filter(favId => favId !== id)
        await userRef.update({ favorites: updatedFavorites })
      }
      return res.status(200).json({ success: true })
    }

    return res.status(405).setHeader('Allow', ['POST', 'DELETE']).end()
  } catch (error) {
    console.error('Error updating favorites:', error)
    return res.status(500).json({ error: 'Server error' })
  }
}
