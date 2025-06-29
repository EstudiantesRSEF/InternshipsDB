import db from '@/utils/db/firebase-admin';


export default async function handler(req, res) {
  const docRef = db.collection('page').doc('landingPage');

  if (req.method === 'GET') {
    try {
      const docSnap = await docRef.get();
      if (!docSnap.exists) {
        return res.status(404).json({ error: 'No settings found' });
      }
      return res.status(200).json(docSnap.data());
    } catch (error) {
      console.error('Error getting landing settings:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  if (req.method === 'POST') {
    try {
      const newSettings = req.body;
      await docRef.set(newSettings, { merge: true });
      return res.status(200).json({ message: 'Settings updated' });
    } catch (error) {
      console.error('Error updating landing settings:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}