import db from '@/utils/db/firebase-admin';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { entries } = req.body || {};

  if (!Array.isArray(entries) || entries.length === 0) {
    return res.status(400).json({ message: 'No entries provided' });
  }

  try {
    const nowIso = new Date().toISOString();

    const results = await Promise.all(
      entries.map(async (entry) => {
        const docRef = await db.collection('entries').add({
          ...entry,
          approved: false,
          created: nowIso,
        });
        return { id: docRef.id };
      })
    );

    return res.status(200).json({ ids: results.map(r => r.id) });
  } catch (e) {
    console.error('Bulk entries creation error:', e);
    return res.status(500).json({ message: 'Something went wrong on bulk creation' });
  }
};