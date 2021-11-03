import db from '../../../utils/db'

export default async (req, res) => {
  try {
    const {id} = await db.collection('entries').add({
      ...req.body,
      approved: false,
      created: new Date().toISOString(),
    })
    res.status(200).json({id})
  } catch (e) {
    res.status(400).send({
      message: 'Something went wrong on the post creation',
    })
  }
}
